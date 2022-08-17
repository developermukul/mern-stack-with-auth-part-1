
import express from 'express'
const router = express.Router()

import { createUser, deleteUser, getAllUser, getSingleUser, loginUser, registerUser, updateUser } from '../controllers/userController.js'
import adminMiddleware from '../middlewares/adminMiddleware.js'
import authMiddleware from '../middlewares/authMiddleware.js'
import userMiddleware from '../middlewares/userMiddleware.js'

// rest api route
router.route('/').get(adminMiddleware, getAllUser ).post(adminMiddleware, createUser )
router.route('/:id').get(userMiddleware, getSingleUser ).put(userMiddleware, updateUser ).patch(userMiddleware, updateUser ).delete(userMiddleware, deleteUser )


// auth route
router.post('/login', loginUser)
router.post('/register', registerUser)



export default router