import mysql from 'mysql'

const connection = mysql.createConnection({
    host: process.env.TEST_DEV_DB_HOST,
    port: Number(process.env.TEST_DEV_DB_PORT),
    user: process.env.TEST_DEV_DB_USERNAME,
    password: process.env.TEST_DEV_DB_PASSWORD,
    database: process.env.TEST_DEV_DB_NAME
})

export default connection
