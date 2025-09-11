const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: String,
    price: { type: Number, min: 0 },
    category: {
      type: String,
      required: true,
      enum: ['jewelry', 'textiles', 'pottery', 'woodcraft', 'other']
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
    isActive: { type: Boolean, default: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Product', productSchema);



