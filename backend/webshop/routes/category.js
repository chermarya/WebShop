const express = require("express");
const router = express.Router();
const Category = require("../models/Category");
const {sequelize} = require("../config/database");

router.get("/getAllCategories", async (req, res) => {
    try {
        const categories = await Category.findAll()
        res.json(categories)
    } catch (error) {
        console.log(`Error: ${error}`);
    }
})

router.get("/getCategoryById/:categoryid", async (req, res) => {
    try {
        const category_id = req.params.categoryid;
        const category = await Category.findOne({where:{category_id:category_id}})

        if (!category) {
            return res.status(404).json({error: "User not found"});
        }
        res.json(category)
    } catch (error) {
        console.log(`Error: ${error}`);
    }
})

module.exports = router;