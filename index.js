const express = require("express");
const app = express();

const proxy = require("http-proxy-middleware");

app.use("/api", proxy({
    target: "http://apollo-nu-server.herokuapp.com",
    changeOrigin: true
}));

app.use("/", proxy({
    target: "http://apollo-nu.herokuapp.com",
    changeOrigin: true
}));

app.listen(process.env.PORT || 9000);