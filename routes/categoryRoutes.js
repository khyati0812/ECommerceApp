const express = require("express");
const {
  createCategory,
  deleteCategory,
  updateCategory,
  getAllCategories,
  getSingleCategory,
} = require("../controllers/categoryController");
const {
  authenticateToken,
  checkAdminRole,authenticateAndAuthorizeAdmin
} = require("../middlewares/authMiddleware");
const categoryRouter = express.Router();
categoryRouter.post(
  "/create-category",
  authenticateAndAuthorizeAdmin,
  createCategory
);
categoryRouter.get("/get-all-category", getAllCategories);
categoryRouter.get("/single-category/:slug", getSingleCategory);
categoryRouter.delete(
  "/delete-category/:id",
authenticateAndAuthorizeAdmin,
  deleteCategory
);
categoryRouter.put(
  "/update-category/:id",
  authenticateToken,
  checkAdminRole,
  updateCategory
);
module.exports = categoryRouter;
