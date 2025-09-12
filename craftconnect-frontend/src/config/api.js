const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export const API_ENDPOINTS = {
  AI_ANALYSIS: `${API_BASE_URL}/api/ai-analysis/analyze-voice`,
  PRODUCTS: `${API_BASE_URL}/api/products`,
  UPLOAD: `${API_BASE_URL}/api/products/upload`
};

export default API_BASE_URL;
