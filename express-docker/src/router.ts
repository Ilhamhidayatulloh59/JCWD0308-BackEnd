import { Request, Response, Router } from 'express'
import { postRouter } from './routers/post.router'

const router = Router()

// API test
router.get('/', (req: Request, res: Response) => {
    res.status(200).send({
        status: 'ok',
        message: 'Welcome to my Api'
    })
})

router.use('/posts', postRouter)

export default router