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
