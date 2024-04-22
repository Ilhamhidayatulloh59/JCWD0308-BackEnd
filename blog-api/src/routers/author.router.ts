import { Router } from 'express'
import { createAuthor } from '../controllers/author.controller'

const authorRouter = Router()

authorRouter.post('/', createAuthor)

export { authorRouter }