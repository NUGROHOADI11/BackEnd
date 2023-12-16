const { DataTypes: Sequelize } = require("sequelize");
const db = require("../database/db");
const User = require("./user");
const OrderItem = require("./orderItem");

const Order = db.define(
    "orders",
    {
        OrderDate: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW,
            allowNull: false,
        },
        ShippingAddress: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        Phone: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        TotalCost: {
            type: Sequelize.DECIMAL(10, 2),
            allowNull: false,
        },
        Status: {
            type: Sequelize.ENUM("unpaid", "processed", "shipped"),
            defaultValue: "unpaid",
        },
        CustomerId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: User,
                key: "Id",
            },
        },
        RenterId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: User,
                key: "Id",
            },
        },
    },
    {
        freezeTableName: true,
        timestamps: false,
    }
);

Order.belongsTo(User, { foreignKey: "CustomerId", as: "Customer" });
Order.belongsTo(User, { foreignKey: "RenterId", as: "Renter" });
Order.hasMany(OrderItem, { foreignKey: "OrderId", as: "OrderItems" });

module.exports = Order;
