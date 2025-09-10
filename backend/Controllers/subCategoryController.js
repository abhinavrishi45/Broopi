const Subcategory = require('../Models/subcategoryModel');

exports.createSubcategory = async (req, res) => {
  try {
    const { category, name } = req.body;
    const image = req.file?.filename;

    if (!name || !image || !category) {
      return res.status(400).json({ message: 'Name, category, and image are required' });
    }

    const exist = await Subcategory.findOne({ name, category });
    if (exist) {
      return res.status(400).json({ message: 'Subcategory already exists in this category' });
    }

    const subcategory = new Subcategory({
      name,
      image,
      category,
    });

    await subcategory.save();
    res.status(201).json(subcategory);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
exports.getSubcategories = async (req, res) => {
  try {
    const subcategories = await Subcategory.find().populate('category', 'name');
    res.json(subcategories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getSubcategoriesByCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const subcategories = await Subcategory.find({ category: categoryId });
    res.json(subcategories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteSubcategory = async (req, res) => {
  try {
    const subcategory = await Subcategory.findByIdAndDelete(req.params.id);
    if (!subcategory) return res.status(404).json({ message: 'Subcategory not found' });

    res.json({ message: 'Subcategory deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateSubcategory = async (req, res) => {
  try {
    const { name, category } = req.body;
    const image = req.file?.filename;

    const updateData = {};
    if (name) updateData.name = name;
    if (category) updateData.category = category;
    if (image) updateData.image = image;

    const subcategory = await Subcategory.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!subcategory) return res.status(404).json({ message: 'Subcategory not found' });

    res.json(subcategory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
