import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGODB_URI: string = process.env.MONGODB_URL || 'mongodb://localhost:3001';

console.log('MONGODB_URI', MONGODB_URI);

interface Connection {
 isConnected: boolean;
}

const connection: Connection = {
 isConnected: false,
};

async function dbConnect() {
 if (connection.isConnected) {
    return true; // Connection is already established
 }

 try {
    const db = await mongoose.connect(MONGODB_URI);

    connection.isConnected = db.connections[0].readyState === 1; // 1 indicates a connected state
    return connection.isConnected;
 } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    return false;
 }
}

export default dbConnect;