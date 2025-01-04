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

module.exports = router;
