const express = require("express");
const app = express();

const url = require("url");
const proxy = require("express-http-proxy");

const apiProxy = proxy("https://apollo-nu-server.herokuapp.com", {
    proxyReqPathResolver: req => url.parse(req.originalUrl).path.slice(4) // Removes /api at head of path
});

const clientProxy = proxy("https://apollo-nu-client.herokuapp.com", {
    proxyReqPathResolver: req => url.parse(req.originalUrl).path
});

app.use("/api/*", apiProxy);
app.use("/*", clientProxy);

app.listen(process.env.PORT || 9000);