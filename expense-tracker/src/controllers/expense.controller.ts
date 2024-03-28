import { Request, Response } from 'express'
import fs from 'fs'
import { IExpense } from '../lib/@types'

let data: IExpense[] = JSON.parse(fs.readFileSync('./src/lib/expense.json', 'utf-8'))

export const getExpense = (req: Request, res: Response) => {
    const { category, start, end } = req.query
    const startDate = new Date(start as string)
    const endDate = new Date(end as string)

    let expenseFilter = data.filter((item) => {
        let isValid = true

        if (category) {
            isValid = isValid && item.category == category
        } 

        if (start && end) {
            isValid = isValid && new Date(item.date) >= startDate && new Date(item.date) <= endDate
        }

        return isValid
    })

    const total = expenseFilter.reduce((acc, curr) => acc + curr.nominal, 0)
    res.status(200).send({
        status: 'ok',
        total,
        data: expenseFilter
    })
}

export const getExpenseId = (req: Request, res: Response) => {
    const { id } = req.params
    const expense = data.find((item) => item.id == +id)

    res.status(200).send({
        status: 'ok',
        expense
    })
}

export const postExpense = (req: Request, res: Response) => {
    const id = Math.max( ...data.map(item => item.id)) + 1
    const newData = { id, ...req.body }
    data.push(newData)

    fs.writeFileSync('./src/lib/expense.json', JSON.stringify(data), 'utf-8')
    
    res.status(200).send({
        status: 'ok',
        message: 'Add expense successfully ✅'
    })
}

export const editExpense = (req: Request, res: Response) => {
    const { id } = req.params
    const idx = data.findIndex((item) => item.id == +id)

    data[idx] = { ...data[idx], ...req.body }

    fs.writeFileSync('./src/lib/expense.json', JSON.stringify(data), 'utf-8')

    res.status(200).send({
        status: 'ok',
        message: 'Edit expense successfully! ✅'
    })
}

export const deleteExpense = (req: Request, res: Response) => {
    const { id } = req.params

    data = data.filter((item) => item.id !== +id)

    fs.writeFileSync('./src/lib/expense.json', JSON.stringify(data), 'utf-8')

    res.status(200).send({
        status: 'ok',
        message: 'Delete expense successfully! ✅'
    })
}