const express = require("express");
const app = express();
// const helmet = require("helmet");
const { uploader, fileUpload } = require("./file-upload");
const { hashPass, compare } = require("./encrypt");
const compression = require("compression");
const path = require("path");
const cryptoRandomString = require("crypto-random-string");
const { PORT = 3001 } = process.env;

const {
    addUserData,
    getUserByEmail,
    getUserById,
    addCode,
    getCode,
    changeUserPassword,
    addImg,
    addBio,
    getNewUsers,
    getUsersBySearch,
    findFriendship,
    sendFriendship,
    deleteFriendship,
    acceptFriendship,
    findAllFriendships,
} = require("./db.js");

// const { emailRes } = require("./ses");

let dbHash;

app.use(compression());
// use the cookie-session middleware. Look in petition project
const cookieSession = require("cookie-session");

app.use(
    cookieSession({
        secret: process.env.SESSION_SECRET,
        maxAge: 1000 * 60 * 60 * 24 * 14,
    })
);

// app.use((req, res, next) => {
//     console.log("---------------------");
//     console.log("req.url:", req.url);
//     console.log("req.method:", req.method);
//     console.log("req.session:", req.session);
//     console.log("req.body:", req.body);
//     console.log("---------------------");
//     next();
// });

// use json middleware for POST requests
app.use(express.json());

app.use(express.static(path.join(__dirname, "..", "client", "public")));

// app.use(helmet());

app.get("/user/id.json", (req, res) => {
    res.json({ userId: req.session.userId });
});

app.get("/user", (req, res) => {
    // console.log("user ID: ", req.session.userId);
    getUserById(req.session.userId)
        .then((data) => {
            // console.log("userData: ", data.rows);
            res.json({ success: true, userData: data.rows });
        })
        .catch((err) => {
            console.log("Get user error: ", err);
            res.json({ success: false });
        });
});

app.get("/api/user/:id", (req, res) => {
    // console.log("Other user ID: ", req.params.id);
    getUserById(req.params.id)
        .then((data) => {
            // console.log("userData: ", data.rows);
            res.json({ success: true, userData: data.rows });
        })
        .catch((err) => {
            console.log("Get other user error: ", err);
            res.json({ success: false });
        });
});

app.get("/api/friendship/:id", (req, res) => {
    // console.log("Other user ID: ", req.params.id);
    findFriendship(req.session.userId, req.params.id)
        .then((data) => {
            // console.log("userData: ", data.rows);
            res.json({
                success: true,
                friendshipStatus: data.rows,
                userId: req.session.userId,
            });
        })
        .catch((err) => {
            console.log("friendship get error: ", err);
            res.json({ success: false });
        });
});

app.post("/friendship/:id", (req, res) => {
    sendFriendship(req.session.userId, req.params.id)
        .then((data) => {
            res.json(data.rows);
        })
        .catch((err) => {
            console.log("friendship post error: ", err);
        });
});

app.post("/friendship/cancel/:id", (req, res) => {
    deleteFriendship(req.session.userId, req.params.id)
        .then((data) => {
            res.json(data.rows);
        })
        .catch((err) => {
            console.log("friendship cancel post error: ", err);
        });
});

app.post("/friendship/accept/:id", (req, res) => {
    acceptFriendship(req.session.userId, req.params.id)
        .then((data) => {
            res.json(data.rows);
        })
        .catch((err) => {
            console.log("friendship accept post error: ", err);
        });
});

app.get("/newUsers", (req, res) => {
    getNewUsers()
        .then((data) => {
            // console.log("newUsers: ", data.rows);
            res.json({ success: true, newUsers: data.rows });
        })
        .catch((err) => {
            console.log("Get newUsers error: ", err);
            res.json({ success: false });
        });
});

app.get("/api/friends", (req, res) => {
    findAllFriendships(req.session.userId)
        .then((data) => {
            console.log("friends: ", data.rows);
            res.json({
                success: true,
                friends: data.rows,
                userId: req.session.userId,
            });
        })
        .catch((err) => {
            console.log("Get friends error: ", err);
            res.json({ success: false });
        });
});

app.get("/sing-out", (req, res) => {
    req.session.userId = false;
    console.log("server sing-out: ", req.session.userId);
    res.json({ success: true });
});

app.post("/searchUsers", (req, res) => {
    const searchUsers = req.body.search;
    // console.log("searchUsers: ", searchUsers);

    if (searchUsers !== "") {
        getUsersBySearch(searchUsers)
            .then((data) => {
                // console.log("getUsersBySearch: ", data.rows);
                res.json({ success: true, foundUsers: data.rows });
            })
            .catch((err) => {
                console.log("getUsersBySearch error: ", err);
                res.json({ success: false });
            });
    } else {
        res.json({ success: false, foundUsers: "" });
    }
});

app.post("/registration", (req, res) => {
    const { firstname, lastname, email, password } = req.body;
    if (
        firstname !== "" &&
        lastname !== "" &&
        email !== "" &&
        password !== ""
    ) {
        hashPass(password).then((hash) => {
            // console.log("hashed data: ", hash);
            addUserData(firstname, lastname, email, hash)
                .then((data) => {
                    req.session.userId = data.rows[0].id;
                    // console.log("req.session.userId: ", req.session.userId);
                    res.json({ success: true, validation: true });
                })
                .catch((err) => {
                    console.log("Register error: ", err);
                    res.json({ success: false });
                });
        });
    } else {
        res.json({ validation: false });
    }
});

app.post("/login", (req, res) => {
    const { email, password } = req.body;
    if (email !== "" && password !== "") {
        getUserByEmail(email)
            .then((data) => {
                // console.log("all data from login: ", data.rows);
                if (data.rowCount === 0) {
                    // console.log("rowCount (no data found): ", data.rowCount);
                    res.json({ validation: false });
                    return;
                }

                dbHash = data.rows[0].password;
                // console.log("Hash from DB: ", dbHash);
                compare(password, dbHash, function (err, result) {
                    if (result) {
                        // console.log("compare: ", result);
                        req.session.userId = data.rows[0].id;
                        res.json({ validation: true });
                    } else {
                        // console.log("Password not match!", err);
                        res.json({ validation: false });
                        return;
                    }
                });
            })
            .catch((err) => console.log("Login error: ", err));
    } else {
        console.log("empty fields");
        res.json({ validation: false });
    }
});

app.post("/reset/start", (req, res) => {
    const { email } = req.body;
    // console.log("email: ", email);
    if (email !== "") {
        getUserByEmail(email)
            .then((data) => {
                // console.log("getUserByEmail: ", data.rows[0].email);
                if (data.rowCount === 0) {
                    // console.log("getUserByEmail (no data found)");
                    res.json({ validation: false });
                    return;
                }
                const secretCode = cryptoRandomString({
                    length: 6,
                });
                addCode(data.rows[0].email, secretCode);
                res.json({ validation: true, secretCode: secretCode });
            })
            .catch((err) => console.log("Check email error: ", err));
    } else {
        // console.log("empty field");
        res.json({ validation: false });
    }
});

app.post("/reset/verify", (req, res) => {
    const { email, code, password } = req.body;
    if (password !== "" && code !== "") {
        getCode(code)
            .then((data) => {
                // console.log("all data from reset/start: ", data.rows);
                if (data.rowCount === 0) {
                    // console.log("reset/start (no data found): ", data.rowCount);
                    res.json({ validation: false });
                    return;
                }

                hashPass(password).then((hash) => {
                    // console.log("hashed data (reset): ", hash);
                    // console.log("email after at hash (reset): ", email);
                    changeUserPassword(hash, email)
                        .then(() => {
                            // req.session.userId = data.rows[0].id;
                            // console.log("password changed: ", data.rows[0]);
                            res.json({ success: true, validation: true });
                        })
                        .catch((err) => {
                            console.log("Reset error: ", err);
                            res.json({ success: false });
                        });
                });
            })
            .catch((err) => console.log("Reset error: ", err));
    } else {
        console.log("empty fields");
        res.json({ validation: false });
    }
});

app.post("/upload", uploader.single("file"), fileUpload, function (req, res) {
    // If nothing went wrong the file is already in the uploads directory
    // console.log("amazon link from server: ", res.locals.fileUrl);

    const imgUrl = res.locals.fileUrl;
    const userId = req.session.userId;
    // console.log('user ID and file: ', userId, imgUrl );

    addImg(imgUrl, userId).then((data) => {
        if (req.file) {
            // console.log("User data (server): ", data.rows[0]);
            res.json({
                success: true,
                userFile: data.rows[0],
            });
        } else {
            res.json({
                success: false,
            });
        }
    });
});

app.post("/updatebio", (req, res) => {
    const userBio = req.body.userBio;
    const userId = req.session.userId;
    // console.log("updatebio: ", userId, userBio);

    addBio(userBio, userId)
        .then((data) => {
            res.json({ success: true, userBio: data.rows });
        })
        .catch((err) => {
            console.log("updatebio error: ", err);
            res.json({ success: false });
        });
});

// emailRes();

app.listen(PORT, function () {
    console.log(`Express server listening on port ${PORT}`);
});

app.get("*", function (req, res) {
    console.log("got requested url: ", req.url);
    res.sendFile(path.join(__dirname, "..", "client", "index.html"));
});
