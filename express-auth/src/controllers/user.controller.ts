import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import { genSalt, hash, compare } from 'bcrypt'
import { sign } from 'jsonwebtoken'

const prisma = new PrismaClient()

export const userRegister = async (req: Request, res: Response) => {
    try {
        const { password } = req.body
        const salt = await genSalt(10)
        const hashPassword = await hash(password, salt)

        const user = await prisma.user.create({
            data: {
                ...req.body,
                password: hashPassword
            }
        })
        res.status(201).send({
            status: 'ok',
            message: 'User Registered!',
            user
        })
    } catch (err) {
        res.status(400).send({
            status: 'error',
            message: err
        })
    }
}

export const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await prisma.user.findMany()
        res.status(200).send({
            status: 'ok',
            users
        })
    } catch (err) {
        res.status(400).send({
            status: 'error',
            message: err
        })
    }
}

export const userLogin = async (req: Request, res: Response) => {
    try {
        const { data, password } = req.body
        const users = await prisma.user.findFirst({
            where: {
                OR: [
                    { username: data },
                    { email: data }
                ]
            }
        })

        if (users == null) throw "User not found!"

        const isValidPass = await compare(password, users.password)
        if (isValidPass == false) throw "Wrong Password!"
        
        const payload = {
            id: users.id,
            isAdmin: users.isAdmin
        }
        const token = sign(payload, process.env.KEY_JWT!, { expiresIn: "5m" })

        res.status(200).send({
            status: 'ok',
            users,
            token
        })
    } catch (err) {
        res.status(400).send({
            status: 'error',
            message: err
        })
    }
}

export const getProfile = async (req: Request, res: Response) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: req.user?.id
            }
        })
        res.status(200).send({
            status: 'ok',
            user
        })
    } catch (err) {
        res.status(400).send({
            status: 'error',
            message: err
        })
    }
}