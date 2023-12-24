import mongoose from 'mongoose';

export const connectMongoDB = async (uri) => {
    try {
        const connection = await mongoose.connect(uri);
        console.log('Connected to Mongo.');
    } catch (error) {
        console.error(`Error connecting to MongoDB: ${error.message}`);
        process.exit(1);
    }
};