const express = require("express");
const app = express();

const url = require("url");
const proxy = require("express-http-proxy");

app.use((_req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE");
    res.header("Access-Control-Allow-Credentials", true);
    next();
})


const apiProxy = proxy("https://apollo-nu-server.herokuapp.com/", {
    proxyReqPathResolver: req => url.parse(req.originalUrl).path
});

const clientProxy = proxy("https://apollo-nu.herokuapp.com/", {
    proxyReqPathResolver: req => url.parse(req.originalUrl).path
});

app.use("/api/", apiProxy);
app.use("/", clientProxy);

app.listen(process.env.PORT || 9000);