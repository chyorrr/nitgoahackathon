const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Use the same secret as real middleware so tokens validate
const JWT_SECRET = 'myhackathonsecretkey123';

// In-memory users store for dev
const users = [];

// POST /api/auth/register
router.post('/register', async (req, res) => {
  try {
    const { username, email, password, role } = req.body || {};
    if (!email || !password) return res.status(400).json({ message: 'Email and password required' });

    // simple exists check
    const exists = users.find(u => u.email === email.toLowerCase());
    if (exists) return res.status(400).json({ message: 'User already exists' });

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);
    const user = { id: String(Date.now()), username: username || '', email: email.toLowerCase(), password: hashed, role: role || 'citizen' };
    users.push(user);
    return res.status(201).json({ message: 'User registered successfully!' });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body || {};
    if (!email || !password) return res.status(400).json({ message: 'Email and password required' });

    const user = users.find(u => u.email === email.toLowerCase());
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const payload = { user: { id: user.id, role: user.role } };
    jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

module.exports = router;
