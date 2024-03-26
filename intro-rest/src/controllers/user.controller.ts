import { Request, Response } from 'express'
import { users } from '../lib/user'

export const getUser = (req: Request, res: Response) => {
    const userFilter = users.filter(item => {
        let isValid = true
        
        for (const key in req.query) {
            console.log(item[key as keyof typeof item], req.query[key])
            if (key == 'name') {
                isValid = isValid && item.name.toLowerCase().includes(req.query.name?.toString().toLowerCase() as string)
            } else {
                isValid = isValid && item[key as keyof typeof item] == req.query[key] 
            }
        }
        return isValid
    })

    res.status(200).send({
        status: "ok",
        users: userFilter
    })
}

export const getUserId = (req: Request, res: Response) => {
    const { id } = req.params
    const user = users.find(item => item.id == +id)

    if (user) {
        res.status(200).send({
            status: "ok",
            users: user
        })
    } else {
        res.status(400).send({
            status: "error",
            message: "User not found"
        })
    }
}

