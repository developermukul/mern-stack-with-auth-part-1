import mongoose from 'mongoose'

const connectMongoDB = async () => {
    try{
        await mongoose.connect(process.env.CONNECT_MONGO_STRING)
        console.log('Mongo DB is ready'.bgGreen);
    }catch(error){
        console.log(error);
    }
}



export default connectMongoDB