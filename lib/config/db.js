import mongoose from "mongoose";

const ConnectDB = async () => {
    try {
        const MONGODB_URI = process.env.MONGODB_URI;
        
        if (!MONGODB_URI) {
            throw new Error("Please define the MONGODB_URI environment variable");
        }

        // Check if we're already connected
        if (mongoose.connection.readyState === 1) {
            console.log("Using existing database connection");
            return;
        }

        // Configuration optimized for production
        const options = {
            maxPoolSize: 10,
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
            bufferCommands: false,
        };

        await mongoose.connect(MONGODB_URI, options);
        console.log("DB Connected successfully");
    } catch (error) {
        console.error("DB Connection failed:", error);
        // Don't throw error to prevent server crashes in production
        // Instead, we can retry the connection
        setTimeout(ConnectDB, 5000);
    }
}

// Handle connection events
mongoose.connection.on('connected', () => {
    console.log('Mongoose connected to DB');
});

mongoose.connection.on('error', (err) => {
    console.error('Mongoose connection error:', err);
});

mongoose.connection.on('disconnected', () => {
    console.log('Mongoose disconnected');
});

// Handle app termination
process.on('SIGINT', async () => {
    await mongoose.connection.close();
    console.log('Mongoose connection closed through app termination');
    process.exit(0);
});

export { ConnectDB };
