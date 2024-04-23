type User = {
    id: number
    isAdmin: boolean
}

declare namespace Express {
    export interface Request {
        user?: User
    }
}