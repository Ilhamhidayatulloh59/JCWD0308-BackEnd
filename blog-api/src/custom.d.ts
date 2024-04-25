type Author = {
    id: number
}

declare namespace Express {
    export interface Request {
        author?: Author
    }
}