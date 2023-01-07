require("dotenv").config();
const { DATABASE_URL } = process.env;
const spicedPg = require("spiced-pg");
const db = spicedPg(DATABASE_URL);

module.exports.addUserData = (firstname, lastname, email, password) => {
    return db.query(
        `INSERT INTO users (firstname, lastname, email, password) VALUES ($1, $2, $3, $4) RETURNING *;`,
        [firstname, lastname, email, password]
    );
};

module.exports.getUserByEmail = (email) => {
    return db.query(`SELECT * FROM users WHERE email = $1`, [email]);
};

module.exports.addCode = (email, code) => {
    return db.query(
        `INSERT INTO reset_codes (email, code) VALUES ($1, $2) RETURNING *;`,
        [email, code]
    );
};