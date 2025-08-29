const express = require('express');
const router = express.Router();
const { uploadlongBanner } = require('../Middleware/upload');

const {
  createLongBanner,
  getLongBanner, 
  deleteLongBanner,
  updateLongBanner
} = require('../Controllers/longBannerControllers');

router.post('/LongBanner', uploadlongBanner.single('image'), createLongBanner);
router.get('/LongBanner', getLongBanner);
router.delete("/LongBanner/:id", deleteLongBanner

);
router.put("/LongBanner/:id", uploadlongBanner.single("image"), updateLongBanner);

module.exports = router;