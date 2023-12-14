const User = require("./user");
const Product = require("./product");
const Order = require("./order");
const OrderItem = require("./orderItem");
const Favorite = require("./favourite");
const model = {};

model.Order = Order;
model.OrderItem = OrderItem;
model.User = User;
model.Product = Product;
model.Favorite = Favorite;
module.exports = model;
