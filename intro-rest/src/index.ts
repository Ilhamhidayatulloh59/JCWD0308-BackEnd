import express, { Application } from 'express'
import router from './router'

const PORT = 8000
const app: Application = express()

app.use(express.json()) // middleware untuk menerima data body (cookieparser)
app.use("/api", router)

app.listen(PORT, () => {
    console.log(`[API] local:    http://localhost:${PORT}/api`)
})
