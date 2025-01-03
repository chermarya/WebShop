const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const {sequelize} = require("../config/database");

router.get("/getAllProducts", async (req, res) => {
    try {
        const products = await Product.findAll()
        res.json(products)
    } catch (error) {
        console.log(`Error: ${error}`);
    }
})

router.get("/getProductById/:productid", async (req, res) => {
    try {
        const product_id = req.params.productid;
        const product = await Product.findOne({where:{product_id:product_id}})

        if (!product) {
            return res.status(404).json({error: "Product not found"});
        }
        res.json(product)
    } catch (error) {
        console.log(`Error: ${error}`);
    }
})

module.exports = router;