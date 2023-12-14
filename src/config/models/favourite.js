const Sequelize = require("sequelize");
const User = require("./user");
const Product = require("./product");
const db = require("../database/db");

const Favorite = db.define(
    "favorites",
    {
        UserId: {
            type: Sequelize.INTEGER,
        },
        ProductId: {
            type: Sequelize.INTEGER,
        },
    },
    {
        freezeTableName: true,
        timestamps: false,
    }
);

Favorite.belongsTo(User, { foreignKey: "UserId" });
Favorite.belongsTo(Product, { foreignKey: "ProductId" });

module.exports = Favorite;
