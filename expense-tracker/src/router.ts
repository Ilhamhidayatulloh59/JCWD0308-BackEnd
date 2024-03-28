import { Router, Request, Response } from 'express'
import { expenseRouter } from './routers/expense.router'

const router = Router()

// api test
router.get('/', (req: Request, res: Response) => {
    res.status(200).send({
        status: 'ok',
        message: 'Welcome to my API'
    })
})

router.use('/expense', expenseRouter)

export default router