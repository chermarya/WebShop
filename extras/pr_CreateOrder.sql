CREATE PROCEDURE pr_CreateOrder
    @user_id INT,
    @status NVARCHAR(50) = 'В обробці'
AS
BEGIN
    INSERT INTO Orders (user_id, status, total_price)
    VALUES (@user_id, @status, 0);
END;