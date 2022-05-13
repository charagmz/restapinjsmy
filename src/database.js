const mysql = require('mysql');
const mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'mysqluser',
    password: 'UM2N4ko4.',
    database: 'restapijsmy',
});

mysqlConnection.connect(function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log('DB connected')
    }
});

module.exports = mysqlConnection;
