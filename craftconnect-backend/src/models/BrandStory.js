const mongoose = require('mongoose');

const brandStorySchema = new mongoose.Schema(
  {
    artisanId: { type: String, required: true },
    businessType: { type: String, required: true },
    region: { type: String, required: true },
    traditionalTechnique: { type: String, required: true },
    storyTitle: { type: String, required: true },
    originStory: { type: String, required: true },
    craftJourney: { type: String, required: true },
    culturalSignificance: { type: String, required: true },
    uniqueValue: { type: String, required: true },
    modernRelevance: { type: String, required: true },
    emotionalConnection: { type: String, required: true },
    brandTagline: { type: String, required: true },
    keyMessages: [{ type: String }],
    storytellingTips: [{ type: String }],
    isActive: { type: Boolean, default: true },
    views: { type: Number, default: 0 },
    shares: { type: Number, default: 0 }
  },
  { timestamps: true }
);

module.exports = mongoose.model('BrandStory', brandStorySchema);
