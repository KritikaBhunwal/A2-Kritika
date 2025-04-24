const express = require('express');
require('dotenv').config();
const productRoutes = require('./routes/products');
const authRoutes    = require('./routes/auth');
const app = express();

app.use(express.json());
app.use('/uploads', express.static('uploads'));

app.use('/api/users', authRoutes);
app.use('/api/products', productRoutes);

app.use((err, _, res, __) => {
  console.error(err);
  res.status(500).json({ error: err.message });
});

app.listen(3000, () => console.log('API listening on port 3000'));
