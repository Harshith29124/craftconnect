const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGODB_URL;
    if (!mongoUri) {
      console.error('❌ Missing MONGODB_URI environment variable. Please set it in your .env file.');
      process.exit(1);
    }

    const conn = await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log(` MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(' Database connection error:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;



