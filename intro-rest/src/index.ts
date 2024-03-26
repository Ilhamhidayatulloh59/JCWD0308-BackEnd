import express, { Request, Response, Application } from 'express'
import router from './router'

const PORT = 8000
const app: Application = express()

app.use("/api", router)
app.get("/api", (req: Request, res: Response) => {
    res.status(200).send({
        status: "ok",
        message: "Welcome to my API"
    })
})

app.listen(PORT, () => {
    console.log(`[API] local:    http://localhost:${PORT}/api`)
})
