-- ① create DB
DROP DATABASE IF EXISTS garments;
CREATE DATABASE garments CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE garments;

-- ② secondary table
CREATE TABLE categories (
  id   INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE products
  ADD COLUMN user_id INT NOT NULL AFTER id,
  ADD CONSTRAINT fk_user
    FOREIGN KEY (user_id)
    REFERENCES users(id)
    ON DELETE CASCADE;



-- ③ primary table
CREATE TABLE products (
  id          INT PRIMARY KEY AUTO_INCREMENT,
  cat_id      INT NOT NULL,
  title       VARCHAR(100) NOT NULL,
  description TEXT,
  price       DECIMAL(8,2) NOT NULL,
  stock       INT UNSIGNED NOT NULL DEFAULT 0,
  material    VARCHAR(100),
  image       VARCHAR(255),
  created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_cat
    FOREIGN KEY (cat_id) REFERENCES categories(id)
      ON UPDATE CASCADE ON DELETE RESTRICT
);

-- ④ seed categories
INSERT INTO categories(name) VALUES
 ('Dress'), ('Co‑ords'), ('Top'), ('Jumpsuit');

-- ⑤ seed sample products (image files live in api/uploads/)
INSERT INTO products(cat_id,title,description,price,stock,material,image) VALUES
 (2,'Serenity Co‑ords Skirt','Lightweight rayon set. Perfect for a weekend getaway.',60,12,'80% Rayon, 20% Cotton','clothing1.jpg'),
 (2,'Blooming Co‑ords Pants','Embroidered co‑ords that shimmer.',60,10,'100% Rayon','clothing2.jpg'),
 (1,'Floral Fizz Dress','Breezy day‑out dress.',50,12,'100% Cotton','clothing3.jpg'),
 (3,'Scalloped Neck Top','Laced top for a chic look.',25,18,'50% Cotton, 50% Rayon','clothing4.jpg'),
 (4,'Serenity Jumpsuit','Comfort + style in one.',50,6,'100% Rayon','clothing5.jpg'),
 (2,'Tasseled Co‑ords Pants','Elegant, cozy evening wear.',60,7,'100% Rayon','clothing6.jpg'),
 (1,'Serenity Dress','A‑line classic chic.',45,3,'90% Rayon, 10% Cotton','clothing7.jpg');
