const Sequelize = require("sequelize");
const db = require("../database/db");
const User = require("./user");

const Product = db.define(
    "products",
    {
        ProductName: Sequelize.STRING,
        Description: Sequelize.TEXT,
        Price: Sequelize.DECIMAL(10, 2),
        StockQuantity: Sequelize.INTEGER,
        RenterUserId: {
            type: Sequelize.INTEGER,
            references: {
                model: User,
                key: "Id",
            },
        },
        ProductImageURL: Sequelize.STRING,
    },
    {
        freezeTableName: true,
        timestamps: false,
    }
);

Product.belongsTo(User, { foreignKey: "RenterUserId" });

module.exports = Product;
