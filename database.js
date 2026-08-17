import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const uri = process.env.MONGO_URI;

export const connectToDatabase = async () => {
    if (!uri) {
        throw new Error('MONGO_URI is not set');
    }
    // Mongoose keeps its own connection pool: the models in app.js only work
    // once *this* connection is open, so connecting a bare MongoClient here
    // would leave every query buffering until it times out.
    await mongoose.connect(uri);
    console.log('Successfully connected to MongoDB.');
    return mongoose.connection.db;
};

export const getDb = () => {
    if (mongoose.connection.readyState !== 1) {
        throw new Error('Database not initialized. Call connectToDatabase first.');
    }
    return mongoose.connection.db;
};
