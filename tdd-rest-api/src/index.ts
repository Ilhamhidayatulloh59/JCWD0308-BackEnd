import express, { Application } from 'express'
import router from './router'

const PORT = 8000

const app: Application = express()

app.use(express.json())
app.use('/api', router)

app.listen(PORT, () => {
    console.log(`[api]  local : http://localhost:${PORT}/api`)
})

export default app