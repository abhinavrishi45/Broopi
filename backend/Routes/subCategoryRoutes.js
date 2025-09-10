const express = require('express');
const router = express.Router();
const { uploadsubCategory } = require('../Middleware/upload');
const { createSubcategory,
  getSubcategories,
  getSubcategoriesByCategory,
  deleteSubcategory,  
  updateSubcategory } = require('../Controllers/subCategoryController');

router.post('/subcategory', uploadsubCategory.single('image'), createSubcategory);
router.get('/subcategory', getSubcategories);
router.get('/subcategory/:categoryId', getSubcategoriesByCategory);
router.delete('/subcategory/:id', deleteSubcategory); 
router.put('/subcategory/:id', uploadsubCategory.single('image'), updateSubcategory);

module.exports = router;
