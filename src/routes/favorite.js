const express = require("express");
const router = express.Router();
const db = require("../config/database/db");
const controller = require("../controllers/index");
const authMiddleware = require("../middleware/auth");


router.get("/:userId",authMiddleware, controller.favorite.getFavoritesByUser);
router.post("/",authMiddleware, controller.favorite.addToFavorites);
router.delete("/:favId", authMiddleware, controller.favorite.deleteFav);
module.exports = router;
