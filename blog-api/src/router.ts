import { Request, Response, Router } from 'express'
import { authorRouter } from './routers/author.router'
import { blogRouter } from './routers/blog.router'

const router = Router()

// api test
router.get('/', (req: Request, res: Response) => {
    res.status(200).send({
        status: 'ok',
        message: 'Welcome to my api'
    })
})

router.use('/authors', authorRouter)
router.use('/blogs', blogRouter)

export default router