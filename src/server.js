const express = require("express");
const app = require("./app");
const http = require("http");

require("dotenv").config();

const port = process.env.PORT || 4000;

const server = http.createServer(app);
server.listen(port);
console.log(`server listening on port ${port}`);
