const model = require("../config/models/index");
const { Op } = require("sequelize");
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

controller.getOne = async function (req, res) {
    try {
        const { productId } = req.params;

        try {
            const product = await model.Product.findByPk(productId);

            if (!product) {
                return res
                    .status(404)
                    .json({ success: false, message: "Product not found" });
            }

            res.json({ success: true, data: product });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                success: false,
                message: "Internal server error",
            });
        }
    } catch (e) {
        res.status(400).json({
            message: "users not found",
            data: e,
        });
    }
};

controller.getProductByUserId = async function (req, res) {
    try {
        const { userId } = req.params;

        try {
            const product = await model.Product.findAll({
                where: {
                    RenterUserId: userId,
                },
            });

            if (!product) {
                return res
                    .status(404)
                    .json({ success: false, message: "Product not found" });
            }

            res.json({ success: true, data: product });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                success: false,
                message: "Internal server error",
            });
        }
    } catch (error) {
        res.status(400).json({
            message: "users not found",
            data: e,
        });
    }
};

controller.search = async function (req, res) {
    try {
        const search = req.query.keyword;
        const products = await model.Product.findAll({
            where: {
                [Op.or]: [
                    { ProductName: { [Op.like]: `%${search}%` } },
                    { Description: { [Op.like]: `%${search}%` } },
                ],
            },
        });
        if (products.length > 0) {
            res.status(200).json({
                message: "Search product",
                data: products,
            });
        } else {
            res.status(200).json({
                message: "product not found",
                data: products,
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};

controller.updateProduct = async (req, res) => {
    try {
        const { productId } = req.params;
        const { productName, description, price, stockQuantity } = req.body;

        const product = await model.Product.findByPk(productId);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }

        product.ProductName =
            productName !== undefined ? productName : product.ProductName;
        product.Description =
            description !== undefined ? description : product.Description;
        product.Price = price !== undefined ? price : product.Price;
        product.StockQuantity =
            stockQuantity !== undefined ? stockQuantity : product.StockQuantity;

        await product.save();

        res.json({
            success: true,
            message: "Product updated successfully",
            data: product,
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

controller.post = async function (req, res) {
    try {
        const { productName, description, price, stockQuantity, RenterUserId } =
            req.body;
        var imageUrl = "";

        if (req.file && req.file.cloudStoragePublicUrl) {
            imageUrl = req.file.cloudStoragePublicUrl;
        }
        const renter = await model.User.findByPk(RenterUserId);
        if (!renter) {
            return res
                .status(400)
                .json({ success: false, message: "Renter not found" });
        }

        const product = await model.Product.create({
            ProductName: productName,
            Description: description,
            Price: price,
            StockQuantity: stockQuantity,
            RenterUserId: RenterUserId,
            ProductImageURL: imageUrl,
        });

        res.json({
            success: true,
            message: "Product created successfully",
            data: product,
        });
    } catch (e) {
        res.status(404).json({
            data: e.message,
        });
    }
};

controller.delete = async function (req, res) {
    try {
        const { productId } = req.params;
        const product = await model.Product.findByPk(productId);
        if (!product) {
            return res
                .status(404)
                .json({ success: false, message: "Product not found" });
        }

        await model.OrderItem.destroy({ where: { ProductId: productId } });
        await model.Favorite.destroy({ where: { ProductId: productId } });
        await product.destroy();

        res.json({ success: true, message: "Product deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};

module.exports = controller;
