DROP DATABASE IF EXISTS store_db;

CREATE DATABASE store_db;

USE store_db;

CREATE TABLE products (
  item_id INT,
  product_name VARCHAR(45) NULL,
  department_name VARCHAR(45) NULL,
  price INT,
  stock_quantity INT NULL,
  PRIMARY KEY (id)
);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (1, "sweatshirt", "apparel", 22.0, 100);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (2, "sweatpants", "apparel", 25.0, 80);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (3, "watershoes", "footwear", 30.0, 55);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (4, "tshirt", "apparel", 10.0, 72);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (5, "ballCap", "headwear", 15.0, 45);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (6, "beanie", "headwear", 20.0, 53);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (7, "backpack", "gear", 65.0, 2);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (8, "boots", "footwear", 105.0, 92);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (9, "waterbottle", "gear", 7.0, 0);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (10, "socks", "footwear", 10.0, 35);