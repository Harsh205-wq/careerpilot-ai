import mongoose from "mongoose";

const connectDB = async () => {
    try {
        if (!process.env.MONGODB_URI) {
            throw new Error("MONGODB_URI is not set. Check server/.env.");
        }

        const conn = await mongoose.connect(process.env.MONGODB_URI, {
            serverSelectionTimeoutMS: 10000,
        });

        console.log(`Mongodb connected: ${conn.connection.host}`);
    } catch (error) {
        console.log("DataBase Connection Error", error.message);
        process.exit(1);
    }
};

export default connectDB;
