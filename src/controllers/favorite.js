const model = require("../config/models/index");

const controller = {};

controller.addToFavorites = async (req, res) => {
    try {
        const { userId, productId } = req.body;
        const favorite = await model.Favorite.create({
            UserId: userId,
            ProductId: productId,
        });

        res.json({
            success: true,
            message: "Favorite created successfully",
            data: favorite,
        });
    } catch (error) {
        console.error(error);
        throw error;
    }
};

controller.getFavoritesByUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const favorites = await model.Favorite.findAll({
            where: {
                UserId: userId,
            },
        });

        res.json({
            success: true,
            data: favorites,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message,
        });
    }
};

controller.deleteFav = async (req, res) => {
    try {
        const { favId } = req.params;
        const favourite = await model.Favorite.findByPk(favId);
        if (!favourite) {
            return res
                .status(404)
                .json({ success: false, message: "Favorite not found" });
        }
        await favourite.destroy();
        res.json({ success: true, message: "Favorite deleted successfully" });
    } catch (e) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};

module.exports = controller;
