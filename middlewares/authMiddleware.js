const { verifyToken, generateToken } = require("../helpers/jwtUtils"); // Import the token utility
const userModel = require("../models/userModel");

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Bearer <token>

  if (token == null) {
    return res.status(401).json({ error: "Token is required" });
  }

  try {
    const decoded = verifyToken(token);
    req.user = decoded; // Attach user info to the request
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    return res
      .status(403)
      .json({ error: "Forbidden: Invalid or expired token" });
  }
};

const checkAdminRole = async (req, res, next) => {
  try {
    // Assuming req.user contains the userId from the decoded token
    const user = await userModel.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        error: true,
        message: "User not found",
      });
    }

    if (user.role !== 1) {
      return res.status(403).json({
        error: true,
        message: "Access denied: Admin privileges required",
      });
    }

    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    console.error("Error in checkAdminRole middleware:", error);
    return res.status(500).json({
      error: true,
      message: "Internal Server Error",
    });
  }
};
const authenticateAndAuthorizeAdmin = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Bearer <token>

  if (token == null) {
    return res.status(401).json({ error: "Token is required" });
  }

  try {
    const decoded = verifyToken(token);
    req.user = decoded; // Attach user info to the request

    const user = await userModel.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        error: true,
        message: "User not found",
      });
    }

    if (user.role !== 1) {
      return res.status(403).json({
        error: true,
        message: "Access denied: Admin privileges required",
      });
    }
    // const newToken = generateToken(user);
    res.setHeader("Authorization1", `Bearer ${token}`); // Set new token in response header
    console.log("backend token", token);
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    return res
      .status(403)
      .json({ error: "Forbidden: Invalid or expired token" });
  }
};
module.exports = {
  authenticateToken,
  checkAdminRole,
  authenticateAndAuthorizeAdmin,
};
