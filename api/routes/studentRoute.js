
import express from 'express'
const router = express.Router()
import { createStudent, deleteStudent, getAllStudent, getSingleStudent, updateStudent } from '../controllers/studentController.js'
import authMiddleware from '../middlewares/authMiddleware.js'

// rest api route nad auth middleware add
router.route('/').get( authMiddleware, getAllStudent ).post( authMiddleware, createStudent )
router.route('/:id').get( authMiddleware, getSingleStudent ).put( authMiddleware, updateStudent ).patch( authMiddleware, updateStudent ).delete( authMiddleware, deleteStudent )



export default router