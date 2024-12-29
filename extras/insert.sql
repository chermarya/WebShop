INSERT INTO Users (name, surname, email) VALUES 
('Іван', 'Іванов', 'ivan.ivanov@example.com'),
('Марія', 'Петренко', 'maria.petrenko@example.com'),
('Олексій', 'Сидоров', 'oleksiy.sydorov@example.com'),
('Анна', 'Коваленко', 'anna.kovalenko@example.com');

INSERT INTO Categories (title) VALUES 
('Смартфони'),
('Ноутбуки'),
('Телевізори'),
('Аудіотехніка');

INSERT INTO Products (title, category_id, price, quantity) VALUES 
('iPhone 14 Pro', 1, 43000.00, 20),
('Samsung Galaxy S23', 1, 37000.00, 15),
('MacBook Pro 16', 2, 99900.00, 10),
('Dell XPS 13', 2, 56000.00, 8),
('LG OLED TV 55"', 3, 73000.00, 5),
('Sony WH-1000XM5', 4, 13890.00, 25),
('JBL Flip 6', 4, 4600.00, 30);

----------------------------------------------------------------

INSERT INTO Orders (user_id, status, total_price, created_at) VALUES 
(1, 'Доставлено', 70780.00, '2024-12-20 14:30:00'),
(2, 'В обробці', 56000.00, '2024-12-21 10:00:00'),
(3, 'Очікує оплату', 73000.00, '2024-12-22 18:45:00');

INSERT INTO OrderDetails (order_id, product_id, quantity) VALUES 
(1, 1, 1), -- iPhone 14 Pro в замовленні 1
(1, 6, 2), -- Sony WH-1000XM5 в замовленні 1
(2, 4, 1), -- Dell XPS 13 в замовленні 2
(3, 5, 1); -- LG OLED TV 55" в замовленні 3
