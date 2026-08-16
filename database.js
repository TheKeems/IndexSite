import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);

let dbConnection;

export const connectToDatabase = async () => {
    try {
        await client.connect();
        console.log('Successfully connected to MongoDB.');
        
        dbConnection = client.db(); 
        return dbConnection;
    } catch (error) {
        console.error('MongoDB connection failed:', error);
        process.exit(1);
    }
};

export const getDb = () => {
    if (!dbConnection) {
        throw new Error('Database not initialized. Call connectToDatabase first.');
    }
    return dbConnection;
};
