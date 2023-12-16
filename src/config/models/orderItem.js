const { DataTypes } = require("sequelize");
const db = require("../database/db");
const Product = require("./product");

const OrderItem = db.define(
    "orderitems",
    {
        Quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        ProductId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Product,
                key: "Id",
            },
        },
    },
    {
        freezeTableName: true,
        timestamps: false,
    }
);

OrderItem.belongsTo(Product, { foreignKey: "ProductId", as: "Product" });

module.exports = OrderItem;
