import { NextFunction, Request, Response } from "express";
import { IExpense } from "../lib/@types";
import fs from 'fs'

export const checkExpenseId = (req: Request, res: Response, next: NextFunction) => {
    let data: IExpense[] = JSON.parse(fs.readFileSync('./src/lib/expense.json', 'utf-8'))
    const { id } = req.params
    const expense = data.find((item) => item.id == +id)

    if (expense) {
        next()
    } else {
        res.status(404).send({
            status: 'error',
            message: 'Expense not exist! 🚫'
        })
    }
}

export const checkBodyAdd = (req: Request, res: Response, next: NextFunction) => {
    const { name, category, nominal, date } = req.body

    if (name && category && nominal && date) {
        next()
    } else {
        res.status(400).send({
            status: 'error',
            message: 'Data tidak sesuai 🚫'
        })
    }
}

export const checkBodyEdit = (req: Request, res: Response, next: NextFunction) => {
    const editOpt =  ['name', 'category', 'nominal', 'date'] 
    let isValid = true

    for (const key in req.body) {
        isValid = isValid && editOpt.includes(key)
    }

    if (isValid) {
        next()
    } else {
        res.status(400).send({
            status: 'error',
            message: 'Data tidak sesuai 🚫'
        })
    }
}