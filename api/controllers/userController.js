

import User from '../models/userModel.js'
import bcrypt from 'bcrypt'
import createError from './createError.js'
import jwt from 'jsonwebtoken'

/**
 * @access public
 * @route api/user
 * @method GET
 */

export const getAllUser = async (req, res, next) => {
    try{
        const user = await User.find()
        res.status(200).json(user)
    }catch(error){
        next(error)
    }
}




/**
 * @access public
 * @route api/user/:id
 * @method GET
 */

export const getSingleUser = async (req, res, next) => {
    try{
        const user = await User.findById(req.params.id)
        res.status(200).json(user)
    }catch(error){
        next(error)
    }
}



/**
 * @access public
 * @route api/user
 * @method POST
 */

export const createUser = async (req, res, next) => {
    try{
        // salt password
        const salt = await bcrypt.genSalt(10)
        const hash_password = await bcrypt.hash(req.body.password, salt)
        const user = await User.create({...req.body, password : hash_password})
        res.status(200).json(user)
    }catch(error){
        next(error)
    }
}



/**
 * @access public
 * @route api/user/:id
 * @method PUT/PATCH
 */

export const updateUser = async (req, res, next) => {
    try{
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {new : true})
        res.status(200).json(user)
    }catch(error){
        next(error)
    }
}



/**
 * @access public
 * @route api/user/:id
 * @method DELETE
 */

export const deleteUser = async (req, res, next) => {
    try{
        const user = await User.findByIdAndDelete(req.params.id)
        res.status(200).json(user)
    }catch(error){
        next(error)
    }
}



/**
 * @access public
 * @route api/user/login
 * @method POST
 */

 export const loginUser = async (req, res, next) => {
    try{
        // check email
        const user_login = await User.findOne({email : req.body.email})
        // exists email or not 
        if(!user_login){
            next(createError(404, 'Invalid email'))
        }

        // password check
        const check_password = await bcrypt.compare(req.body.password, user_login.password)
        if(!check_password){
            next(createError(404, 'Wrong password'))
        }

        // create token
        const token = await jwt.sign({id : user_login.id, isAdmin : user_login.isAdmin}, process.env.JWT_TOKEN)

        // exclude password
        const { password, ...user_info } = user_login._doc

        res.cookie('access_token', token).status(200).json({
            token : token,
            user : user_info
        })
    }catch(error){
        next(error)
    }
}





/**
 * @access public
 * @route api/user/register
 * @method POST
 */

 export const registerUser = async (req, res, next) => {
    try{
        // salt password
        const salt = await bcrypt.genSalt(10)
        const hash_password = await bcrypt.hash(req.body.password, salt)
        const user = await User.create({...req.body, password : hash_password})
        res.status(200).json(user)
    }catch(error){
        next(error)
    }
}

