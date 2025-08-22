const express = require('express');
const router = express.Router();
const { uploadAllProducts } = require('../Middleware/upload');
const { createAllProduct, getAllProducts, updateProduct,
  deleteProduct } = require('../Controllers/allproductControllers');

router.post('/allproducts', uploadAllProducts.single('image'), createAllProduct);
router.get('/allproducts', getAllProducts);
router.put('/allproducts/:id', uploadAllProducts.single('image'), updateProduct);
router.delete('/allproducts/:id', deleteProduct);

module.exports = router;