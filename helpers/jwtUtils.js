const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
// Secret key for signing tokens (keep it safe and private)
const SECRET_KEY = process.env.SECRET_KEY;// Replace with your own secret key

// Function to generate a JWT token
const generateToken = (user) => {
  return jwt.sign(
    { id: user._id }, // Payload
    SECRET_KEY, // Secret key
    { expiresIn: "7d" } // Token expiration time
  );
};

// Function to verify a JWT token
const verifyToken = (token) => {
  try {
    return jwt.verify(token, SECRET_KEY);
  } catch (error) {
    throw new Error("Invalid or expired token");
  }
};

module.exports = { generateToken, verifyToken };
