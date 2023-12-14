const model = require("../config/models/index");
const controller = {};

// Get all orders
controller.getAllOrders = async (req, res) => {
    try {
        const orders = await model.Order.findAll({
            include: [
                {
                    model: model.User,
                    as: "Customer",
                },
                {
                    model: model.User,
                    as: "Renter",
                },
                {
                    model: model.OrderItem,
                    as: "OrderItems",
                    include: [
                        {
                            model: model.Product,
                            as: "Product",
                        },
                    ],
                },
            ],
        });

        res.json({
            success: true,
            data: orders,
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

controller.getOrderById = async (req, res) => {
    try {
        const { orderId } = req.params;

        const order = await model.Order.findByPk(orderId, {
            include: [
                {
                    model: model.User,
                    as: "Customer",
                },
                {
                    model: model.User,
                    as: "Renter",
                },
                {
                    model: model.OrderItem,
                    as: "OrderItems",
                    include: [
                        {
                            model: model.Product,
                            as: "Product",
                        },
                    ],
                },
            ],
        });

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found",
            });
        }

        res.json({
            success: true,
            data: order,
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

controller.getOrdersByStatus = async (req, res) => {
    try {
        const { status } = req.params;

        const orders = await model.Order.findAll({
            where: {
                Status: status,
            },
        });

        res.json({
            success: true,
            data: orders,
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

controller.createOrder = async (req, res) => {
    try {
        const {
            orderDate,
            shippingAddress,
            phone,
            totalCost,
            status,
            customerId,
            renterId,
            orderItems,
        } = req.body;

        console.log(orderDate);
        console.log(req.body);
        const customer = await model.User.findByPk(customerId);
        const renter = await model.User.findByPk(renterId);

        if (!customer || !renter) {
            return res.status(400).json({
                success: false,
                message: "Customer or Renter not found",
            });
        }

        const order = await model.Order.create({
            OrderDate: orderDate,
            ShippingAddress: shippingAddress,
            Phone: phone,
            TotalCost: totalCost,
            Status: status,
            CustomerId: customerId,
            RenterId: renterId,
        });

        for (const orderItem of orderItems) {
            const { productId, quantity } = orderItem;

            const product = await model.Product.findByPk(productId);

            if (!product) {
                return res.status(400).json({
                    success: false,
                    message: "Product not found",
                });
            }

            // Create order item
            await model.OrderItem.create({
                Quantity: quantity,
                ProductId: productId,
                OrderId: order.id,
            });
        }

        res.status(201).json({
            success: true,
            message: "Order created successfully",
            data: order,
        });
    } catch (error) {
        console.error(error);

        // Handle Sequelize validation error
        if (error.name === "SequelizeValidationError") {
            return res.status(400).json({
                success: false,
                message: "Validation error",
                errors: error.errors.map((e) => e.message),
            });
        }

        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message,
        });
    }
};

controller.updateOrder = async (req, res) => {
    try {
        const { orderId } = req.params;
        const { status } = req.body;
        const order = await model.Order.findByPk(orderId);

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found",
            });
        }

        order.Status = status;
        await order.save();

        res.json({
            success: true,
            message: "Order updated successfully",
            data: order,
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

controller.deleteOrder = async (req, res) => {
    try {
        const { orderId } = req.params;

        const order = await model.Order.findByPk(orderId);

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found",
            });
        }

        await model.OrderItem.destroy({ where: { OrderId: orderId } });

        await order.destroy();

        res.json({
            success: true,
            message: "Order deleted successfully",
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

module.exports = controller;
