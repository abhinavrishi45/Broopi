const jwt = require('jsonwebtoken');

module.exports = function requireAuth(req, res, next){
  try{
    const token = req.cookies?.token || (req.headers.authorization || '').replace(/^Bearer\s+/i, '');

    if(!token) return res.status(401).json({error: 'Unauthorized'});
    const payload = jwt.verify(token, process.env.SECRET_KEY);
    req.auth ={sub: payload.sub, email: payload.email};
    next();
  } catch {
    return res.status(401).json({error: 'Unauthorized'});
  }
};