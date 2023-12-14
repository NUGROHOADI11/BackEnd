const Sequelize = require("sequelize");
const db = require("../database/db");
const User = require("./user");

const Order = db.define(
    "orders",
    {
        OrderDate: Sequelize.DATE,
        ShippingAddress: Sequelize.STRING,
        Phone: Sequelize.STRING,
        TotalCost: Sequelize.DECIMAL(10, 2),
        CustomerId: {
            type: Sequelize.INTEGER,
            refereces: {
                model: User,
                key: "Id",
            },
        },
        RenterId: {
            type: Sequelize.INTEGER,
            refereces: {
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

Order.belongsTo(User, { foreignKey: "CustomerId, RenterId"});

module.exports = Order;