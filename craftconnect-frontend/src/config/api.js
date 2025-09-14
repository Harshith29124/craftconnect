const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export const API_ENDPOINTS = {
  AI_ANALYSIS: `${API_BASE_URL}/api/ai-analysis/analyze-voice`,
  PRODUCTS: `${API_BASE_URL}/api/products`,
  UPLOAD: `${API_BASE_URL}/api/products/upload`,
  STORYTELLING: {
    GENERATE_BRAND_STORY: `${API_BASE_URL}/api/storytelling/generate-brand-story`,
    GENERATE_SOCIAL_CONTENT: `${API_BASE_URL}/api/storytelling/generate-social-content`,
    SAVE_BRAND_STORY: `${API_BASE_URL}/api/storytelling/save-brand-story`,
    SAVE_SOCIAL_CONTENT: `${API_BASE_URL}/api/storytelling/save-social-content`,
    GET_BRAND_STORIES: `${API_BASE_URL}/api/storytelling/brand-stories`,
    GET_SOCIAL_CONTENT: `${API_BASE_URL}/api/storytelling/social-content`
  },
  HEALTH: `${API_BASE_URL}/api/health`
};

export default API_BASE_URL;
