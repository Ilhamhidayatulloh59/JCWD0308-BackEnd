let age: any = 20
age = "budi"

function add(a: number, b: number): number {
    return a + b
}

interface IUser {
    id: number
    name: string
    email: string
    age?: number
}

const user1: IUser = {
    id: 1,
    name: "Budi",
    email: "Budi@gmail.com",
    age: 25
}