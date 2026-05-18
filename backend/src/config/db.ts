import mongoose from "mongoose"
import process from "node:process"

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL || "");
        console.log("Database connected successfully");
    } catch (error) {
        console.error("Failed to connect to the database");
        process.exit(1);
    }
};