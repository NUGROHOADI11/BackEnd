const model = require("../config/models/index");


const controller = {};

controller.getAllProduct = async function (req, res) {
    try {
        const products = await model.Product.findAll();

        res.json({ success: true, data: products });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};

module.exports = controller;
