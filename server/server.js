const express = require("express");
const app = express();
const compression = require("compression");
const path = require("path");
const { PORT = 3001 } = process.env;

app.use(compression());
// use the cookie-session middleware. Look in petition project
// use json middleware for POST requests

app.use(express.static(path.join(__dirname, "..", "client", "public")));

app.get("/user/id.json", (req, res) => {
    res.json({ userId: null }); // instead of null. use value from req.session
});

app.get("*", function (req, res) {
    console.log("got requested url: ", req.url);
    res.sendFile(path.join(__dirname, "..", "client", "index.html"));
});

app.listen(PORT, function () {
    console.log(`Express server listening on port ${PORT}`);
});
