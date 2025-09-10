const multer = require('multer');
const path = require('path');

const storageAllProducts = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads/allproducts'));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const storageHomeCard = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads/homeCard'));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const storageFirstCard = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads/FirstCard'));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));

  }
});
const storagelongBanner = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads/LongBanner'));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));

  }
});
const storageCategory = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads/Category'));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));

  }
});
const storagesubCategory = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads/subCategory'));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));

  }
});
const VideoStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads/Video'));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const uploadAllProducts = multer({ storage: storageAllProducts });
const uploadHomeCard = multer({ storage: storageHomeCard });
const uploadFirstCard = multer({ storage: storageFirstCard });
const uploadCategory = multer({ storage: storageCategory });
const uploadlongBanner = multer({ storage: storagelongBanner });
const uploadsubCategory = multer({ storage: storagesubCategory });
const uploadVideo = multer({ storage: VideoStorage });

module.exports = {
  uploadAllProducts,
  uploadHomeCard,
  uploadFirstCard,
  uploadlongBanner,
  uploadCategory,
  uploadsubCategory,
  uploadVideo,
};
