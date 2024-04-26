import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import { responseError } from '../helpers/responseError'

const prisma = new PrismaClient()

export const createProduct = async (req: Request, res: Response) => {
    try {
        const product = await prisma.product.create({
            data: req.body
        })
        res.status(200).send({
            status: 'ok',
            product
        })
    } catch (err) {
        responseError(res, err)
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
        responseError(res, err)
    }
}