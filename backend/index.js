require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./Config/db');
const cookieParser = require('cookie-parser');
connectDB();
const session = require('express-session');
const passport = require('passport');
require('./Config/passport');
const multer = require('multer');
const path = require('path');
const authRoutes = require('./Routes/authRoutes');
const locationRoutes = require('./Routes/locationRoute');
const allproductRoutes = require('./Routes/allproductRoutes');
const categoryRoutes = require('./Routes/categoryRoutes');
const subCategoryRoutes = require('./Routes/subCategoryRoutes');
const homeCardRoutes = require('./Routes/homecardRoutes');
const cartRoutes = require('./Routes/cartRoutes');
// const orderRoutes = require('./Routes/orderRoutes');
const FirstCardRoutes = require('./Routes/FirstCardRoutes');
const LongBannerRoutes = require('./Routes/longBannerRoutes');
const videoRoutes = require('./Routes/videoRoutes');
const reviewRoutes = require('./Routes/reviewRoutes');
const addressRoutes = require('./Routes/addressRoutes');
const dtRoutes = require('./Routes/dtRoutes');
const paymentRoutes = require('./Routes/paymentRoutes');
const app = express();


app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174'],
  credentials: true,
}));
app.use(session({
  secret: process.env.SESSION_SECRET || 'dev_script',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
    sameSite: 'lax'
  }
}))
app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

const PORT = process.env.PORT || 5000;
app.use('/uploads/Category', express.static(path.join(__dirname, 'uploads/Category')));
app.use('/uploads/subCategory', express.static(path.join(__dirname, 'uploads/subCategory')));
app.use('/uploads/allproducts', express.static(path.join(__dirname, 'uploads/allproducts')));
app.use('/uploads/FirstCard', express.static(path.join(__dirname, 'uploads/FirstCard')));
app.use('/uploads/LongBanner', express.static(path.join(__dirname, 'uploads/LongBanner')));
app.use('/uploads/review', express.static(path.join(__dirname, 'uploads/review')));
app.use('/uploads/Video', express.static(path.join(__dirname, 'uploads/Video')));


app.use('/api/auth', authRoutes);
app.use('/api/location', locationRoutes);
app.use('/api/homecard', homeCardRoutes);
app.use('/api/product', allproductRoutes);
app.use('/api', categoryRoutes);
app.use('/api', subCategoryRoutes);
app.use('/api/cart', cartRoutes);
// app.use('/api', orderRoutes);
app.use('/api', FirstCardRoutes);
app.use('/api', LongBannerRoutes);
app.use('/api', reviewRoutes);
app.use('/api', videoRoutes);
app.use('/api/address', addressRoutes);
app.use('/api/dt', dtRoutes);
app.use('/api/payment', paymentRoutes);
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));