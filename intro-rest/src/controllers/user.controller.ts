import fs from 'fs'
import { Request, Response } from 'express'
import { IUser } from '../lib/@type'

let data: IUser[] = JSON.parse(fs.readFileSync('./src/lib/users.json', 'utf-8'))

export const getUser = (req: Request, res: Response) => {
    const userFilter = data.filter((item) => {
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
        users: userFilter,
    })
}

export const getUserId = (req: Request, res: Response) => {
    const { id } = req.params
    const user = data.find((item) => item.id == +id)

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

export const postUser = (req: Request, res: Response) => {
    const id = Math.max(...data.map((user => user.id))) + 1
    const newUser = { id, ...req.body }
    data.push(newUser)
    fs.writeFileSync('./src/lib/users.json', JSON.stringify(data), 'utf-8')

    res.status(200).send({
        status: 'ok',
        message: 'user register'
    })
}

export const delUser = (req: Request, res: Response) => {
    data = data.filter((item => item.id !== +req.params.id))
    
    fs.writeFileSync('./src/lib/users.json', JSON.stringify(data), 'utf-8')
    res.status(200).send({
        status: 'ok',
        message: 'user deleted'
    })
}