const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const VWOrderDetails = sequelize.define('VWOrderDetails', {
    order_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    person: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    product_list: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    total_price: {
        type: DataTypes.DECIMAL,
        allowNull: false,
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    tableName: 'vw_OrderDetails',
    timestamps: false,
});

module.exports = VWOrderDetails;