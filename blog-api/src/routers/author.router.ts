import { Router } from 'express'
import { keepLogin, loginAuthor, registerAuthor } from '../controllers/author.controller'
import { verifyToken } from '../middlewares/author.middleware'

const authorRouter = Router()

authorRouter.post('/', registerAuthor)
authorRouter.post('/login', loginAuthor)
authorRouter.get('/keep-login', verifyToken, keepLogin)

export { authorRouter }