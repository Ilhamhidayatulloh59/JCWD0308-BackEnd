import { Router } from 'express'
import { getProfile, getUsers, userLogin, userRegister } from '../controllers/user.controller'
import { checkAdmin, verifyToken } from '../middlewares/user.middleware'

const userRouter = Router()

userRouter.get('/', verifyToken, checkAdmin, getUsers)
userRouter.get('/profile', verifyToken, getProfile)
userRouter.post('/', userRegister)
userRouter.post('/login', userLogin)

export { userRouter }