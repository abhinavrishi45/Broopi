const express = require('express');
const router = express.Router();
const {
  savedt,
  getdts,
} = require('../Controllers/dtControllers');

router.post('/savedt', savedt);
router.get('/getdt', getdts);

module.exports = router;