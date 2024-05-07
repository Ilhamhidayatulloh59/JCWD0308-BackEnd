import request from 'supertest'
import app from '..'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

describe("GET api/users", () => {
    const sampleUsers = [
        {
            id: 1,
            firstName: "John",
            lastName: "Doe",
            email: "john.doe@gmail.com"
        },
        {
            id: 2,
            firstName: "Jane",
            lastName: "Dine",
            email: "jane.dine@gmail.com"
        }
    ]

    beforeAll(async () => {
        await prisma.$connect()
    })

    beforeEach(async () => {
        const users = await prisma.user.findMany()
        if (users.length === 0) {
            await prisma.user.createMany({
                data: sampleUsers
            })
        }
    })

    afterEach(async () => {
        await prisma.user.deleteMany({ where: {} })
    })

    afterAll(async () => {
        await prisma.$disconnect()
    })

    it("should return an array of users", async () => {
        const response = await request(app).get('/api/users');
        expect(response.status).toBe(200)
        expect(response.body).toEqual({
            status: 'ok',
            users: sampleUsers.map((item) => {
                return {
                    id: item.id,
                    firstName: item.firstName,
                    lastName: item.lastName,
                    email: item.email
                }
            })
        })
    })
})
