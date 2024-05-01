import { PrismaClient } from "@prisma/client";

// type PrismaClientType = PrismaClient
const prisma = new PrismaClient()

export const findUserEmail = async (email: string): Promise<any> => {
    return await prisma.user.findUnique({
        where: {
            email
        },
    });
}

export const createUser = async (data: any): Promise<any> => {
    return await prisma.user.create({
        data
    })
}