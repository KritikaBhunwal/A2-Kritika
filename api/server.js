/* --------------------------------------------
   Main entry — spins up Express app
---------------------------------------------*/
require('dotenv').config();
const express    = require('express');
const bodyParser = require('body-parser');
const cors       = require('cors');
const morgan     = require('morgan');
const path       = require('path');

const productRoutes = require('./routes/productRoutes');

const app = express();

// --- Middlewares (order matters) ---
app.use(morgan('dev'));                       // Small request logger
app.use(cors());                              // Allow React (different port)
app.use(bodyParser.json());                   // Parse JSON bodies
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
//    ↑ serve images publicly  e.g. http://localhost:4000/uploads/clothing1.jpg

// --- API routes ---
app.use('/api/products', productRoutes);      // All product CRUD

// --- Global error handler ---
app.use((err, req, res, _next) => {
  console.error(err);
  res.status(err.status || 500).json({ message: err.message || 'Internal error' });
});

app.get('/', (req, res) => {
  res.send('API is running...');
}
);

// --- Start server ---
app.listen(process.env.PORT, () =>
  console.log(`🚀 API ready at http://localhost:${process.env.PORT}`)
);
