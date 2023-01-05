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
let fName;
let lName;
let showWarning = false;

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
    fName = req.body.fname;
    lName = req.body.lname;
    let regEmail = req.body.email;
    let regPass = req.body.password;

    if (fName === "" || lName === "" || regEmail === "" || regPass === "") {
        // console.log('user data: ', fName, lName, regEmail, regPass);
        showWarning = true;
        res.redirect("/registration/");
        return;
    }

    hashPass(regPass).then((hash) => {
        // console.log("hashed data: ", hash);
        addUserData(fName, lName, regEmail, hash)
            .then((data) => {
                req.session.userId = data.rows[0].id;
                res.redirect("/profile/");
            })
            .catch((err) => console.log("Register error: ", err));
    });
});

app.listen(PORT, function () {
    console.log(`Express server listening on port ${PORT}`);
});
