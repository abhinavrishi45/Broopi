const User = require('../Models/userModels');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('../Config/passport');

const JWT_SECRET = process.env.JWT_SECRET;
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';

const register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: 'User already exists' });
    // const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      password,
      authProvider: 'local'
    });

    await newUser.save();
    const token = jwt.sign({ userId: newUser._id }, JWT_SECRET, {
      expiresIn: '7d'
    });
    res.cookie('token', token, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000
    })

    res.status(201).json({
      message: 'User registered successfully',
      user: { id: newUser._id, 
        name: newUser.name, 
        email: newUser.email }
    });
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
};
const login = async (req, res) => {
  const { email, password } = req.body;
  console.log('Login req.body:', req.body);
  try {
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const user = await User.findOne({ email }).select('+password');

    if (!user || user.authProvider !== 'local') {

      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials4474' });
    }

    const token = jwt.sign({ id: user._id },
      process.env.JWT_SECRET, {
      expiresIn: '7d'
    });
    res.cookie('token', token, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    })

    res.status(200).json({
      message: 'Login successful',
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });

  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
const googleCallback = (req, res, next) => {
  passport.authenticate('google', { failureRedirect: 'http://localhost:5173/login' }, async (err, user) => {
    if (err || !user) {
      return res.redirect('http://localhost:5173/login');
    }

    const token = jwt.sign(
      { id: user._id, email: user.email, name: user.name },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.cookie('token', token, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    const userString = encodeURIComponent(JSON.stringify({ id: user._id, name: user.name, email: user.email }));
    return res.redirect(`http://localhost:5173/?user=${userString}`);
  })(req, res, next);
};

const me = (req, res) => {
  const token = req.cookies?.token;
  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    res.json({
      id: decoded.id,
      email: decoded.email,
      name: decoded.name,
      picture: decoded.picture
    });
  } catch {
    res.status(401).json({ message: 'Invalid token' });
  }
};

const logout = (req, res) => {
  res.clearCookie('token');
  res.json({ message: 'Logged out successfully' });
};

module.exports = {
  register,
  login,
  googleCallback,
  me,
  logout
};
