const colors = require("colors"); // Import the colors package
const userModel = require("../models/userModel"); // Assuming your User model is in the models directory
const hashPassword = require("../helpers/authHelper");
const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

const { generateToken } = require("../helpers/jwtUtils");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();
// Secret key for signing tokens (keep it safe and private)
const SECRET_KEY = process.env.SECRET_KEY;

const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address, role } = req.body;

    // Check if all required fields are present
    if (!name || !email || !password || !phone || !address) {
      console.log("Validation Error: Missing required fields".red); // Red for errors
      return res.status(400).json({ error: "All fields are required" });
    }

    // Additional validations (e.g., email format, password strength, etc.)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.log("Validation Error: Invalid email format".red); // Red for errors
      return res.status(400).json({ error: "Invalid email format" });
    }

    if (password.length < 6) {
      console.log("Validation Error: Weak password".red); // Red for errors
      return res
        .status(400)
        .json({ error: "Password must be at least 6 characters long" });
    }

    // Check for duplicate email
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      console.log("Validation Error: Duplicate email".red); // Red for errors
      return res.status(409).json({ error: "Email is already registered" }); // 409 Conflict
    }
    const hashedPassword = await hashPassword(password);
    // Auto-assign a default role if not provided

    // Create a new user instance
    const newUser = new userModel({
      name,
      email,
      password: hashedPassword, // Ensure you hash the password before saving in production
      phone,
      address,
      role,
    });

    // Save the user to the database
    await newUser.save();

    // Log success message in green
    console.log("User registration successful".green);

    // Send a success response
    return res
      .status(201)
      .json({ message: "Registration successful", user: newUser });
  } catch (error) {
    // Handle unexpected errors
    console.log("Error in registerController:".red, error.message.red); // Red for errors
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if both email and password are provided
    if (!email || !password) {
      console.log("Validation Error: Missing email or password".red);
      return res.status(400).json({ error: "Email and password are required" });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.log("Validation Error: Invalid email format".red);
      return res.status(400).json({ error: "Invalid email format" });
    }

    // Find the user by email
    const user = await userModel.findOne({ email });
    if (!user) {
      console.log("Authentication Error: User not found".red);
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Compare the provided password with the hashed password in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      console.log("Authentication Error: Invalid password".red);
      return res.status(401).json({ error: "Invalid credentials" });
    }
    const token = generateToken(user);
    // If credentials are valid, you might want to create a session or token (e.g., JWT)
    // For now, we'll just return a success message
    console.log("User login successful".green);
    return res.status(200).json({ message: "Login successful", token, user });
  } catch (error) {
    // Handle unexpected errors
    console.log("Error in loginController:".red, error.message.red);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_ID,
    pass: process.env.PASSWORD,
  },
});

const requestResetController = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await userModel.findOne({ email });

    console.log(user); // Debugging line to check the user object

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const token = jwt.sign({ id: user._id }, SECRET_KEY, { expiresIn: "7d" });
    const resetUrl = `http://localhost:3000/reset-password/${token}`;

    const mailOptions = {
      to: email,
      subject: "Password Reset",
      text: `Click the link to reset your password: ${resetUrl}`,
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.error("Error sending email:", err); // Log the error
        return res.status(500).json({ error: err.message }); // Return error message
      }
      console.log("Email sent:", info); // Log success message
      res.status(200).json({ message: "Password reset email sent" });
    });
  } catch (error) {
    console.error("Error in requestResetController:", error.message); // Log error message for debugging
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
const resetPasswordController = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    const user = await userModel.findById(decoded.id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    res.status(400).json({ error: "Invalid or expired token" });
  }
};
module.exports = {
  registerController,
  loginController,
  requestResetController,
  resetPasswordController,
};
