CREATE VIEW vw_OrderDetails AS
SELECT 
    o.order_id,
    o.user_id,
    o.status,
    o.total_price,
    od.product_id,
    p.name AS product_name,
    od.quantity,
    p.price AS unit_price,
    (od.quantity * p.price) AS total_product_price
FROM Orders o
INNER JOIN OrderDetails od ON o.order_id = od.order_id
INNER JOIN Products p ON od.product_id = p.product_id;
