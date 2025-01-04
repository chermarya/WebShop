const { DataTypes } = require('sequelize');
const User = require("../models/User");
const { sequelize } = require('../config/database');

const Order = sequelize.define('Order', {
    order_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'user_id',
        }
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'В обробці',
    },
    total_price: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        defaultValue: 0.0,
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: new Date(),
    }
}, {
    tableName: 'Orders',
    timestamps: false,
});

module.exports = Order;
