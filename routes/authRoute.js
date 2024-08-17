const express = require("express");
const {
  registerController,
  loginController,
} = require("../controllers/authController");
const router = express();
const { authenticateToken, checkAdminRole } = require("../middlewares/authMiddleware");
router.post("/register", registerController);
router.post("/login", loginController);
router.get("/protected", authenticateToken,checkAdminRole, (req, res) => {
  res
    .status(200)
    .json({ message: "This is a protected route", user: req.user });
});
module.exports = router;
