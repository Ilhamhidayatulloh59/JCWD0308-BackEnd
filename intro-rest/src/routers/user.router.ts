import { Router } from 'express'
import { delUser, getUser, getUserId, postUser } from '../controllers/user.controller'

const userRouter = Router()
// userRouter.use(midUser)

userRouter.get("/", getUser)
userRouter.get("/:id", getUserId)
userRouter.post("/", postUser)
userRouter.delete("/:id", delUser)

export { userRouter }
