const  database = require("../config/Database");

module.exports = {

    insert(message) {
        return new Promise((resolve, reject) => {
            database.execute(
                'INSERT INTO messages(text) VALUES (?)',
                [message],
                function(err, results) {
                    if (err) {
                        return reject(err);
                    }
                    resolve(results);
                }
              );
        })
    }
}