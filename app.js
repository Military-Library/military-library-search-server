const express = require("express");
const app = express();

const router_api = require("./router/api");
const router_init = require("./router/init");

app.use("/api", router_api);
app.use("/init", router_init);

app.listen(8080, (req, res) => {
    console.log("running...");
})