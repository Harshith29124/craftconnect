const express = require('express');
const cors = require('cors');
// Initialize environment variables early
require('./config/env');

// Route imports
const aiAnalysisRoutes = require('./routes/ai-analysis');
const productRoutes = require('./routes/products');

const app = express();

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Static files for uploads
app.use('/uploads', express.static('uploads'));

// API Routes
app.use('/api/ai-analysis', aiAnalysisRoutes);
app.use('/api/products', productRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'CraftConnect API is running',
    timestamp: new Date().toISOString()
  });
});

// Error handling middleware
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  // Do not leak internals in production
  console.error(err.stack);
  res.status(500).json({
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : {}
  });
});

module.exports = app;



