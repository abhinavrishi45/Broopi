const express = require('express');
const router = express.Router();
const { uploadVideo } = require('../Middleware/upload');
const {
  uploadVideos,
  getAllVideos,
  getVideoById,
  deleteVideo
} = require('../Controllers/videoController');

router.post('/videos', uploadVideo.single('video'), uploadVideos);
router.get('/videos', getAllVideos);
router.get('/videos/:id', getVideoById);
router.delete('/videos/:id', deleteVideo);
module.exports = router;
