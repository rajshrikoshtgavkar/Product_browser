const mysql = require("mysql2/promise");

const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "root123",
    database: "product_browser",
    waitForConnections: true,
    connectionLimit: 10
});

module.exports = pool;