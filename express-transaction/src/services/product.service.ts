import { PrismaClient } from "@prisma/client";

// type PrismaClientType = PrismaClient
const prisma = new PrismaClient()

export const addProduct = async (data: any): Promise<any> => {
    return await prisma.product.create({
        data
    })
}

export const selectProduct = async (): Promise<any> => {
    return await prisma.product.findMany()
}