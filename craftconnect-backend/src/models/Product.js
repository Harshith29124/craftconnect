const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: String,
    price: { type: Number, min: 0 },
    category: {
      type: String,
      required: true,
      enum: ['jewelry', 'textiles', 'pottery', 'woodcraft', 'metalwork', 'embroidery', 'painting', 'other']
    },
    imagePath: { type: String, required: true },
    imageAnalysis: {
      labels: [
        {
          description: String,
          score: Number,
          confidence: Number
        }
      ],
      objects: [
        {
          name: String,
          score: Number
        }
      ]
    },
    businessType: { type: String },
    region: { type: String },
    pricingSuggestions: {
      localMarket: {
        min: Number,
        max: Number,
        reasoning: String
      },
      premiumMarket: {
        min: Number,
        max: Number,
        reasoning: String
      },
      exportMarket: {
        min: Number,
        max: Number,
        reasoning: String
      },
      recommendedPrice: Number,
      pricingStrategy: String,
      valueProposition: String
    },
    artisanId: { type: String, default: 'demo-artisan' },
    isActive: { type: Boolean, default: true },
    views: { type: Number, default: 0 },
    likes: { type: Number, default: 0 },
    sales: { type: Number, default: 0 }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Product', productSchema);



