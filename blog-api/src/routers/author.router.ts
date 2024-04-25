import { Router } from 'express'
import { imageAuthor, keepLogin, loginAuthor, registerAuthor, verifyAuthor } from '../controllers/author.controller'
import { verifyToken } from '../middlewares/author.middleware'
import { uploader } from '../helpers/uploader'
import { validateRegister } from '../middlewares/validator'

const authorRouter = Router()

authorRouter.post('/', validateRegister, registerAuthor)
authorRouter.post('/login', loginAuthor)
authorRouter.get('/keep-login', verifyToken, keepLogin)
authorRouter.get('/verify', verifyToken, verifyAuthor)
authorRouter.patch('/image', verifyToken, uploader("IMG", "/images").single("file"), imageAuthor)

export { authorRouter }