import { Router } from 'express'
import { getStudents, getStudentsId } from '../controllers/student.controller'

const studentRouter = Router()

studentRouter.get('/', getStudents)
studentRouter.get('/:id', getStudentsId)

export { studentRouter }