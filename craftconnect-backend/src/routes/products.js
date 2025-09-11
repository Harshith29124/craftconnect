const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const vision = require('@google-cloud/vision');
const Product = require('../models/Product');

const router = express.Router();
const visionClient = new vision.ImageAnnotatorClient();

// Configure multer for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/products/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, 'product-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'), false);
    }
  }
});

// Upload product with image analysis
router.post('/upload', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No image provided' });
    }

    const { name, description, price, category } = req.body;

    // Analyze image with Vision AI
    const imageBuffer = fs.readFileSync(req.file.path);
    const [result] = await visionClient.labelDetection({ image: { content: imageBuffer } });

    const labels = (result.labelAnnotations || []).map(label => ({
      description: label.description,
      score: label.score,
      confidence: label.confidence
    }));

    // Create product record
    const product = new Product({
      name,
      description,
      price: parseFloat(price) || 0,
      category: (category || 'other').toLowerCase(),
      imagePath: req.file.filename,
      imageAnalysis: { labels }
    });

    await product.save();

    res.json({ success: true, product, imageAnalysis: { labels } });
  } catch (error) {
    console.error('Product upload error:', error);
    res.status(500).json({ message: 'Failed to upload product', error: error.message });
  }
});

// Get all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find({ isActive: true }).sort({ createdAt: -1 });
    res.json({ success: true, products });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch products', error: error.message });
  }
});

module.exports = router;



