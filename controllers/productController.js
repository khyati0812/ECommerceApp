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
      .populate("category")
      .sort({ createdAt: -1 });
    res.status(200).send({ message: "successfully got it", product });
  } catch (error) {
    console.log("Error in getting the product");
    return res.status(500).send({ message: "error", error });
  }
};
const getProductBySlug = async (req, res) => {
  try {
    const product = await productModel
      .find({ slug: req.params.slug })
      .select("-photo")
      .limit(12)
      .populate("category")
      .sort({ createdAt: -1 });
    res.status(200).send({ message: "successfully got it", product });
  } catch (error) {
    console.log("Error in getting the product");
    return res.status(500).send({ message: "error", error });
  }
};
const getProductPicture = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.pid).select("photo");

    if (!product || !product.photo || !product.photo.data) {
      return res.status(404).send({ message: "Photo not found" });
    }

    // Set the content type and send the image data
    res.set("Content-Type", product.photo.contentType);
    return res.status(200).send(product.photo.data);
  } catch (error) {
    console.log("Error in fetching the product picture:", error);
    return res.status(500).send({ message: "Error retrieving photo", error });
  }
};
const deleteProduct = async (req, res) => {
  try {
    const product = await productModel.findByIdAndDelete(req.params.pid);
    return res.status(200).send({ message: "Deleted" });
  } catch (error) {
    console.log("error in deletion of product");
    return res.status(500).send({ error });
  }
};
const updateProductController = async (req, res) => {
  try {
    const { name, description, price, category, quantity, shipping } =
      req.fields;
    const { photo } = req.files;

    // Validate required fields
    if (!name || !description || !price || !category || !quantity) {
      return res.status(400).send({ message: "All fields are mandatory" });
    }

    // Find the product by ID
    const product = await productModel.findById(req.params.pid);
    if (!product) {
      return res.status(404).send({ message: "Product not found" });
    }

    // Update product fields
    product.name = name || product.name;
    product.description = description || product.description;
    product.price = price || product.price;
    product.category = category || product.category;
    product.quantity = quantity || product.quantity;
    product.shipping = shipping || product.shipping;
    product.slug = slugify(name);

    // Handle photo if provided
    if (photo) {
      if (photo.size > 10000000) {
        return res
          .status(400)
          .send({ message: "Picture size should be less than 10MB" });
      }
      product.photo.data = fs.readFileSync(photo.path);
      product.photo.contentType = photo.type;
    }

    // Save the updated product
    await product.save();
    res.status(200).send({ message: "Product updated successfully", product });
  } catch (error) {
    console.log("Error in updating product:", error);
    res.status(500).send({ message: "Error updating product", error });
  }
};

module.exports = {
  createProductController,
  getProductController,
  getProductBySlug,
  getProductPicture,
  deleteProduct,
  updateProductController,
};
