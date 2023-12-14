const express = require("express");
const router = express.Router();
const db = require("../config/database/db");
const controller = require("../controllers/index");
const authMiddleware = require("../middleware/auth");


router.get("/status/:status",authMiddleware, controller.order.getOrdersByStatus);
router.get("/:orderId",authMiddleware, controller.order.getOrderById);
router.get("/", controller.order.getAllOrders);
router.post("/",authMiddleware, controller.order.createOrder);
router.patch("/:orderId",authMiddleware, controller.order.updateOrder);
router.delete("/:orderId",authMiddleware, controller.order.deleteOrder);

module.exports = router;
