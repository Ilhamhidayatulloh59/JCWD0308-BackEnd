import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import { responseError } from '../helpers/responseError'
import { createCart, findCart } from '../services/cart.service'

const prisma = new PrismaClient()

export const addToCart = async (req: Request, res: Response) => {
    try {
        const { productId, quantity } = req.body

        let cart = await findCart(req)

        if (!cart) {
            cart = await createCart({ userId: req.user?.id || 0 })
        }

        let cartItem = await prisma.cartItem.findFirst({
            where: {
                cartId: cart.id,
                productId: productId
            }
        })

        if (cartItem) {
            cartItem = await prisma.cartItem.update({
                data: { quantity: cartItem.quantity + quantity },
                where: { id: cartItem.id }
            })
        } else {
            cartItem = await prisma.cartItem.create({
                data: {
                    productId,
                    quantity,
                    cartId: cart.id
                }
            })
        }

        res.status(200).send({
            status: 'ok',
            message: 'Add to cart success',
            cartItem
        })
    } catch (err) {
        responseError(res, err)
    }
}

export const getUserCart = async (req: Request, res: Response) => {
    try {
        const carts = await prisma.cart.findUnique({
            where: {
                userId: req.user?.id
            },
            include: {
                CartItem: {
                    include: {
                        product: true
                    }
                }
            }
        })
        res.status(200).send({
            status: 'ok',
            carts
        })
    } catch (err) {
        responseError(res, err)
    }
}