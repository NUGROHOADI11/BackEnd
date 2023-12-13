const Sequelize = require("sequelize");
const db = require("../database/db");

const User = db.define(
  "users",
  {
    username: {
      type: Sequelize.STRING,
      unique: true,
    },
    email: {
      type: Sequelize.STRING,
      unique: true,
      validate: {
        isEmail: {
          msg: "Invalid email address",
        },
      },
    },
    password: Sequelize.STRING,
    FullName: Sequelize.STRING,
    Address: Sequelize.STRING,
    Phone: Sequelize.STRING,
    ProfilePhotoURL: Sequelize.STRING,
    Token: Sequelize.TEXT,
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

module.exports = User;
