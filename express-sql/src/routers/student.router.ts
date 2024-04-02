import { Router } from 'express'
import { addStudents, deleteStudent, editStudents, getStudents, getStudentsId } from '../controllers/student.controller'

const studentRouter = Router()

studentRouter.get('/', getStudents)
studentRouter.post('/', addStudents)
studentRouter.get('/:id', getStudentsId)
studentRouter.patch('/:id', editStudents)
studentRouter.delete('/:id', deleteStudent)

export { studentRouter }