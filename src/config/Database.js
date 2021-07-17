const mysql = require("mysql2");

let db = null;
  
module.exports = (() => {
  if (!db) {
    db = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
      });
  }
  return db;
})();