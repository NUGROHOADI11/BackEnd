const Sequelize = require("sequelize");

const db = new Sequelize("necosu", "root", "Ha4v;Rmyra~>?+=c", {
  dialect: "mysql",
  host: "34.101.249.57",
});

module.exports = db;
