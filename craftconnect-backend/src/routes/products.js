const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const vision = require('@google-cloud/vision');
const Product = require('../models/Product');

// Lazy import VertexAI for pricing suggestions
let VertexAI;
try {
  // eslint-disable-next-line global-require
  VertexAI = require('@google-cloud/vertexai').VertexAI;
} catch (e) {
  // Optional; will throw if analyze is used without available package
}

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

    const { name, description, price, category, businessType, region } = req.body;

    // Analyze image with Vision AI
    const imageBuffer = fs.readFileSync(req.file.path);
    const [result] = await visionClient.labelDetection({ image: { content: imageBuffer } });

    const labels = (result.labelAnnotations || []).map(label => ({
      description: label.description,
      score: label.score,
      confidence: label.confidence
    }));

    // AI-powered categorization if not provided
    let finalCategory = category;
    if (!category || category === 'other') {
      finalCategory = await categorizeProductWithAI(labels, businessType);
    }

    // AI-powered pricing suggestions
    let pricingSuggestions = null;
    if (!price || price === '0' || price === '') {
      pricingSuggestions = await generatePricingSuggestions({
        labels,
        businessType,
        region,
        category: finalCategory,
        description
      });
    }

    // Create product record
    const product = new Product({
      name,
      description,
      price: parseFloat(price) || 0,
      category: (finalCategory || 'other').toLowerCase(),
      imagePath: req.file.filename,
      imageAnalysis: { labels },
      businessType,
      region,
      pricingSuggestions
    });

    await product.save();

    res.json({ 
      success: true, 
      product, 
      imageAnalysis: { labels },
      pricingSuggestions,
      aiCategorySuggestion: finalCategory !== category ? finalCategory : null
    });
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

// AI helper functions
async function categorizeProductWithAI(labels, businessType) {
  try {
    if (!VertexAI) {
      return 'other'; // Fallback if Vertex AI not available
    }

    const vertexAI = new VertexAI({
      project: process.env.GOOGLE_PROJECT_ID,
      location: 'us-central1'
    });

    const model = vertexAI.getGenerativeModel({ model: 'gemini-1.5-pro' });
    
    const labelText = labels.map(l => l.description).join(', ');
    const prompt = `Analyze this product image description and categorize it for an Indian artisan marketplace.

Image labels: ${labelText}
Business type: ${businessType || 'traditional craft'}

Categorize into ONE of these categories: jewelry, textiles, pottery, woodcraft, metalwork, embroidery, painting, other

Consider the traditional Indian craft context. Return ONLY the category name.`;

    const result = await model.generateContent({
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.1,
        maxOutputTokens: 50
      }
    });

    const category = result.response.text().toLowerCase().trim();
    const validCategories = ['jewelry', 'textiles', 'pottery', 'woodcraft', 'metalwork', 'embroidery', 'painting', 'other'];
    
    return validCategories.includes(category) ? category : 'other';
  } catch (error) {
    console.error('AI categorization error:', error);
    return 'other';
  }
}

async function generatePricingSuggestions({ labels, businessType, region, category, description }) {
  try {
    if (!VertexAI) {
      return null; // Fallback if Vertex AI not available
    }

    const vertexAI = new VertexAI({
      project: process.env.GOOGLE_PROJECT_ID,
      location: 'us-central1'
    });

    const model = vertexAI.getGenerativeModel({ model: 'gemini-1.5-pro' });
    
    const labelText = labels.map(l => l.description).join(', ');
    const prompt = `You are an expert pricing consultant for Indian traditional crafts. Provide pricing suggestions for this artisan product.

Product details:
- Image labels: ${labelText}
- Business type: ${businessType || 'traditional craft'}
- Region: ${region || 'India'}
- Category: ${category || 'handicraft'}
- Description: ${description || 'Handcrafted traditional item'}

Consider:
- Traditional craft value and heritage
- Regional pricing variations in India
- Material costs and time investment
- Market positioning (local vs premium)
- Export potential

Provide pricing in Indian Rupees (₹) in this JSON format:
{
  "localMarket": {
    "min": number,
    "max": number,
    "reasoning": "string"
  },
  "premiumMarket": {
    "min": number,
    "max": number,
    "reasoning": "string"
  },
  "exportMarket": {
    "min": number,
    "max": number,
    "reasoning": "string"
  },
  "recommendedPrice": number,
  "pricingStrategy": "string",
  "valueProposition": "string"
}

Return ONLY the JSON object.`;

    const result = await model.generateContent({
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.3,
        maxOutputTokens: 1024,
        responseMimeType: 'application/json'
      }
    });

    const pricingData = JSON.parse(result.response.text());
    return pricingData;
  } catch (error) {
    console.error('AI pricing error:', error);
    return null;
  }
}

module.exports = router;



