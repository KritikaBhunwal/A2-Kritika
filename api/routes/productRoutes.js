const router = require('express').Router();
const upload = require('../middleware/upload');
const ctrl   = require('../controllers/productController');

/*    /api/products
      ├── GET    /            → All (with optional filters)
      ├── GET    /:id         → One
      ├── POST   /            → Create  (multipart/form‑data)
      ├── PUT    /:id         → Update  (multipart/form‑data)
      └── DELETE /:id         → Remove
*/
router
 .route('/')
 .get(ctrl.getAll)
 .post(upload.single('image'), ctrl.create);

router
 .route('/:id')
 .get(ctrl.getOne)
 .put(upload.single('image'), ctrl.update)
 .delete(ctrl.remove);

module.exports = router;
