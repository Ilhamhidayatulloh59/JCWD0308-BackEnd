import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client' 

const prisma = new PrismaClient()

export const createAuthor = async (req: Request, res: Response) => {
    try {
        await prisma.author.create({
            data: req.body
        })
        res.status(201).send({
            status: 'ok',
            message: 'Author Created!'
        })
    } catch (err) {
        res.status(400).send({
            status: 'error',
            message: err
        })
    }
}