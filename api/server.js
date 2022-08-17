import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import connectMongoDB from './config/db.js'
import studentRoute from './routes/studentRoute.js'
import userRoute from './routes/userRoute.js'
import errorHandler from './middlewares/errorHandler.js'
import cookieParser from 'cookie-parser'


// express init
const app = express()
dotenv.config()
app.use(cookieParser())

// url uncoded middleware
app.use(express.json())
app.use(express.urlencoded({extended : false}))


// route
app.use('/api/student', studentRoute)
app.use('/api/user', userRoute)


// error handler
app.use( errorHandler )


// server listen
const PORT = process.env.SERVER_PORT || 500
app.listen(PORT, () => {
    // connect mongo db
    connectMongoDB()
    console.log(`our server is running on port ${PORT}`.bgBlue);
})