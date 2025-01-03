CREATE VIEW vw_OrderDetails AS
SELECT 
    o.order_id,
    u.name + ' ' + u.surname AS person,
    STRING_AGG(
        p.title + ' ' + CAST(p.price AS NVARCHAR) + ' * ' + CAST(od.quantity AS NVARCHAR), '|'
    ) AS product_id,
    o.total_price,
    o.status
FROM Orders o
JOIN Users u ON u.user_id = o.user_id
JOIN OrderDetails od ON o.order_id = od.order_id
JOIN Products p ON od.product_id = p.product_id
GROUP BY
    o.order_id.
    u.name,
    u.surname,
    o.total_price,
    o.status