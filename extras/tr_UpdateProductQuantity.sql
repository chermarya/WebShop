CREATE TRIGGER tr_UpdateProductQuantity
ON OrderDetails
AFTER INSERT
AS
BEGIN
    UPDATE Products
    SET quantity = p.quantity - i.quantity
    FROM Products p
    INNER JOIN Inserted i ON p.product_id = i.product_id;
END;
