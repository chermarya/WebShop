CREATE DATABASE WebShopDB;
GO

USE WebShopDB;
GO

CREATE TABLE Users (
    user_id INT IDENTITY PRIMARY KEY,
    name NVARCHAR(30) NOT NULL,
    surname NVARCHAR(30) NOT NULL,
    email NVARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE Categories (
    category_id INT IDENTITY PRIMARY KEY,
    title NVARCHAR(100) NOT NULL
);

CREATE TABLE Products (
    product_id INT IDENTITY PRIMARY KEY,
    title NVARCHAR(100) NOT NULL,
    category_id INT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    quantity INT NOT NULL,
    FOREIGN KEY (category_id) REFERENCES Categories(category_id)
);

CREATE TABLE Orders (
    order_id INT IDENTITY PRIMARY KEY,
    user_id INT NOT NULL,
    status NVARCHAR(50) NOT NULL,
    total_price DECIMAL(10, 2) NOT NULL,
    created_at DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

CREATE TABLE OrderDetails (
    detail_id INT IDENTITY PRIMARY KEY,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    FOREIGN KEY (order_id) REFERENCES Orders(order_id),
    FOREIGN KEY (product_id) REFERENCES Products(product_id)
);