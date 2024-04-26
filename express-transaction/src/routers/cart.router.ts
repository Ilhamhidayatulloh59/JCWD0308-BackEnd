import { Router } from 'express'
import { verifyToken } from '../middlewares/verifyToken'
import { addToCart, getUserCart } from '../controllers/cart.controller'

const cartRouter = Router()

cartRouter.post('/', verifyToken, addToCart)
cartRouter.get('/', verifyToken, getUserCart)

export { cartRouter }