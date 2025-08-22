const express = require('express');
const router = express.Router();
const { uploadHomeCard } = require('../Middleware/upload');
const { createhomecard, getHomeCards, updateHomecard,
  deleteHomecard, } = require('../Controllers/homecardControllers');

router.post('/homecard', uploadHomeCard.single('image'), createhomecard);
router.get('/homecard', getHomeCards);
router.put('/homecard/:id', uploadHomeCard.single('image'), updateHomecard);
router.delete('/homecard/:id', deleteHomecard);

module.exports = router;