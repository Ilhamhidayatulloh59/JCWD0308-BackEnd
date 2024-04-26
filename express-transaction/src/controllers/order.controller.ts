import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import { responseError } from '../helpers/responseError'

const prisma = new PrismaClient({
    log: ['query']
})

export const createOrder = async (req: Request, res: Response) => {
    try {
        await prisma.$transaction(async (tx) => {
            const cart = await tx.cart.findUnique({
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
            });

            if (!cart || cart.CartItem.length === 0) {
                throw "Cart is empty";
            }

            const oldOrder = await tx.order.findFirst({
                where: {
                    userId: req.user?.id,
                    status: "Pending"
                }
            });

            if (oldOrder) {
                throw "Complete the previous transaction";
            }

            const total = cart.CartItem.reduce((total, item) => total + (item.product.productPrice * item.quantity), 0);
            const now = new Date();
            const expiredDate = new Date(now.getTime() + (5 * 60000));

            const order = await tx.order.create({
                data: {
                    userId: req.user?.id || 0,
                    total: total || 0,
                    status: "Pending",
                    expiredDate
                }
            });

            await Promise.all(cart.CartItem.map(async (p) => {
                const product = await tx.product.findUnique({ where: { id: p.productId } });
                if (!product || product.productStock < p.quantity) {
                    throw `Product ${product?.productName || p.productId} is out of stock`;
                }

                await tx.orderItem.create({
                    data: {
                        productId: p.productId,
                        orderId: order.id,
                        quantity: p.quantity
                    }
                });

                await tx.product.update({
                    data: {
                        productStock: (product?.productStock || 0) - p.quantity
                    },
                    where: {
                        id: product?.id
                    }
                });
            }));

            await tx.cartItem.deleteMany({
                where: {
                    cartId: cart.id
                }
            });
        });
        res.status(200).send({
            status: 'ok',
            message: 'order success'
        });
    } catch (err) {
        responseError(res, err);
    }
}

export const getUserOrder = async (req: Request, res: Response) => {
    try {
        const orders = await prisma.order.findMany({
            where: { userId: req.user?.id },
            include: {
                OrderItem: {
                    include: { product: true }
                }
            }
        })

        res.status(200).send({
            status: 'ok',
            orders
        })
    } catch (err) {
        responseError(res, err);
    }
}