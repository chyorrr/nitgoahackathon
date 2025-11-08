// In middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const JWT_SECRET = "myhackathonsecretkey123"; // Use the same secret!

module.exports = function(req, res, next) {
  // Get token from the header
  const token = req.header('x-auth-token');

  // Check if no token
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  // Verify token
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded.user; // Add the user payload (id, role) to the request
    next(); // Move to the next step (the route handler)
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};
