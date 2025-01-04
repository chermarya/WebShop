CREATE PROCEDURE pr_UpdateOrderStatus
    @order_id INT,
    @new_status NVARCHAR(50)
AS
BEGIN
    UPDATE Orders
    SET status = @new_status
    WHERE order_id = @order_id;
END;