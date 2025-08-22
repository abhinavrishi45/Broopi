const express = require('express');
const router = express.Router();
const {saveLocation} = require('../Controllers/locationControllers');

router.post('/save', saveLocation);

module.exports = router;