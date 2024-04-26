import { Request, Response } from "express";
import { responseError } from "../helpers/responseError";
import { PrismaClient } from '@prisma/client'
import { genSalt, hash, compare } from 'bcrypt'
import { generateToken } from "../helpers/generateToken";

const prisma = new PrismaClient()

export const regUser = async (req: Request, res: Response) => {
    try {
        console.log(req.body);
        
        const { password } = req.body
        const salt = await genSalt(10)
        const hashPassword = await hash(password, salt)

        const users = await prisma.user.create({
            data: {
                ...req.body,
                password: hashPassword
            }
        })

        res.status(201).send({
            status: 'ok',
            message: 'User created!',
            users
        })
    } catch (err) {
        responseError(res, err)
    }
}

export const loginUser = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body
        const users = await prisma.user.findUnique({
            where: { email }
        })

        if (!users) throw 'user not found!'

        const isValidPass = await compare(password, users.password)
        if (!isValidPass) throw 'wrong password!'

        const payload = {
            id: users.id
        }
        const token = generateToken(payload)

        res.status(200).send({
            status: 'ok',
            token,
            users
        })

    } catch (err) {
        responseError(res, err)
    }
}