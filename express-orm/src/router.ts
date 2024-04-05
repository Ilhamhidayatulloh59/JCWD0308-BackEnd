import { Request, Response, Router } from 'express'
import { userRouter } from './routers/user.router'
import { productRouter } from './routers/product.router'
import { cartRouter } from './routers/cart.router'

const router = Router()

// api test
router.get('/', (req: Request, res: Response) => {
    res.status(200).send({
        status: 'ok',
        message: 'Welcome to my api'
    })
})

router.use('/users', userRouter)
router.use('/products', productRouter)
router.use('/carts', cartRouter)

export default router