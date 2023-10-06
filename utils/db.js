import mysql from 'mysql2/promise';

const dbPool = mysql.createPool({
    host: 'localhost',
    user: "root",
    password: ";/Z9d,_U6jWY",
    database: "batch_12",
    port: 3306
});

export default dbPool;