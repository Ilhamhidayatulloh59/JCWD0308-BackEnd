import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const createBlog = async (req: Request, res: Response) => {
    try {
        const slug = req.body.title.toLowerCase().replaceAll(" ", "-")
        req.body.slug = slug
        await prisma.blog.create({
            data: req.body
        })
        res.status(201).send({
            status: 'ok',
            message: 'Blog Created!'
        })
    } catch (err) {
        res.status(400).send({
            status: 'error',
            message: err
        })
    }
}

export const getBlogs = async (req: Request, res: Response) => {
    try {
        const blogs = await prisma.blog.findMany({
            include: {
                author: true
            }
        })
        res.status(200).send({
            status: 'ok',
            blogs
        })
    } catch (err) {
        res.status(400).send({
            status: 'error',
            message: err
        })
    }
}

export const getBlogSlug = async (req: Request, res: Response) => {
    try {
        const blogs = await prisma.blog.findUnique({
            where: {
                slug: req.params.slug
            },
            include: {
                author: {
                    select: {
                        name: true,
                        email: true
                    }
                }
            }
        })
        res.status(200).send({
            status: 'ok',
            blogs
        })
    } catch (err) {
        res.status(400).send({
            status: 'error',
            message: err
        })
    }
}