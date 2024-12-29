CREATE TRIGGER tr_CheckProductAvailability
ON OrderDetails
INSTEAD OF INSERT
AS
BEGIN
    IF EXISTS (
        SELECT 1
        FROM Inserted i
        INNER JOIN Products p ON i.product_id = p.product_id
        WHERE i.quantity >= p.quantity
    )
    BEGIN
        RAISERROR ('Недостатньо товарів на складі.', 16, 1);
        RETURN;
    END

    INSERT INTO OrderDetails (order_id, product_id, quantity)
    SELECT order_id, product_id, quantity FROM Inserted;
END;
