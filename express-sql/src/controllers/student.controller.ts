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

export const addStudents = (req: Request, res: Response) => {
    const { name, email, city, age } = req.body

    db.query(
        `INSERT INTO student 
            (name, email, city, age) 
        VALUES 
            ("${name}", "${email}", "${city}", ${age})`, 
        (err: QueryError, result: any) => {
            if (err) {
                return res.status(400).send(err)
            }
            return res.status(200).send({
                status: 'ok',
                result
            })
        }
    )
}

export const editStudents = (req: Request, res: Response) => {
    const { id } = req.params
    const query: string[] = []
    
    for (const key in req.body) {
        query.push(`${key} = "${req.body[key]}"`)
    }

    db.query(`UPDATE student SET ${query.join(', ')} WHERE id = ${id}`, 
    (err: QueryError, result: any) => {
        if (err) {
            return res.status(400).send(err)
        }
        return res.status(200).send({
            status: 'ok',
            result
        })
    })
}

export const deleteStudent = (req: Request, res: Response) => {
    const { id } = req.params

    db.query(`DELETE FROM student WHERE id = ${id}`, 
    (err: QueryError, result: any) => {
        if (err) {
            return res.status(400).send(err)
        }
        return res.status(200).send({
            status: 'ok',
            result
        })
    })
}
