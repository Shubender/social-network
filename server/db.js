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

module.exports.getUserById = (userId) => {
    return db.query(`SELECT * FROM users WHERE id = $1`, [userId]);
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

module.exports.addImg = (imgUrl, userId) => {
    return db.query(
        `UPDATE users
        SET imageurl = $1
        WHERE id = $2
        RETURNING imageurl;`,
        [imgUrl, userId]
    );
};

module.exports.addBio = (userBio, userId) => {
    return db.query(
        `UPDATE users
        SET userbio = $1
        WHERE id = $2
        RETURNING imageurl;`,
        [userBio, userId]
    );
};

module.exports.getNewUsers = () => {
    return db.query(`
    SELECT * FROM users
    ORDER BY created_at DESC
    LIMIT 3;
    `);
};

module.exports.getUsersBySearch = (searchUsers) => {
    return db.query(
        `SELECT * FROM users 
        WHERE lastname ILIKE $1
        ORDER BY created_at DESC`,
        [searchUsers + "%"]
    );
};

module.exports.findFriendship = (user1, user2) => {
    const query = `
        SELECT * FROM friendships
        WHERE (sender_id = $1 AND recipient_id = $2)
        OR (sender_id = $2 AND recipient_id = $1)
    `;
    return db.query(query, [user1, user2]);
};

module.exports.sendFriendship = (sender, recipient) => {
    const query = `
        INSERT INTO friendships (sender_id, recipient_id)
        VALUES ($1, $2)
        RETURNING *;
        `;
    return db.query(query, [sender, recipient]);
};

module.exports.deleteFriendship = (user1, user2) => {
    const query = `
        DELETE FROM friendships 
        WHERE (sender_id = $1 AND recipient_id = $2)
        OR (sender_id = $2 AND recipient_id = $1)
        `;
    return db.query(query, [user1, user2]);
};

module.exports.acceptFriendship = (user1, user2) => {
    const query = `
        UPDATE friendships SET accepted = true
        WHERE (sender_id = $1 AND recipient_id = $2)
        OR (sender_id = $2 AND recipient_id = $1)
        `;
    return db.query(query, [user1, user2]);
};

module.exports.findAllFriendships = (userId) => {
    const query = `
        SELECT  * FROM friendships
        JOIN users
        ON users.id = friendships.sender_id 
        WHERE (recipient_id = $1 OR sender_id = $1)
    `;
    return db.query(query, [userId]);
};
