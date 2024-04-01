import { Request, Response } from 'express'
import { QueryError } from 'mysql2'
import db from '../config/db'
import { IStudent } from '../lib/@types'

export const getStudents = (req: Request, res: Response) => {
    db.query("SELECT * FROM student", (err: QueryError, result: IStudent[]) => {
        if (err) {
            return res.status(400).send(err)
        }
        return res.status(200).send({
            status: 'ok',
            student: result
        })
    })
}

export const getStudentsId = (req: Request, res: Response) => {
    const { id } = req.params
    db.query(`SELECT * FROM student WHERE id = ${id}`, (err: QueryError, result: IStudent[]) => {
        if (err) {
            return res.status(400).send(err)
        }
        return res.status(200).send({
            status: 'ok',
            student: result
        })
    })
}