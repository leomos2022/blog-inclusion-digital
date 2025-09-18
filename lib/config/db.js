const mongoose = require("mongoose");

const ConnectDB = async () =>{
    const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/blog-inclusion-digital';
    await mongoose.connect(MONGODB_URI);
    console.log("DB Connected");
}

module.exports = { ConnectDB };