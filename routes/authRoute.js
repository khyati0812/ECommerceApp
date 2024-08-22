const express = require("express");
const {
  registerController,
  loginController, requestResetController,
  resetPasswordController,
} = require("../controllers/authController");
const router = express();
const { authenticateToken, checkAdminRole } = require("../middlewares/authMiddleware");
router.post("/register", registerController);
router.post("/login", loginController);
router.post('/request-reset', requestResetController); // New route for requesting password reset
router.post('/reset-password/:token', resetPasswordController);
router.get("/protected", authenticateToken,checkAdminRole, (req, res) => {
  res
    .status(200)
    .json({ message: "This is a protected route", user: req.user });
});
router.get("/user-auth", authenticateToken, (req, res) => { res.status(200).send({ ok: true }) });
module.exports = router;
