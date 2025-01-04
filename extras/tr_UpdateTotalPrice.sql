CREATE TRIGGER tr_UpdateTotalPrice
ON OrderDetails
AFTER INSERT, UPDATE, DELETE
AS
BEGIN
    UPDATE Orders
    SET total_price = (
        SELECT COALESCE(SUM(od.quantity * p.price), 0)
        FROM OrderDetails od
        INNER JOIN Products p ON od.product_id = p.product_id
        WHERE od.order_id = i.order_id
    )
    FROM Inserted i
    WHERE Orders.order_id = i.order_id;

    UPDATE Orders
    SET total_price = (
        SELECT COALESCE(SUM(od.quantity * p.price), 0)
        FROM OrderDetails od
        INNER JOIN Products p ON od.product_id = p.product_id
        WHERE od.order_id = d.order_id
    )
    FROM Deleted d
    WHERE Orders.order_id = d.order_id;
END;