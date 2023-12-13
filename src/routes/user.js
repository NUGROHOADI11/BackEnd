const express = require("express");
const router = express.Router();
const db = require("../config/database/db");
const controller = require("../controllers/index");
const authMiddleware = require("../middleware/auth");

// router.use(authMiddleware);
router.get("/:userId", authMiddleware, controller.user.getOne);
router.get("/", controller.user.getAll);
router.post("/register", controller.user.register);
router.post("/login", controller.user.login);
router.post("/:userId/logout", authMiddleware, controller.user.logout);
router.patch("/:userId", authMiddleware, controller.user.editDataUser);
router.delete("/:userId",authMiddleware, controller.user.delete);

module.exports = router;
