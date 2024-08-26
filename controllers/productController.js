const fs = require("fs");
const productModel = require("../models/productModel");
const slugify = require("slugify");
const createProductController = async (req, res) => {
  try {
    const { name, description, price, category, quantity, shipping } =
      req.fields;
    const { photo } = req.files;

    // Validate required fields
    if (!name || !description || !price || !category || !quantity) {
      return res.status(400).send({ message: "All fields are mandatory" });
    }

    if (!photo) {
      return res.status(400).send({ message: "Photo is required" });
    }

    if (photo.size > 10000000) {
      return res
        .status(400)
        .send({ message: "Picture size should be less than 10MB" });
    }

    // Create the product
    const product = new productModel({
      ...req.fields,
      slug: slugify(name),
    });

    // Add photo to the product
    if (photo) {
      product.photo.data = fs.readFileSync(photo.path);
      product.photo.contentType = photo.type;
    }

    // Save the product
    await product.save();
    res.status(201).send({ message: "Product created successfully" });
  } catch (error) {
    console.log("Error in creating a product:", error);
    res.status(500).send({ message: "Failure", error });
  }
};
const getProductController = async (req, res) => {
  try {
    const product = await productModel
      .find({})
      .select("-photo")
      .limit(12)
      .sort({ createdAt: -1 });
    res.status(200).send({ message: "successfully got it" });
  } catch (error) {
    console.log("Error in getting the product");
    return res.status(500).send({ message: "error", error });
  }
};
module.exports = { createProductController, getProductController };
