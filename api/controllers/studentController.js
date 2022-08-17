

import Student from '../models/studentModel.js'
import bcrypt from 'bcrypt'
import createError from './createError.js'

/**
 * @access public
 * @route api/student
 * @method GET
 */

export const getAllStudent = async (req, res, next) => {
    try{
        const student = await Student.find()
        res.status(200).json(student)
    }catch(error){
        next(error)
    }
}




/**
 * @access public
 * @route api/student/:id
 * @method GET
 */

export const getSingleStudent = async (req, res, next) => {
    try{
        const student = await Student.findById(req.params.id)
        res.status(200).json(student)
    }catch(error){
        next(error)
    }
}



/**
 * @access public
 * @route api/student
 * @method POST
 */

export const createStudent = async (req, res, next) => {
    try{
        // salt password
        const salt = await bcrypt.genSalt(10)
        const hash_password = await bcrypt.hash(req.body.password, salt)
        const student = await Student.create({...req.body, password : hash_password})
        res.status(200).json(student)
    }catch(error){
        next(error)
    }
}



/**
 * @access public
 * @route api/student/:id
 * @method PUT/PATCH
 */

export const updateStudent = async (req, res, next) => {
    try{
        const student = await Student.findByIdAndUpdate(req.params.id, req.body, {new : true})
        res.status(200).json(student)
    }catch(error){
        next(error)
    }
}



/**
 * @access public
 * @route api/student/:id
 * @method DELETE
 */

export const deleteStudent = async (req, res, next) => {
    try{
        const student = await Student.findByIdAndDelete(req.params.id)
        res.status(200).json(student)
    }catch(error){
        next(error)
    }
}

