import { prismaMock } from "../setup_test/singleton";
import { getUser } from "../setup_test/function";

const sampleUsers = [
    {
        id: 1,
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@gmail.com",
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: 2,
        firstName: "Jane",
        lastName: "Dine",
        email: "jane.dine@gmail.com",
        createdAt: new Date(),
        updatedAt: new Date()
    }
]

test('should return an array of users', async () => {
    prismaMock.user.findMany.mockResolvedValue(sampleUsers)

    await expect(getUser()).resolves.toEqual(sampleUsers)
})