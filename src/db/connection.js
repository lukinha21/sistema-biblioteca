import mysql from "mysql2/promise";

const connection = mysql.createPool({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '123456',
    database: 'bibliotec',
});

export default connection;