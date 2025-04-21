/*  All DB logic isolated from route definition   */
const db = require('../config/db');

// Helper to build WHERE clause for filters
const buildFilters = (q) => {
  const clauses = [], params = {};
  if (q.minPrice)  { clauses.push('price >= :minPrice');  params.minPrice = q.minPrice; }
  if (q.maxPrice)  { clauses.push('price <= :maxPrice');  params.maxPrice = q.maxPrice; }
  if (q.inStock)   { clauses.push('stock > 0'); }
  if (q.category)  { clauses.push('cat_id = :category');  params.category = q.category; }
  return { sql: clauses.length ? 'WHERE ' + clauses.join(' AND ') : '', params };
};

// --- CRUD ---
exports.getAll = async (req, res, next) => {
  try {
    const { sql, params } = buildFilters(req.query);
    const [rows] = await db.query(
      `SELECT p.*, c.name AS category 
         FROM products p JOIN categories c ON p.cat_id = c.id ${sql}`, params);
    res.json(rows);
  } catch (err) { next(err); }
};

exports.getOne = async (req, res, next) => {
  try {
    const [rows] = await db.query(
      `SELECT p.*, c.name AS category
         FROM products p JOIN categories c ON p.cat_id = c.id
        WHERE p.id = ?`, [req.params.id]);
    if (!rows.length) return res.status(404).json({message:'Not found'});
    res.json(rows[0]);
  } catch (err) { next(err); }
};

exports.create = async (req, res, next) => {
  try {
    const { cat_id, title, description, price, stock, material } = req.body;
    const image = req.file ? req.file.filename : null;
    const [result] = await db.query(
      `INSERT INTO products (cat_id,title,description,price,stock,material,image)
       VALUES (?,?,?,?,?,?,?)`,
       [cat_id, title, description, price, stock, material, image]);
    res.status(201).json({ id: result.insertId });
  } catch (err) { next(err); }
};

exports.update = async (req, res, next) => {
  try {
    const { cat_id, title, description, price, stock, material } = req.body;
    const imageClause = req.file ? ', image = :image' : '';
    const params = { cat_id, title, description, price, stock, material, id: req.params.id };
    if (req.file) params.image = req.file.filename;

    const [result] = await db.query(
      `UPDATE products SET
         cat_id=:cat_id, title=:title, description=:description,
         price=:price, stock=:stock, material=:material ${imageClause}
       WHERE id=:id`, params);
    if (!result.affectedRows) return res.status(404).json({message:'Not found'});
    res.json({ message: 'Updated' });
  } catch (err) { next(err); }
};

exports.remove = async (req, res, next) => {
  try {
    const [result] = await db.query('DELETE FROM products WHERE id=?', [req.params.id]);
    if (!result.affectedRows) return res.status(404).json({message:'Not found'});
    res.status(204).end();
  } catch (err) { next(err); }
};
