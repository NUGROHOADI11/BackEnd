const Sequelize = require("sequelize");

const db = new Sequelize("necosu", "root", "", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = db;
