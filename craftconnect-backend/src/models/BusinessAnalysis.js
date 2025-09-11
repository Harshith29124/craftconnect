const mongoose = require('mongoose');

const businessAnalysisSchema = new mongoose.Schema(
  {
    inputText: { type: String, required: true },
    analysis: {
      businessType: String,
      businessStage: String,
      keyProblems: [
        {
          problem: String,
          severity: String,
          category: String
        }
      ],
      actionablePlans: [
        {
          id: String,
          title: String,
          description: String,
          priority: String,
          category: String,
          estimatedImpact: String,
          tools: [String]
        }
      ],
      marketingFocus: [String],
      quickWins: [String]
    },
    timestamp: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

module.exports = mongoose.model('BusinessAnalysis', businessAnalysisSchema);



