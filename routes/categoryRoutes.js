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
  checkAdminRole,
} = require("../middlewares/authMiddleware");
const categoryRouter = express.Router();
categoryRouter.post(
  "/create-category",
  authenticateToken,
  checkAdminRole,
  createCategory
);
categoryRouter.get("/get-all-category", getAllCategories);
categoryRouter.get("/single-category/:slug", getSingleCategory);
categoryRouter.delete(
  "/delete-category/:id",
  authenticateToken,
  checkAdminRole,
  deleteCategory
);
categoryRouter.put(
  "/update-category/:id",
  authenticateToken,
  checkAdminRole,
  updateCategory
);
module.exports = categoryRouter;
