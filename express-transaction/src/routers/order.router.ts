import { Router } from 'express'
import { verifyToken } from '../middlewares/verifyToken'
import { createOrder, getUserOrder } from '../controllers/order.controller'

const orderRouter = Router()

orderRouter.post('/', verifyToken, createOrder)
orderRouter.get('/', verifyToken, getUserOrder)

export { orderRouter }