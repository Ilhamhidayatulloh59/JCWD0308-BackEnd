import express, { Application } from 'express'
import router from './router'
import db from './config/db'

const PORT = 8000

const app: Application = express()

app.use(express.json())
app.use('/api', router)

// check db connection
db.getConnection((err, connection) => {
    if (err) {
        return console.log(err);
    }
    console.log("Success Connection", connection.threadId)
})

app.listen(PORT, () => {
    console.log(`[API] local :  http://localhost:${PORT}/api`)
})