const express = require('express');
const router = express.Router();
const { uploadCategory } = require('../Middleware/upload');

const {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} = require('../Controllers/categoryController');

router.post('/category', uploadCategory.single('image'), createCategory);
router.get('/category', getCategories);
router.get('/category/:id', getCategoryById);
router.put('/category/:id', uploadCategory.single('image'), updateCategory);
router.delete('/category/:id', deleteCategory);
module.exports = router;