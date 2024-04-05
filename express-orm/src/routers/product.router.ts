import { Router } from 'express'
import { createProduct, getProduct } from '../controllers/product.controller'

const productRouter = Router()

productRouter.post('/', createProduct)
productRouter.get('/', getProduct)

export { productRouter }