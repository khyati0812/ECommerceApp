const categoryModel = require("../models/categoryModel");
const slugify = require("slugify");
const createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name)
      return res.status(401).send({ message: "Name is required to proceed" });
    const existingName = await categoryModel.findOne({ name });
    if (existingName)
      return res.status(200).send({ message: "This category already exists" });
    const category = await new categoryModel({ name, slug: slugify(name) });
    category.save();
    return res
      .status(200)
      .send({ success: true, message: "New category created", category });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      error,
      message: "Error in creation of category",
    });
  }
};
const updateCategory = async (req, res) => {
  try {
    const { name } = req.body; // Ensure you're destructuring 'name' from req.body
    const { id } = req.params; // Ensure you're getting the 'id' from req.params

    // Check if category already exists
    const existingCategory = await categoryModel.findOne({ name });
    if (existingCategory) {
      return res.status(400).send({
        message: "The category name you are trying to change to already exists",
      });
    }

    // Update the category
    const categoryToBeUpdated = await categoryModel.findByIdAndUpdate(
      id,
      {
        name: name,
        slug: slugify(name),
      },
      { new: true } // To return the updated document
    );

    if (!categoryToBeUpdated) {
      return res.status(404).send({
        message: "Category not found",
      });
    }

    return res.status(200).send({
      success: true,
      message: "Category successfully updated",
      category: categoryToBeUpdated, // Send the updated category
    });
  } catch (error) {
    console.error("Error in updating the category:", error);
    return res.status(500).send({ error, message: "Something went wrong" });
  }
};

const getSingleCategory = async (req, res) => {
  try {
    const slug = req.params.slug;
    const findCategory = await categoryModel.findOne({ slug });
    if (!findCategory)
      return res.status(404).send({ message: "Category not found" });
    return res.status(201).send({ success: true, findCategory });
  } catch (error) {
    return res.status(500).send({ error });
  }
};
const getAllCategories = async (req, res) => {
  try {
    const findCategory = await categoryModel.find({});
    if (!findCategory)
      return res.status(404).send({ message: "Category not found" });
    return res.status(201).send({ success: true, findCategory });
  } catch (error) {
    return res.status(500).send({ error });
  }
};
const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the category by id and delete
    const category = await categoryModel.findByIdAndDelete(id);

    // If the category is not found
    if (!category) {
      return res.status(404).send({
        success: false,
        message: "Category not found",
      });
    }

    // If successfully deleted
    return res.status(200).send({
      success: true,
      message: "Category successfully deleted",
      category,
    });
  } catch (error) {
    console.error("Error in deleting category:", error);
    return res.status(500).send({
      success: false,
      message: "Something went wrong",
      error,
    });
  }
};

module.exports = {
  createCategory,
  deleteCategory,
  getAllCategories,
  getSingleCategory,
  updateCategory,
};
