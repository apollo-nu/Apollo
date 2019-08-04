const express = require("express");
const app = express();

const url = require("url");
const proxy = require("http-proxy");
const apiProxy = proxy.createProxyServer();

app.use("/api", (req, res) => {
    req.url = req.originalUrl;
    apiProxy.web(req, res, {
        target: {
            host: "https://apollo-nu-server.herokuapp.com"
        }
    })
});

app.use("/", (req, res) => {
    req.url = req.originalUrl;
    apiProxy.web(req, res, {
        target: {
            host: "https://apollo-nu.herokuapp.com"
        }
    })
});

app.listen(process.env.PORT || 9000);