// Centralized environment variable loader
// Load as early as possible in the app lifecycle
// Supports NODE_ENV-specific files if present (e.g., .env.development)

const path = require('path');
const fs = require('fs');

// Load base .env
require('dotenv').config();

// Optionally load environment-specific file
const currentEnv = process.env.NODE_ENV;
if (currentEnv) {
  const envFile = path.resolve(process.cwd(), `.env.${currentEnv}`);
  if (fs.existsSync(envFile)) {
    require('dotenv').config({ path: envFile });
  }
}

module.exports = {};


