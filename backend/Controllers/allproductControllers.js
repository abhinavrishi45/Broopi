const AllProduct = require('../Models/allproductModel');

exports.createAllProduct = async (req, res) => {
  try {
    const { name, category, subcategory, time, newPrice, oldPrice, description } = req.body;
    const image = req.file?.filename;

    if (!name || !category || !subcategory || !time || !newPrice || !oldPrice || !description || !image) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }

    const product = new AllProduct({ name, category, subcategory, time, newPrice, oldPrice, image, description });
    await product.save();

    res.status(201).json({ message: 'Product added successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    const products = await AllProduct.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const existingProduct = await AllProduct.findById(id);
    if (!existingProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    const updatedData = {
      name: req.body.name || existingProduct.name,
      category: req.body.category || existingProduct.category,
      subcategory: req.body.subcategory || existingProduct.subcategory,
      time: req.body.time || existingProduct.time,
      newPrice: req.body.newPrice || existingProduct.newPrice,
      oldPrice: req.body.oldPrice || existingProduct.oldPrice,
      image: req.file ? req.file.filename : existingProduct.image,
      description: req.body.description || existingProduct.description
    };
    const updatedProduct = await AllProduct.findByIdAndUpdate(id, updatedData, { new: true });

    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = await AllProduct.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.getOneProductPerCategory = async (req, res) => {
  try {
    const products = await AllProduct.aggregate([
      {
        $group: {
          _id: "$category",
          product: { $first: "$$ROOT" }
        }
      },
      { $replaceRoot: { newRoot: "$product" } }
    ]);

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.getOneProductPerSubcategory = async (req, res) => {
  try {
    const products = await AllProduct.aggregate([
      {
        $group: {
          _id: "$subcategory",
          product: { $first: "$$ROOT" }
        }
      },
      { $replaceRoot: { newRoot: "$product" } }
    ]);

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
exports.getProductsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const products = await AllProduct.find({ category });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};