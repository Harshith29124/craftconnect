const mongoose = require('mongoose');

const socialMediaContentSchema = new mongoose.Schema(
  {
    artisanId: { type: String, required: true },
    platform: { 
      type: String, 
      required: true,
      enum: ['instagram', 'facebook', 'youtube', 'twitter', 'linkedin', 'whatsapp']
    },
    contentType: { 
      type: String, 
      required: true,
      enum: ['post', 'story', 'reel', 'video', 'carousel', 'live']
    },
    caption: { type: String, required: true },
    hashtags: [{ type: String }],
    visualSuggestions: [{ type: String }],
    postingTime: { type: String },
    engagementTactics: [{ type: String }],
    callToAction: { type: String },
    followUpIdeas: [{ type: String }],
    platformSpecificTips: { type: String },
    businessType: { type: String, required: true },
    region: { type: String, required: true },
    traditionalTechnique: { type: String, required: true },
    productInfo: {
      name: String,
      description: String,
      price: Number,
      category: String
    },
    status: { 
      type: String, 
      enum: ['draft', 'scheduled', 'published', 'archived'],
      default: 'draft'
    },
    scheduledDate: Date,
    publishedDate: Date,
    engagement: {
      likes: { type: Number, default: 0 },
      comments: { type: Number, default: 0 },
      shares: { type: Number, default: 0 },
      views: { type: Number, default: 0 }
    },
    isActive: { type: Boolean, default: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model('SocialMediaContent', socialMediaContentSchema);
