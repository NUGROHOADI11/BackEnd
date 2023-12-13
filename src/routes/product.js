const express = require("express");
const router = express.Router();
const db = require("../config/database/db");
const controller = require("../controllers/index");
const authMiddleware = require("../middleware/auth");
const Multer = require("multer");
const imgUpload = require("../middleware/upload_gcp");

const multer = Multer({
    storage: Multer.MemoryStorage,
    fileSize: 5 * 1024 * 1024,
});

router.get("/", controller.product.getAllProduct);
router.get("/search",authMiddleware, controller.product.search);
router.get("/:productId", authMiddleware, controller.product.getOne);
router.get("/user/:userId",authMiddleware, controller.product.getProductByUserId);
router.post(
    "/",
    authMiddleware,
    multer.single("uploadimage"),
    imgUpload.uploadToGcs,
    controller.product.post
);
router.patch("/:productId",authMiddleware, controller.product.updateProduct);
router.delete("/:productId", authMiddleware, controller.product.delete);

module.exports = router;
