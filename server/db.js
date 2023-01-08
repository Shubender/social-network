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

module.exports.changeUserPassword = (password, email) => {
    return db.query(
        `
        UPDATE users
        SET password = $1
        WHERE email = $2;`,
        [password, email]
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

module.exports.getCode = (code) => {
    return db.query(
        `SELECT * FROM reset_codes
        WHERE code = $1
        AND CURRENT_TIMESTAMP - timestamp < INTERVAL '10 minutes'`,
        [code]
    );
};
