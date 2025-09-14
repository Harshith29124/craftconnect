const speech = require('@google-cloud/speech');
const BusinessAnalysis = require('../models/BusinessAnalysis');

// Lazy import VertexAI to avoid requiring package if not configured
let VertexAI;
try {
  // eslint-disable-next-line global-require
  VertexAI = require('@google-cloud/vertexai').VertexAI;
} catch (e) {
  // Optional; will throw if analyze is used without available package
}

class AIBusinessAnalyzer {
  constructor() {
    this.speechClient = new speech.SpeechClient();
    if (VertexAI) {
      this.vertexAI = new VertexAI({
        project: process.env.GOOGLE_PROJECT_ID,
        location: 'us-central1'
      });
    }
  }

  async analyzeBusinessFromVoice(req, res) {
    try {
      if (!req.file || !req.file.buffer) {
        return res.status(400).json({ error: 'Audio file is required' });
      }

      const transcription = await this.transcribeAudio(req.file.buffer);
      if (!transcription.success) {
        return res.status(500).json({ error: 'Failed to transcribe audio' });
      }

      const businessAnalysis = await this.analyzeBusinessWithVertexAI(transcription.text);
      if (!businessAnalysis.success) {
        return res.status(500).json({ error: 'Failed to analyze business' });
      }

      const analysis = new BusinessAnalysis({
        inputText: transcription.text,
        analysis: businessAnalysis.data,
        timestamp: new Date()
      });
      await analysis.save();

      return res.json({
        success: true,
        transcription: transcription.text,
        analysis: businessAnalysis.data,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      console.error('❌ Analysis error:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  async transcribeAudio(audioBuffer) {
    try {
      const request = {
        audio: { content: audioBuffer.toString('base64') },
        config: {
          encoding: 'WEBM_OPUS',
          sampleRateHertz: 48000,
          languageCode: 'en-US',
          alternativeLanguageCodes: ['hi-IN'],
          enableAutomaticPunctuation: true,
          model: 'latest_short'
        }
      };

      const [response] = await this.speechClient.recognize(request);
      const transcription = (response.results || [])
        .map(result => result.alternatives[0].transcript)
        .join(' ');

      return { success: true, text: transcription };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async analyzeBusinessWithVertexAI(transcript) {
    try {
      if (!this.vertexAI) {
        throw new Error('Vertex AI not configured');
      }

      const model = this.vertexAI.getGenerativeModel({ model: 'gemini-1.5-pro' });
      const prompt = `You are an expert AI business consultant specializing in Indian artisans and traditional crafts. Analyze the following business description and provide comprehensive, culturally-aware insights.\n\nBusiness Description: "${transcript}"\n\nProvide your analysis in the following JSON format:\n{\n  "businessType": "string (pottery, jewelry, textiles, woodcraft, metalwork, embroidery, painting, other)",\n  "businessStage": "string (startup, growing, established)",\n  "culturalHeritage": {\n    "region": "string (e.g., Rajasthan, Gujarat, Kashmir, etc.)",\n    "traditionalTechnique": "string",\n    "historicalSignificance": "string",\n    "uniqueSellingPoint": "string"\n  },\n  "keyProblems": [\n    {\n      "problem": "string",\n      "severity": "high|medium|low",\n      "category": "marketing|operations|sales|digital-presence|pricing|storytelling|distribution|other",\n      "culturalContext": "string (how this relates to traditional artisan challenges)"\n    }\n  ],\n  "actionablePlans": [\n    {\n      "id": "string",\n      "title": "string",\n      "description": "string",\n      "priority": "high|medium|low",\n      "category": "social-media|website|marketing|branding|storytelling|pricing|operations|e-commerce",\n      "estimatedImpact": "high|medium|low",\n      "estimatedTime": "string (e.g., 1-2 weeks, 1 month)",\n      "tools": ["instagram-story", "whatsapp-business", "facebook-marketplace", "youtube-demo", "website-builder", "brand-story", "pricing-calculator"],\n      "culturalTips": "string (specific advice for Indian artisan context)"\n    }\n  ],\n  "marketingFocus": [\n    "digital-presence",\n    "social-media",\n    "storytelling",\n    "customer-engagement",\n    "cultural-heritage",\n    "local-community",\n    "export-opportunities"\n  ],\n  "pricingStrategy": {\n    "currentPricing": "string (assessment)",\n    "recommendations": ["string"],\n    "valueProposition": "string",\n    "targetMarkets": ["local", "national", "international"]\n  },\n  "storytellingOpportunities": [\n    {\n      "storyType": "string (craft-origin, technique-demonstration, family-tradition, cultural-significance)",\n      "platform": "string (instagram-reels, youtube, facebook, website)",\n      "contentIdeas": ["string"],\n      "hashtagSuggestions": ["string"]\n    }\n  ],\n  "quickWins": [\n    "string - immediate actions they can take"\n  ],\n  "longTermGoals": [\n    "string - strategic objectives for growth"\n  ],\n  "digitalTransformation": {\n    "currentLevel": "string (beginner|intermediate|advanced)",\n    "nextSteps": ["string"],\n    "toolsNeeded": ["string"]\n  }\n}\n\nReturn ONLY the JSON object, no additional text. Focus on practical, actionable advice that respects traditional methods while embracing modern opportunities.`;

      const result = await model.generateContent({
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.3,
          maxOutputTokens: 2048,
          responseMimeType: 'application/json'
        }
      });

      const jsonResponse = JSON.parse(result.response.text());
      return { success: true, data: jsonResponse };
    } catch (error) {
      console.error('Vertex AI analysis error:', error);
      return { success: false, error: error.message };
    }
  }
}

module.exports = new AIBusinessAnalyzer();



