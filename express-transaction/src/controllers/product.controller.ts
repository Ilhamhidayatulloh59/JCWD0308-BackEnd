import { Request, Response } from 'express'
import { responseError } from '../helpers/responseError'
import { addProduct, selectProduct } from '../services/product.service'

export const createProduct = async (req: Request, res: Response) => {
    try {
        const product = await addProduct(req.body)
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
        const products = await selectProduct()
        res.status(200).send({
            status: 'ok',
            products
        })
    } catch (err) {
        responseError(res, err)
    }
}