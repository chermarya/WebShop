const express = require("express");
const router = express.Router();
const OrderDetail = require("../models/OrderDetail");
const {sequelize} = require("../config/database");

router.get("/getAllRawOrderDetails", async (req, res) => {
    try {
        const orderDetails = await OrderDetail.findAll()
        res.json(orderDetails)
    } catch (error) {
        console.log(`Error: ${error}`);
    }
});

router.delete("/delProductFromOrder", async (req, res) => {
    const transaction = await sequelize.transaction();
    try {
        const { order_id, product_id } = req.body;

        if (!order_id || !product_id) {
            return res.status(400).json({ error: "Order ID and Product ID are required" });
        }

        const [orderDetail] = await sequelize.query(
            `SELECT detail_id 
             FROM OrderDetails 
             WHERE order_id = :order_id AND product_id = :product_id`,
            {
                replacements: { order_id, product_id },
                type: sequelize.QueryTypes.SELECT,
            }
        );

        if (!orderDetail) {
            return res.status(404).json({ error: "Product not found in the order" });
        }

        await OrderDetail.destroy({
            where: { detail_id: orderDetail.detail_id },
            transaction,
        });

        await transaction.commit();
        res.status(200).json({ message: "Product removed from order successfully" });
    } catch (error) {
        await transaction.rollback();
        console.error(`Error removing product from order: ${error.message}`);
        res.status(500).json({ error: "An error occurred while removing the product from the order" });
    }
});


module.exports = router;
