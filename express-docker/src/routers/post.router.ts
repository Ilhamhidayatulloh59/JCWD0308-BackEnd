import { Router } from 'express'
import { getPost } from '../controllers/post.controller'

const postRouter = Router()

postRouter.get('/', getPost)

export { postRouter }

