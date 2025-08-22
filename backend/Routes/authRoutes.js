const express = require('express');
const router = express.Router();
const {
  register,
  login,
  googleCallback,
  me,
  logout
} = require('../Controllers/authControllers');
const passport = require('../Config/passport');

router.post('/register', register);
router.post('/login', login);

router.get('/google', passport.authenticate('google', {
  scope: ['openid', 'profile', 'email']
}));

// router.get('/google/callback', googleCallback);
router.get('/google/callback', (req, res, next) => {
  googleCallback(req, res, next);
});

router.get('/me', me);
router.post('/logout', logout);

module.exports = router;
