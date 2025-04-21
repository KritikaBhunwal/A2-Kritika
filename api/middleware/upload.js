/*  Stores user‑uploaded images in /uploads
    and rejects non‑image mime types               */
    const multer  = require('multer');
    const path    = require('path');
    
    const storage = multer.diskStorage({
      destination: (_, __, cb) => cb(null, path.join(__dirname, '..', 'uploads')),
      filename  : (_, file, cb) => {
        const unique = Date.now() + '-' + Math.round(Math.random()*1e9);
        cb(null, unique + path.extname(file.originalname));
      }
    });
    
    const fileFilter = (_, file, cb) =>
      (/^image\//).test(file.mimetype) ? cb(null, true) : cb(new Error('Only images'));
    
    module.exports = multer({ storage, fileFilter });
    