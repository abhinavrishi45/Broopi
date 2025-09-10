const express = require('express');
const router = express.Router();

const { addReview, getReviewsByProduct } = require('../Controllers/ReviewController');
const requireAuth  = require('../Middleware/requireAuth');
router.post('/reviews', requireAuth, addReview);
router.get('/reviews/:productId', getReviewsByProduct);
module.exports = router;