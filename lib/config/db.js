const mongoose = require("mongoose");

const ConnectDB = async () => {
    try {
        const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/blog-inclusion-digital';
        
        // Configuración optimizada para Vercel
        const options = {
            maxPoolSize: 10, // Mantener hasta 10 conexiones en el pool
            serverSelectionTimeoutMS: 5000, // Mantener intentando enviar operaciones por 5 segundos
            socketTimeoutMS: 45000, // Cerrar sockets después de 45 segundos de inactividad
            bufferCommands: false, // Deshabilitar mongoose buffering
        };

        await mongoose.connect(MONGODB_URI, options);
        console.log("DB Connected successfully");
    } catch (error) {
        console.error("DB Connection failed:", error);
        throw error;
    }
}

module.exports = { ConnectDB };