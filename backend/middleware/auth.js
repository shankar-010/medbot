const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
      console.log('No token provided');
      return res.status(401).json({ error: 'No token provided' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('User authenticated:', decoded);
    req.user = decoded; // Attach decoded user to request
    next(); // Continue to the next middleware or route
  } catch (error) {
    console.log('Invalid token:', error.message);
    res.status(401).json({ error: 'Invalid token' });
  }
};

module.exports = { authenticateToken };