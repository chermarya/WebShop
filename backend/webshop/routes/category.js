const express = require("express");
const router = express.Router();
const Category = require("../models/Category");
const {sequelize} = require("../config/database");
const User = require("../models/User");

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

router.post("/addCategory", async (req, res) => {
    try {
        const { title } = req.body;

        if (!title) {
            return res.status(400).json({ error: "Field is required" });
        }

        const newCategory = await Category.create({
            title: title,
        });

        res.status(201).json({ message: "Category created successfully", category: newCategory });
    } catch (error) {
        console.log(`Error: ${error}`);
    }
})

router.put("/updateCategory/:categoryid", async (req, res) => {
    try {
        const category_id = req.params.categoryid;
        const { title } = req.body;

        if (!title) {
            return res.status(400).json({ error: "Field must be provided to update" });
        }

        const category = await Category.findByPk(category_id);
        if (!category) {
            return res.status(404).json({ error: "Category not found" });
        }

        await category.update({
            title: title || category.title,
        });

        res.status(200).json({ message: "Category updated successfully", category:category });
    } catch (error) {
        console.log(`Error: ${error}`);
    }
})

router.delete("/delCategoryById/:categoryid", async (req, res) => {
    try {
        const category_id = req.params.categoryid;
        const category = await Category.findByPk(category_id);
        if (!category) {
            return res.status(404).json({ error: "User not found" });
        }

        await category.destroy();

        res.status(200).json({ message: `User with ID ${category_id} deleted successfully` });
    } catch (error) {
        console.log(`Error: ${error}`);
    }
})

module.exports = router;