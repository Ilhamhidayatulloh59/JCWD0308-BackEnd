import { PrismaClient } from '@prisma/client'
import { Router, Request, Response } from 'express'

const prisma = new PrismaClient()
const userRouter = Router()

userRouter.get('/', async (req: Request, res: Response) => {
    try {
        const users = await prisma.user.findMany({
            select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true
            }
        })

        res.status(200).send({
            status: 'ok',
            users
        })
    } catch (err) {
        res.status(400).send({
            status: err,
            message: err
        })
    }
})

export { userRouter }