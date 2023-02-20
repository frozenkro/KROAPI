import mongoose from 'mongoose';

const connectDB = async() => {
    try {
        
        const conn = await mongoose.connect(<string>process.env.MONGO_URI);

        console.log(`mongodb connected: ${conn.connection.host}`)
    } catch (err) {
        console.error(err)
        process.exit(1)
    }
}

export default connectDB;