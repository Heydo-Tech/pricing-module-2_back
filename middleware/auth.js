//middleware/auth.js
require('dotenv').config();
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

const authenticateToken = (req, res, next) => {
    // console.log(JWT_SECRET)
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Extract token after 'Bearer'
    // console.log('Authorization Header:', req.headers['authorization']);
// console.log('Extracted Token:', token);
  
    if (!token) {
      return res.status(401).json({ message: 'Access token missing' });
    }
  
    jwt.verify(token, JWT_SECRET, (err, user) => {
      if (err) {
        return res.status(403).json({ message: 'Invalid token' });
      }
      req.user = user; // Attach user to request
      next();
    });
  };

module.exports = { authenticateToken };
