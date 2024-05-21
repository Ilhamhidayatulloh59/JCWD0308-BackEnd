import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import { genSalt, hash, compare } from 'bcrypt'
import { sign } from 'jsonwebtoken'
import path from 'path'
import fs from 'fs'
import handlebars from 'handlebars'
import { transporter } from '../helpers/nodemailer'
import { generateInvoicePdf } from '../helpers/pdf'

const prisma = new PrismaClient()

export const registerAuthor = async (req: Request, res: Response) => {
    try {
        const { password } = req.body
        const salt = await genSalt(10)
        const hashPassword = await hash(password, salt)

        const author = await prisma.author.create({
            data: {
                ...req.body,
                password: hashPassword
            }
        })

        const pdf = await generateInvoicePdf(author.name)

        const payload = {
            id: author.id
        }
        const token = sign(payload, process.env.KEY_JWT!, { expiresIn: '1h' })
        const link = `http://localhost:3000/verify/${token}`

        const templatePath = path.join(__dirname, "../templates", "register.html")
        const templateSource = fs.readFileSync(templatePath, 'utf-8')
        const compiledTemplate = handlebars.compile(templateSource)
        const html = compiledTemplate({
            name: author.name,
            link
        })

        await transporter.sendMail({
            from: "ilham@purwadhika.com",
            to: author.email,
            subject: "Welcome to My Blog",
            attachments: [{ path: pdf }],
            html
        })

        res.status(201).send({
            status: 'ok',
            message: 'Author Registered!',
            author
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

export const verifyAuthor = async (req: Request, res: Response) => {
    try {
        await prisma.author.update({
            data: {
                isActive: true
            },
            where: {
                id: req.author?.id
            }
        })

        res.status(200).send({
            status: 'ok',
            message: 'Verify Account Success'
        })
    } catch (err) {
        console.log(err);
        res.status(400).send({
            status: 'error',
            message: err
        })
    }
}

export const imageAuthor = async (req: Request, res: Response) => {
    try {
        // const { file } = req
        // if (!file) throw "No File Uploaded!"
        // const imageUrl = `http://localhost:8000/public/images/${file.filename}`

        // await prisma.author.update({
        //     data: {
        //         image: imageUrl
        //     },
        //     where: {
        //         id: req.author?.id
        //     }
        // })

        res.status(200).send({
            status: 'ok',
            message: 'Upload image success'
        })

    } catch (err) {
        console.log(err);
        res.status(400).send({
            status: 'error',
            message: err
        })
    }
}