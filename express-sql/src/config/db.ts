import mysql from 'mysql2'

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Mysql1234',
    database: 'JCWD0308'
})

export default db
