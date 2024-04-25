import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import { genSalt, hash, compare } from 'bcrypt'
import { sign } from 'jsonwebtoken'

const prisma = new PrismaClient()

export const registerAuthor = async (req: Request, res: Response) => {
    try {
        const { password } = req.body
        const salt = await genSalt(10)
        const hashPassword = await hash(password, salt)

        const user = await prisma.author.create({
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

export const loginAuthor = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body
        const author = await prisma.author.findFirst({
            where: { email }
        })

        if (author == null) throw "User not found!"

        const isValidPass = await compare(password, author.password)
        if (isValidPass == false) throw "Wrong Password!"

        const payload = {
            id: author.id,
        }
        const token = sign(payload, process.env.KEY_JWT!, { expiresIn: "1d" })

        res.status(200).send({
            status: 'ok',
            author,
            token
        })
    } catch (err) {
        res.status(400).send({
            status: 'error',
            message: err
        })
    }
}

export const keepLogin = async (req: Request, res: Response) => {
    try {
        const author = await prisma.author.findFirst({
            where: { id: req.author?.id }
        })
        res.status(200).send({
            status: 'ok',
            author
        })
    } catch (err) {
        res.status(400).send({
            status: 'error',
            message: err
        })
    }
}