const express = require("express");
const router = express.Router();
const { sequelize } = require("../config/database");
const Order = require("../models/Order");

router.get("/getAllRawOrders", async (req, res) => {
    try {
        const orders = await Order.findAll()
        res.json(orders)
    } catch (error) {
        console.log(`Error: ${error}`);
    }
});

router.post('/createOrder', async (req, res) => {
    try {
        const { user_id } = req.body;

        if (!user_id) {
            return res.status(400).json({ error: "User is required" });
        }

        await sequelize.query(`EXEC pr_CreateOrder @user_id = :user_id`, {
            replacements: { user_id },
        });

        res.status(201).json({ message: "Order created successfully" });
    } catch (error) {
        console.error(`Error creating order: ${error.message}`);
        res.status(500).json({ error: "An error occurred while creating the order" });
    }
});

router.put('/updateOrderStatus', async (req, res) => {
    try {
        const { order_id, new_status } = req.body;

        if (!order_id || !new_status) {
            return res.status(400).json({ error: "Order ID and new status are required" });
        }

        await sequelize.query(`EXEC pr_UpdateOrderStatus @order_id = :order_id, @new_status = :new_status`, {
            replacements: { order_id, new_status },
        });

        res.status(200).json({ message: "Order status updated successfully" });
    } catch (error) {
        console.error(`Error updating order status: ${error.message}`);
        res.status(500).json({ error: "An error occurred while updating the order status" });
    }
});

router.post("/addProductsToOrder", async (req, res) => {
    const transaction = await sequelize.transaction();
    try {
        const [orderData, ...products] = req.body;
        const { order_id } = orderData;

        const order = await Order.findByPk(order_id);
        if (!order) {
            return res.status(404).json({ error: "Order not found" });
        }

        for (const product of products) {
            const { product_id, quantity } = product;

            await sequelize.query(
                `
                INSERT INTO OrderDetails (order_id, product_id, quantity)
                VALUES (:order_id, :product_id, :quantity)
                `,
                {
                    replacements: { order_id, product_id, quantity },
                    transaction,
                }
            );
        }

        await transaction.commit();

        res.status(200).json({ message: "Products added to order successfully" });
    } catch (error) {
        await transaction.rollback();

        if (error.original && error.original.message.includes("Недостатньо товарів на складі")) {
            res.status(400).json({ error: "Not enough products in stock" });
        } else {
            console.error(`Error adding products to order: ${error.message}`);
            res.status(500).json({ error: "An error occurred while adding products to the order" });
        }
    }
});

router.delete("/delOrder/:orderid", async (req, res) => {
    const transaction = await sequelize.transaction();
    try {
        const order_id = req.params.orderid;

        const order = await sequelize.query(
            `SELECT * FROM Orders WHERE order_id = :order_id`,
            { replacements: { order_id }, type: sequelize.QueryTypes.SELECT }
        );

        if (!order.length) {
            return res.status(404).json({ error: "Order not found" });
        }

        await sequelize.query(`DELETE FROM Orders WHERE order_id = :order_id`, {
            replacements: { order_id },
            transaction,
        });

        await transaction.commit();
        res.status(200).json({ message: "Order deleted successfully" });
    } catch (error) {
        await transaction.rollback();
        console.error(`Error deleting order: ${error.message}`);
        res.status(500).json({ error: "An error occurred while deleting the order" });
    }
});

module.exports = router;


module.exports = router;
