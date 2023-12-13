const express = require("express");
const router = express.Router();
const db = require("../config/database/db");
const controller = require("../controllers/index");
const authMiddleware = require("../middleware/auth");

router.patch("/:productId", controller.product.updateProduct);
router.get("/", controller.product.getAllProduct);
router.get("/search", controller.product.search);
router.get("/:productId", authMiddleware, controller.product.getOne);
router.post("/", authMiddleware, controller.product.post);
router.delete("/:productId", authMiddleware, controller.product.delete);

module.exports = router;
