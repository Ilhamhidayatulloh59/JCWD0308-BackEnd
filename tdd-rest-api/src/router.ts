import { Router, Request, Response } from 'express'
import { userRouter } from './routers/user.router'
import { pokemonRouter } from './routers/pokemon.router'

const router = Router()

// api test
router.get('/', (req: Request, res: Response) => {
    res.status(200).send({
        status: 'ok',
        message: 'Welcome to my APi'
    })
})

router.use('/users', userRouter)
router.use('/pokemons', pokemonRouter)

export default router