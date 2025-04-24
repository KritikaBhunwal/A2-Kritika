const jwt = require('jsonwebtoken');

/**
 * Protect routes by verifying JWT.
 * Attaches `req.userId` on success.
 */
module.exports = (req, res, next) => {
  const auth = req.headers.authorization;
  console.log('Authorization header:', auth); // Debug log
  if (!auth?.startsWith('Bearer '))
    return res.status(401).json({ message: 'Missing token' });

  const token = auth.split(' ')[1];
  console.log('Extracted token:', token); // Debug log
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Token payload:', payload); // Debug log
    req.userId = payload.userId;
    next();
  } catch (err) {
    console.error('Token verification error:', err); // Debug log
    res.status(401).json({ message: 'Invalid token' });
  }
};
