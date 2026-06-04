const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI === 'your_mongodb_connection_string_here' 
      ? 'mongodb://localhost:27017/sadabharat' 
      : (process.env.MONGO_URI || 'mongodb://localhost:27017/sadabharat');
      
    const conn = await mongoose.connect(mongoUri);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
