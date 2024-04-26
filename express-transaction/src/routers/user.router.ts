import { Router } from 'express'
import { loginUser, regUser } from '../controllers/user.controller'

const userRouter = Router()

userRouter.post('/', regUser)
userRouter.post('/login', loginUser)

export { userRouter }