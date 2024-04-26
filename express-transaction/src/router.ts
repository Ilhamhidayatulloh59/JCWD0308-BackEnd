import { Router, Request, Response } from 'express'
import { userRouter } from './routers/user.router'
import { productRouter } from './routers/product.router'
import { cartRouter } from './routers/cart.router'
import { orderRouter } from './routers/order.router'

const router = Router()

// api test
router.get('/', (req: Request, res: Response) => {
    res.status(200).send({
        status: 'ok',
        message: 'This is my Api'
    })
})

router.use('/users', userRouter)
router.use('/products', productRouter)
router.use('/carts', cartRouter)
router.use('/orders', orderRouter)

export default router