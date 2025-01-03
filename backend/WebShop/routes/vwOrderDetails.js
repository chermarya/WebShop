const express = require("express");
const router = express.Router();
const { sequelize } = require("../config/database");

router.get("/getAllvwOrders", async (req, res) => {
    try {
        const [orders] = await sequelize.query(`SELECT * FROM vw_OrderDetails`);
        res.json(orders);
    } catch (error) {
        console.error(`Error fetching orders: ${error.message}`);
        res.status(500).json({ error: "An error occurred while fetching orders." });
    }
});

module.exports = router;
