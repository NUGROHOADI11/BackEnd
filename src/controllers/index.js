const user = require("./user");
const product = require("./product");
const order = require("./order");
const favorite = require("./favorite");
const controller = {};

controller.order = order;
controller.user = user;
controller.product = product;
controller.favorite = favorite;
module.exports = controller;
