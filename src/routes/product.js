const express = require("express");
const router = express.Router();
// const db = require("../config/database/db");
const controller = require("../controllers/index");
// const authMiddleware = require("../middleware/auth");

router.get("/", controller.product.getAllProduct);

module.exports = router;