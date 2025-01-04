const express = require("express");
const router = express.Router();
const { sequelize } = require("../config/database");

router.get("/getAllvwOrders", async (req, res) => {
    try {
        const [orders] = await sequelize.query(`SELECT * FROM vw_OrderDetails`);

        if (!orders || orders.length === 0) {
            return res.status(404).json({ error: "No orders found" });
        }

        res.json(orders);
    } catch (error) {
        console.error(`Error fetching orders: ${error.message}`);
        res.status(500).json({ error: "An error occurred while fetching orders." });
    }
});

router.get("/getvwOrdersById/:orderid", async (req, res) => {
    try {
        const order_id = req.params.orderid;
        const [orders] = await sequelize.query(
            `SELECT * FROM vw_OrderDetails WHERE order_id = :order_id`, {
            replacements: { order_id },
        });

        if (!orders || orders.length === 0) {
            return res.status(404).json({ error: "Current order not found" });
        }

        res.json(orders);
    } catch (error) {
        console.error(`Error fetching orders: ${error.message}`);
        res.status(500).json({ error: "An error occurred while fetching orders." });
    }
});

module.exports = router;
