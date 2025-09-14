const BusinessAnalysis = require('../models/BusinessAnalysis');

// Lazy import VertexAI to avoid requiring package if not configured
let VertexAI;
try {
  // eslint-disable-next-line global-require
  VertexAI = require('@google-cloud/vertexai').VertexAI;
} catch (e) {
  // Optional; will throw if analyze is used without available package
}

class AIStoryteller {
  constructor() {
    if (VertexAI) {
      this.vertexAI = new VertexAI({
        project: process.env.GOOGLE_PROJECT_ID,
        location: 'us-central1'
      });
    }
  }

  async generateBrandStory(req, res) {
    try {
      const { businessType, region, traditionalTechnique, targetAudience = 'general' } = req.body;

      if (!businessType || !region || !traditionalTechnique) {
        return res.status(400).json({ error: 'Business type, region, and traditional technique are required' });
      }

      const brandStory = await this.createBrandStoryWithAI({
        businessType,
        region,
        traditionalTechnique,
        targetAudience
      });

      if (!brandStory.success) {
        return res.status(500).json({ error: 'Failed to generate brand story' });
      }

      return res.json({
        success: true,
        story: brandStory.data,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      console.error('❌ Story generation error:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  async generateSocialMediaContent(req, res) {
    try {
      const { 
        businessType, 
        region, 
        traditionalTechnique, 
        platform = 'instagram',
        contentType = 'post',
        productInfo = null
      } = req.body;

      if (!businessType || !region || !traditionalTechnique) {
        return res.status(400).json({ error: 'Business type, region, and traditional technique are required' });
      }

      const content = await this.createSocialMediaContentWithAI({
        businessType,
        region,
        traditionalTechnique,
        platform,
        contentType,
        productInfo
      });

      if (!content.success) {
        return res.status(500).json({ error: 'Failed to generate social media content' });
      }

      return res.json({
        success: true,
        content: content.data,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      console.error('❌ Content generation error:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  async createBrandStoryWithAI({ businessType, region, traditionalTechnique, targetAudience }) {
    try {
      if (!this.vertexAI) {
        throw new Error('Vertex AI not configured');
      }

      const model = this.vertexAI.getGenerativeModel({ model: 'gemini-1.5-pro' });
      const prompt = `You are an expert brand storyteller specializing in Indian traditional crafts and artisan heritage. Create a compelling brand story for a ${businessType} artisan from ${region} who practices ${traditionalTechnique}.

Target audience: ${targetAudience}

Create a brand story that includes:

1. **Origin Story** - The traditional roots and family heritage
2. **Craft Journey** - How the artisan learned and mastered their craft
3. **Cultural Significance** - The historical and cultural importance of their work
4. **Unique Value** - What makes their creations special
5. **Modern Relevance** - How traditional techniques meet contemporary needs
6. **Emotional Connection** - The heart and soul behind each piece

Format the response as JSON:
{
  "storyTitle": "string",
  "originStory": "string (2-3 sentences)",
  "craftJourney": "string (3-4 sentences)",
  "culturalSignificance": "string (2-3 sentences)",
  "uniqueValue": "string (2-3 sentences)",
  "modernRelevance": "string (2-3 sentences)",
  "emotionalConnection": "string (2-3 sentences)",
  "brandTagline": "string (catchy, memorable)",
  "keyMessages": ["string", "string", "string"],
  "storytellingTips": ["string", "string", "string"]
}

Make it authentic, culturally rich, and emotionally compelling. Focus on the artisan's passion, tradition, and the unique beauty of their craft.`;

      const result = await model.generateContent({
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 2048,
          responseMimeType: 'application/json'
        }
      });

      const jsonResponse = JSON.parse(result.response.text());
      return { success: true, data: jsonResponse };
    } catch (error) {
      console.error('Vertex AI story generation error:', error);
      return { success: false, error: error.message };
    }
  }

  async createSocialMediaContentWithAI({ businessType, region, traditionalTechnique, platform, contentType, productInfo }) {
    try {
      if (!this.vertexAI) {
        throw new Error('Vertex AI not configured');
      }

      const model = this.vertexAI.getGenerativeModel({ model: 'gemini-1.5-pro' });
      
      const productContext = productInfo ? 
        `Product: ${productInfo.name || 'Handcrafted Item'}. Description: ${productInfo.description || 'Beautiful traditional craft'}. Price: ${productInfo.price || 'Available on inquiry'}.` : 
        '';

      const prompt = `You are a social media expert specializing in promoting Indian traditional crafts and artisan businesses. Create engaging ${contentType} content for ${platform} for a ${businessType} artisan from ${region} who practices ${traditionalTechnique}.

${productContext}

Platform: ${platform}
Content Type: ${contentType}

Create content that includes:
1. Caption text (engaging, culturally rich, includes relevant hashtags)
2. Visual suggestions (what to photograph/film)
3. Hashtag strategy (mix of trending and niche craft hashtags)
4. Posting time recommendations
5. Engagement tactics

Format as JSON:
{
  "caption": "string (engaging caption with emojis and line breaks)",
  "visualSuggestions": ["string", "string", "string"],
  "hashtags": ["string", "string", "string"],
  "postingTime": "string (recommended time)",
  "engagementTactics": ["string", "string"],
  "callToAction": "string",
  "followUpIdeas": ["string", "string"],
  "platformSpecificTips": "string (specific to ${platform})"
}

Make it authentic, culturally sensitive, and optimized for ${platform} algorithms. Include relevant Indian craft hashtags and appeal to both local and international audiences interested in traditional crafts.`;

      const result = await model.generateContent({
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.6,
          maxOutputTokens: 2048,
          responseMimeType: 'application/json'
        }
      });

      const jsonResponse = JSON.parse(result.response.text());
      return { success: true, data: jsonResponse };
    } catch (error) {
      console.error('Vertex AI content generation error:', error);
      return { success: false, error: error.message };
    }
  }
}

module.exports = new AIStoryteller();
