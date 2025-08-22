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
const homeCardRoutes = require('./Routes/homecardRoutes');
const cartRoutes = require('./Routes/cartRoutes');
const orderRoutes = require('./Routes/orderRoutes');
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

app.use('/api/auth', authRoutes);
app.use('/uploads/homeCard', express.static(path.join(__dirname, 'uploads/homeCard')));
app.use('/api/location', locationRoutes);
app.use('/api/homecard', homeCardRoutes);
app.use('/uploads/allproducts', express.static(path.join(__dirname, 'uploads/allproducts')));
app.use('/api/product', allproductRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api', orderRoutes);
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));