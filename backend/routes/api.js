const express = require('express');
const jwt = require('jsonwebtoken');
const { register, login } = require('../controllers/authController');
const { diagnose, getHistory, deletePrescription } = require('../controllers/prescriptionController');
const router = express.Router();

const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token provided' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

router.post('/register', register);
router.post('/login', login);
router.post('/diagnose', authenticate, diagnose);
router.get('/history', authenticate, getHistory);
router.delete('/prescriptions/:id', authenticate, deletePrescription);

module.exports = router;