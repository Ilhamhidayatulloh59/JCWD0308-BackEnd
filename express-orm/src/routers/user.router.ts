import { Router } from 'express'
import { createUser, deleteUser, getUser, getUserId, updateUser } from '../controllers/user.controller'

const userRouter = Router()

userRouter.post('/', createUser)
userRouter.get('/', getUser)
userRouter.get('/:id', getUserId)
userRouter.patch('/:id', updateUser)
userRouter.delete('/:id', deleteUser)

export { userRouter }