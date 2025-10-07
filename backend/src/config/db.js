import mongoose from 'mongoose';

export const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log("MONGO DB CONNECTED")
    } catch(error) {
        console.error("Error Connecting ", error);
        process.exit(1) // 1 Means exit with failure
    }
}