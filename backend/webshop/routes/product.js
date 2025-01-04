const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const Category = require("../models/Category");
const {sequelize} = require("../config/database");
const User = require("../models/User");

router.get("/getAllProducts", async (req, res) => {
    try {
        const [products] = await sequelize.query(`
            SELECT 
                p.product_id, 
                p.title AS product_title, 
                c.title AS category, 
                p.price, 
                p.quantity
            FROM Products p
            JOIN Categories c ON p.category_id = c.category_id
        `);

        const formattedProducts = products.map((product) => ({
            product_id: product.product_id,
            title: product.product_title,
            category: product.category,
            price: product.price,
            quantity: product.quantity,
        }));

        res.status(200).json({ products: formattedProducts });
    } catch (error) {
        console.error(`Error fetching products: ${error.message}`);
        res.status(500).json({ error: "An error occurred while fetching products" });
    }
})

router.get("/getAllProductsByCategory/:categoryid", async (req, res) => {
    try {
        const category_id = req.params.categoryid;

        const [products] = await sequelize.query(`
            SELECT 
                p.product_id, 
                p.title AS product_title, 
                c.title AS category, 
                p.price, 
                p.quantity
            FROM Products p
            JOIN Categories c ON p.category_id = c.category_id
            WHERE p.category_id = :category_id
        `, {
            replacements: { category_id },
        });

        const formattedProducts = products.map((product) => ({
            product_id: product.product_id,
            title: product.product_title,
            category: product.category,
            price: product.price,
            quantity: product.quantity,
        }));

        res.status(200).json({ products: formattedProducts });
    } catch (error) {
        console.error(`Error fetching products: ${error.message}`);
        res.status(500).json({ error: "An error occurred while fetching products" });
    }
})

router.get("/getProductById/:productid", async (req, res) => {
    try {
        const product_id = req.params.productid;

        const [results] = await sequelize.query(`
            SELECT 
                p.product_id, 
                p.title AS product_title, 
                c.title AS category, 
                p.price, 
                p.quantity
            FROM Products p
            JOIN Categories c ON p.category_id = c.category_id
            WHERE p.product_id = :product_id
        `, {
            replacements: { product_id },
        });

        if (results.length === 0) {
            return res.status(404).json({ error: "Product not found" });
        }

        const product = results[0];
        const formattedProduct = {
            product_id: product.product_id,
            title: product.product_title,
            category: product.category,
            price: product.price,
            quantity: product.quantity,
        };

        res.status(200).json(formattedProduct);
    } catch (error) {
        console.error(`Error fetching product: ${error.message}`);
        res.status(500).json({ error: "An error occurred while fetching the product" });
    }
})

router.post("/addProduct", async (req, res) => {
    try {
        const { title, category_id, price, quantity } = req.body;

        if (!title || !category_id || !price || !quantity) {
            return res.status(400).json({ error: "All fields are required" });
        }

        if (price <= 0 || quantity <= 0) {
            return res.status(400).json({ error: "Price and quantity must be greater than 0" });
        }

        const category = await Category.findByPk(category_id);
        if (!category) {
            return res.status(404).json({ error: "Category not found" });
        }

        const newProduct = await Product.create({
            title: title,
            category_id: category_id,
            price: price,
            quantity: quantity,
        });

        res.status(201).json({ message: "Product created successfully", product: newProduct });
    } catch (error) {
        console.error(`Error adding product: ${error.message}`);
        res.status(500).json({ error: "An error occurred while adding the product" });
    }
});

router.put("/updateProduct/:productid", async (req, res) => {
    try {
        const product_id = req.params.productid;
        const { title, category_id, price, quantity } = req.body;

        if (!title || !category_id || !price || !quantity) {
            return res.status(400).json({ error: "All fields are required" });
        }

        if (price <= 0 || quantity <= 0) {
            return res.status(400).json({ error: "Price and quantity must be greater than 0" });
        }

        const category = await Category.findByPk(category_id);
        if (!category) {
            return res.status(404).json({ error: "Category not found" });
        }

        const product = await Product.findByPk(product_id);
        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }

        await product.update({
            title: title || product.title,
            category_id: category_id || product.category_id,
            price: price || product.price,
            quantity: quantity || product.quantity,
        });

        res.status(200).json({ message: "Product updated successfully", product:product });
    } catch (error) {
        console.log(`Error: ${error}`);
    }
})

router.delete("/delProductById/:productid", async (req, res) => {
    try {
        const product_id = req.params.productid;
        const product = await Product.findByPk(product_id);
        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }

        await product.destroy();

        res.status(200).json({ message: `Product with ID ${product_id} deleted successfully` });
    } catch (error) {
        console.log(`Error: ${error}`);
    }
})

module.exports = router;