import { Router } from 'express'
import { getCartId } from '../controllers/cart.controller'

const cartRouter = Router()

cartRouter.get('/:id', getCartId)

export { cartRouter }