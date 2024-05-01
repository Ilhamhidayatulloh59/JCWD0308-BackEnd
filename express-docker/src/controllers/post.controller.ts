import { Request, Response } from 'express'
import axios from 'axios'
import { redis } from '../helpers/redis'

export const getPost = async (req: Request, res: Response) => {
    try {
        const redisData = await redis.get('posts')
        if (redisData) {
            return res.status(200).send({
                status: 'ok',
                data: JSON.parse(redisData)
            })
        }

        const { data } = await axios.get('https://jsonplaceholder.typicode.com/posts')
        await redis.setex('posts', 60, JSON.stringify(data))
        res.status(200).send({
            status: 'ok',
            data
        })
    } catch (err) {
        console.error(err)
        res.status(400).send({
            status: 'error',
            message: err
        })
    }
}