const bcrypt = require('bcrypt');
const jwt    = require('jsonwebtoken');
const db     = require('../config/db');
const { validationResult } = require('express-validator');

/**
 * POST /users
 * Register a new user:
 * - validate inputs
 * - hash password
 * - return new user ID
 */
exports.signUp = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  const { email, password } = req.body;
  try {
    const hash = await bcrypt.hash(password, 10);
    const [result] = await db.query(
      'INSERT INTO users (email, password) VALUES (?, ?)',
      [email, hash]
    );
    res.status(201).json({ id: result.insertId });
  } catch (err) {
    next(err);
  }
};

/**
 * POST /users/sign-in
 * Login:
 * - validate inputs
 * - compare password
 * - issue JWT
 */
exports.signIn = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  const { email, password } = req.body;
  try {
    const [rows] = await db.query(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );
    if (!rows.length)
      return res.status(401).json({ message: 'Invalid credentials' });

    const user = rows[0];
    const ok = await bcrypt.compare(password, user.password);
    if (!ok)
      return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET,
      { expiresIn: '2h' }
    );
    res.json({ token });
  } catch (err) {
    next(err);
  }
};
