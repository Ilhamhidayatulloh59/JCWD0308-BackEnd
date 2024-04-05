import { Router } from 'express'
import { createUser, getUser, getUserId } from '../controllers/user.controller'

const userRouter = Router()

userRouter.post('/', createUser)
userRouter.get('/', getUser)
userRouter.get('/:id', getUserId)

export { userRouter }