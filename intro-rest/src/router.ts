import { Request, Router, Response, NextFunction } from 'express'
import { userRouter } from './routers/user.router'

const router = Router()
// middleware global
router.use((req: Request, res: Response, next: NextFunction) => {
    console.log("Time", Date.now());
    next()
})

// router test
router.get("/", (req: Request, res: Response) => {
    res.status(200).send({
        status: "ok",
        message: "Welcome to my API"
    })
})

router.use("/users", userRouter)
// add another router here

export default router