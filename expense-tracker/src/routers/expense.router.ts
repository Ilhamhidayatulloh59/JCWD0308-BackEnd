import { Router } from 'express'
import { getExpense, editExpense, getExpenseId, postExpense, deleteExpense } from '../controllers/expense.controller'
import { checkExpenseId, checkBodyAdd, checkBodyEdit } from '../middlewares/expense.middleware'

const expenseRouter = Router()

expenseRouter.post('/', checkBodyAdd, postExpense)
expenseRouter.get('/', getExpense)
expenseRouter.get('/:id', checkExpenseId, getExpenseId)
expenseRouter.patch('/:id', checkExpenseId, checkBodyEdit, editExpense)
expenseRouter.delete('/:id', checkExpenseId, deleteExpense)

export { expenseRouter }