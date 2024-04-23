import { Request, Response, NextFunction } from 'express'
import { verify } from 'jsonwebtoken'

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    try {
        let token = req.headers.authorization?.replace("Bearer ", "")
        if (!token) throw "Token Empty"

        const verifyUser = verify(token, process.env.KEY_JWT!)
        req.user = verifyUser as User

        next()
    } catch (err) {
        res.status(400).send({
            status: 'error',
            message: err
        })
    }
}

export const checkAdmin = (req: Request, res: Response, next: NextFunction) => {
    try {
        if (req.user?.isAdmin == false) throw "Unauthorized! (admin only)"

        next()
    } catch (err) {
        res.status(400).send({
            status: 'error',
            message: err
        })
    }
}