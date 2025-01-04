const { DataTypes } = require('sequelize');
const Order = require("../models/Order");
const Product = require("../models/Product");
const { sequelize } = require('../config/database');

const OrderDetail = sequelize.define('OrderDetails', {
    detail_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    order_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Order,
            key: 'order_id',
        }
    },
    product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Product,
            key: 'product_id',
        }
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
}, {
    tableName: 'OrderDetails',
    timestamps: false,
});

module.exports = OrderDetail;
