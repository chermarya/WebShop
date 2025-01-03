const { DataTypes } = require('sequelize');
const Category = require("../models/Category");
const { sequelize } = require('../config/database');

const Product = sequelize.define('Product', {
    product_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    category_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Category,
            key: 'category_id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
    },
    price: {
        type: DataTypes.DECIMAL,
        allowNull: false,
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
}, {
    tableName: 'Products',
    timestamps: false,
});

module.exports = Product;