import { Router } from 'express'
import { getUser, getUserId } from '../controllers/user.controller'

const userRouter = Router()

userRouter.get("/", getUser)
userRouter.get("/:id", getUserId)

export { userRouter }
