
DROP DATABASE IF EXISTS ecommerce_db;

CREATE DATABASE ecommerce_db;

-- USE ecommerce_db;

-- CREATE TABLE Category (
--   id INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
--   category_name VARCHAR(255) NOT NULL
-- );

-- CREATE TABLE Product (
--   id INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
--   product_name VARCHAR(255) NOT NULL,
--   price DECIMAL(10,2) NOT NULL,
--   stock INTEGER NOT NULL DEFAULT 10,
--   category_id INTEGER NOT NULL,
--   CONSTRAINT fk_category
--     FOREIGN KEY (category_id)
--     REFERENCES Category(id)
-- );

-- CREATE TABLE Tag (
--   id INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
--   tag_name VARCHAR(255) NOT NULL
-- );

-- CREATE TABLE ProductTag (
--   id INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
--   product_id INTEGER NOT NULL,
--   tag_id INTEGER NOT NULL,
--   CONSTRAINT fk_product
--     FOREIGN KEY (product_id)
--     REFERENCES Product(id),
--   CONSTRAINT fk_tag
--     FOREIGN KEY (tag_id)
--     REFERENCES Tag(id)
-- );


