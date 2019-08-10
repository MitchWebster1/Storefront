DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
  id INT AUTO_INCREMENT NOT NULL,
  productName VARCHAR(150) NOT NULL,
  departmentName VARCHAR(150) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  stockQuantity INT NOT NULL,
  createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
);

INSERT INTO products (productName, departmentName, price, stockQuantity)
VALUE
('Dreampark Speed Cube Set, [12 Pack] Cube Bundle', 'Toys', 37.99, 32),
('Gamo Varmint Air Rifle .177 Cal ', 'Outdoors', 85.99, 15),
('LG Electronics 42.5" Screen LED-lit Monitor', 'Office', 539.99, 3),
('Nerf Guns', 'Toys', 12.99, 85),
('Kong Dog Toy', 'Toys', 13.99, 43),
('Hiking Boots', 'Outdoors', 120.89, 6),
('Trekking Poles', 'Outdoors', 110.99, 2),
('Super Clicky Keyboard', 'Office', 95.99, 32),
('Fast Scrolling Mouse', 'Office', 45.99, 54);


CREATE TABLE sales (
  id INT AUTO_INCREMENT NOT NULL,
  productName VARCHAR(150) NOT NULL,
  departmentName VARCHAR(150) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  quantity INT NOT NULL,
  total DECIMAL(10,2) NOT NULL
  createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
)