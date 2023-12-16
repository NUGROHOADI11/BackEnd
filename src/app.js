const debugAgent = require('@google-cloud/debug-agent');
debugAgent.start();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const userRoute = require("./routes/user");
const productRoute = require("./routes/product");
const orderRoute = require("./routes/order");
const favRoute = require("./routes/favorite");
const cors = require("cors");

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use("/user", userRoute);
app.use("/product", productRoute);
app.use("/order", orderRoute);
app.use("/favorite", favRoute);
app.get("/", (req, res) => {
    console.log("Response success")
    res.send("Response Success!")
})
app.use((req, res, next) => {
    const error = new Error("not found");
    error.status = 404;
    next(error);
});

app.use((error, req, res) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message,
        },
    });
});

module.exports = app;
