import axios from "axios";
import { Router, Request, Response } from "express";

const pokemonRouter = Router()

pokemonRouter.get('/', async (req: Request, res: Response) => {
    try {
        const { data } = await axios.get('https://pokeapi.co/api/v2/pokemon')
        res.status(200).send({
            status: 'ok',
            data: data.results
        })
    } catch (err) {
        res.status(400).send({
            status: 'error',
            message: err
        })
    }
})

export { pokemonRouter }