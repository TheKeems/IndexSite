import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const uri = process.env.MONGO_URI;

export const connectToDatabase = async () => {
    await mongoose.connect(uri);
    console.log('Successfully connected to MongoDB.');
    return mongoose.connection.db;
};

export const getDb = () => {
    if (mongoose.connection.readyState !== 1) {
        throw new Error('Database not initialized. Call connect first.');
    }
    return mongoose.connection.db;
};
