import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const createUser = async (req: Request, res: Response) => {
    try {
        await prisma.user.create({
            data: req.body
        })
        res.status(201).send({
            status: 'ok',
            message: 'User created!'
        })
    } catch (err) {
        res.status(400).send({
            status: 'error',
            message: err
        })
    }
}

export const getUser = async (req: Request, res: Response) => {
    try {
        const users = await prisma.user.findMany()
        const countUser = await prisma.user.count()
        res.status(200).send({
            status: 'ok',
            countUser,
            users
        })
    } catch (err) {
        res.status(400).send({
            status: 'error',
            message: err
        })
    }
}

export const getUserId = async (req: Request, res: Response) => {
    try {
        const users = await prisma.user.findUnique({
            where: {
                id: +req.params.id
            }
        })
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