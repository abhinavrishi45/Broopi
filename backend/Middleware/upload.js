// const multer  = require('multer');
// const path = require('path');
// const storage = multer.diskStorage({
//   destination: (req, file, cb) =>{
//     cb(null, 'uploads/homeCard');
//   },
//   filename:(req, file, cb) =>{
//     cb(null, `${Date.now()}-${file.originalname}`);

//   }
// });
// const upload = multer({storage:storage});
// module.exports = upload;

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

const uploadAllProducts = multer({ storage: storageAllProducts });
const uploadHomeCard = multer({ storage: storageHomeCard });

module.exports = {
  uploadAllProducts,
  uploadHomeCard
};
