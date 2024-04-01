import { Router, Request, Response } from 'express'
import { studentRouter } from './routers/student.router'

const router = Router()

// api test
router.get('/', (req: Request, res: Response) => {
    res.status(200).send({
        status: 'ok',
        message: 'Welcome to my API'
    })
})

router.use('/students', studentRouter)

export default router