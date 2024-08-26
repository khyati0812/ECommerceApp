const express = require("express");
const {
  authenticateToken,
  checkAdminRole,
} = require("../middlewares/authMiddleware");
const {
  createProductController,
  getProductController,
} = require("../controllers/productController");
const productRouter = express.Router();
const formidable = require("formidable");
const form = formidable({
  maxFileSize: 10 * 1024 * 1024, // 10MB
  keepExtensions: true,
});

productRouter.post(
  "/create-product",
  authenticateToken,
  checkAdminRole,
  (req, res, next) => {
    form.parse(req, (err, fields, files) => {
      if (err) {
        return res.status(400).send({ message: "File upload failed", err });
      }
      req.fields = fields;
      req.files = files;
      next();
    });
  },
  createProductController
);
productRouter.get("/get-product", getProductController);
module.exports = productRouter;
