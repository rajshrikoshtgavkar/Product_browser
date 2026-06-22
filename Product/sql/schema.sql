CREATE DATABASE IF NOT EXISTS product_browser;

USE product_browser;

CREATE TABLE products (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    created_at DATETIME NOT NULL,
    updated_at DATETIME NOT NULL
);

CREATE INDEX idx_products_updated_id
ON products(updated_at DESC, id DESC);

CREATE INDEX idx_products_category
ON products(category);

SELECT COUNT(*) FROM products;

SHOW INDEX FROM products;

select * from products;