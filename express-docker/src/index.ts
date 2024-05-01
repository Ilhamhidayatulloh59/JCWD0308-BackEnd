import express, { Application } from 'express'
import router from './router'
import { redis } from './helpers/redis'

const PORT = 8000

const app: Application = express()

app.use(express.json())
app.use('/api', router)

redis.on("connect", () => {
    console.log('succes connect to redis')
})

redis.on("error", (err) => {
    console.log(`Error connecting to redis: ${err.message}`)
    process.exit(1)
})

app.listen(PORT, () => {
    console.log(`[API]  local : http://localhost:${PORT}/api`)
})