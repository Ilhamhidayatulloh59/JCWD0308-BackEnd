import { Request, Response } from 'express'

export class UserController {
    getUser(req: Request, res: Response) {
        try {
            const users = [{
                id: 1,
                name: "andi",
                age: 20
            }]
            if (users) throw "error coba"
            res.status(200).send({
                status: "ok",
                users
            })
        } catch (err) {
            res.status(400).send({
                status: "error",
                message: err
            })
        }
    }

    async userRegister() {

    }
}