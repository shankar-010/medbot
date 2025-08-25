// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const pool = require('../config/db');


// const register = async (req, res) => {
//   const { username, password } = req.body;
//   try {
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const result = await pool.query(
//       'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id, username',
//       [username, hashedPassword]
//     );
//     res.status(201).json({ message: 'User registered', user: result.rows[0] });
//   } catch (error) {
//     res.status(400).json({ error: 'Username already exists' });
//   }
// };

// const login = async (req, res) => {
//   const { username, password } = req.body;
//   try {
//     const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
//     const user = result.rows[0];
//     if (!user || !(await bcrypt.compare(password, user.password))) {
//       return res.status(401).json({ error: 'Invalid credentials' });
//     }
//     const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, {
//       expiresIn: '1h',
//     });
//     res.json({ token });
//   } catch (error) {
//     res.status(500).json({ error: 'Server error' });
//   }
// };

// module.exports = { register, login };


const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
router.post('/diagnose', authController.diagnose); // Add this line
router.post('/register', authController.register);
router.post('/login', authController.login);

module.exports = router;