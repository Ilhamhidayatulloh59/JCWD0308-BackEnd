import { Request, Response, NextFunction } from 'express'
import { verify } from 'jsonwebtoken'

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    try {
        let token = req.headers.authorization?.replace("Bearer ", "")
        if (!token) throw "Token Empty"

        const verifyAuthor = verify(token, process.env.KEY_JWT!)
        req.author = verifyAuthor as Author

        next()
    } catch (err) {
        res.status(400).send({
            status: 'error',
            message: err
        })
    }
}