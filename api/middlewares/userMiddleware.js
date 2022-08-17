import createError from "../controllers/createError.js"
import jwt from 'jsonwebtoken'





const userMiddleware = (req, res, next) => {
   
    // get token from cookie
     const token = req.cookies.access_token
    // check token
     if(!token){
        next(createError(401, 'you are not authenticator'))
     }

     // verify user token
     const login_user = jwt.verify(token, process.env.JWT_TOKEN)
     if(!login_user){
        next(createError(401, 'Invalid token'))
     }

     // check login user and server user are same? 
     if(login_user.id !== req.params.id){
        next(createError(401, 'You cannot access this feature'))
     }

     // user data
     if(login_user){
        req.user = login_user
        next()
     }

}


export default userMiddleware