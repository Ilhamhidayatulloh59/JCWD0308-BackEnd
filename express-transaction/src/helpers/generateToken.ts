import { sign } from 'jsonwebtoken'

export const generateToken = (payload: any) => {
    const token = sign(payload, process.env.KEY_JWT!, { expiresIn: '1d' })
    return token
}