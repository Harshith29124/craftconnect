// Load environment variables early from centralized loader
require('./src/config/env');

const app = require('./src/app');
const connectDB = require('./src/config/database');

const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  if (process.env.CLIENT_URL) {
    console.log(`📱 Frontend URL: ${process.env.CLIENT_URL}`);
  }
  if (process.env.GOOGLE_PROJECT_ID) {
    console.log(`🤖 Google Cloud Project: ${process.env.GOOGLE_PROJECT_ID}`);
  }
});



