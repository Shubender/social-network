const express = require("express");
const app = express();
const helmet = require("helmet");
const multer = require("multer");
const uidSafe = require("uid-safe");
const { hashPass, compare } = require("./encrypt");
const compression = require("compression");
const path = require("path");
const { PORT = 3001 } = process.env;

const { addUserData } = require("./db.js");

// let showWarning = false;

const diskStorage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, path.join(__dirname, "..", "uploads"));
    },
    filename: function (req, file, callback) {
        uidSafe(24).then(function (uid) {
            callback(null, uid + path.extname(file.originalname));
        });
    },
});

const uploader = multer({
    storage: diskStorage,
    limits: {
        fileSize: 2097152, //2 mb
    },
});

app.use(compression());
// use the cookie-session middleware. Look in petition project
const cookieSession = require("cookie-session");

app.use(
    cookieSession({
        secret: process.env.SESSION_SECRET,
        maxAge: 1000 * 60 * 60 * 24 * 14,
    })
);

// use json middleware for POST requests
app.use(express.json());

app.use(express.static(path.join(__dirname, "..", "client", "public")));

app.use(helmet());

app.get("/user/id.json", (req, res) => {
    res.json({ userId: null }); // instead of null. use value from req.session
});

app.get("*", function (req, res) {
    console.log("got requested url: ", req.url);
    res.sendFile(path.join(__dirname, "..", "client", "index.html"));
});

app.post("/registration", (req, res) => {
    const { firstname, lastname, email, password } = req.body;
    if (
        firstname === "" ||
        lastname === "" ||
        email === "" ||
        password === ""
    ) {
        // showWarning = true;
        res.redirect("/registration/");
        return;
    }

    hashPass(password).then((hash) => {
        // console.log("hashed data: ", hash);
        addUserData(firstname, lastname, email, hash)
            .then((data) => {
                req.session.userId = data.rows[0].id;
                // console.log("req.session.userId: ", req.session.userId);
                res.json({ success: true });
                // res.redirect("/");
            })
            .catch((err) => {
                console.log("Register error: ", err);
                res.json({ success: false });
            });
    });
});

app.listen(PORT, function () {
    console.log(`Express server listening on port ${PORT}`);
});
