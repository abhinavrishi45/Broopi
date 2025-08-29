const express = require('express');
const router = express.Router();
const { uploadFirstCard } = require('../Middleware/upload');

const {
  createFirstCard,
  getFirstCard, 
  deleteCard,
  updateCard
} = require('../Controllers/FirstCard');

router.post('/firstcard', uploadFirstCard.single('image'), createFirstCard);
router.get('/firstcard', getFirstCard);
router.delete("/firstcard/:id", deleteCard);
router.put("/firstcard/:id", uploadFirstCard.single("image"), updateCard);

module.exports = router;