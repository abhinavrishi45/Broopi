const Category = require('../Models/categoryModel');
const path = require('path');
const fs = require('fs');

exports.createCategory = async (req, res) => {
  try {
    const { name, link } = req.body;
    const image = req.file?.filename;
    if (!name || !image) {
      return res.status(400).json({ message: 'Name and image are required' });
    }
    const exist = await Category.findOne({ name });
    if (exist) {
      return res.status(400).json({ message: 'Category already exists' });
    }

    const category = new Category({ name, image, link });
    await category.save();
    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort({ createdAt: -1 });
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) return res.status(404).json({ message: 'Category not found' });
    res.json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    if (req.file) {
      const oldFilePath = path.join(__dirname, "../uploads/Category/", category.image);
      if (fs.existsSync(oldFilePath)) {
        fs.unlinkSync(oldFilePath); 
      }
      category.image = req.file.filename;
    }

    if (req.body.name) {
      category.name = req.body.name;
    }
    if (req.body.link) {
      category.link = req.body.link;
    }

    await category.save();
    res.json({ message: "Category updated successfully", category });
  } catch (err) {
    console.error("Update error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) return res.status(404).json({ message: 'Category not found' });
    res.json({ message: 'Category deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
