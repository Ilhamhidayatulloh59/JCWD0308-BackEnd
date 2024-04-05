import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const createProduct = async (req: Request, res: Response) => {
    try {
        await prisma.product.create({
            data: req.body
        })
        res.status(201).send({
            status: 'ok',
            message: 'Product created!'
        })
    } catch (err) {
        res.status(400).send({
            status: 'error',
            message: err
        })
    }
}

export const getProduct = async (req: Request, res: Response) => {
    try {
        const products = await prisma.product.findMany()
        res.status(200).send({
            status: 'ok',
            products
        })
    } catch (err) {
        res.status(400).send({
            status: 'error',
            message: err
        })
    }
}
