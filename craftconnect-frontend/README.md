# CraftConnect Frontend

A React-based frontend for the CraftConnect AI-powered marketplace assistant for local artisans.

## Features

- **Voice Analysis**: Record voice input for AI-powered business analysis
- **Product Upload**: Upload and manage product listings with AI categorization
- **Business Insights**: View AI-generated business recommendations and problem identification
- **Growth Opportunities**: Explore tailored growth strategies
- **Artisan Toolkit**: Access tools for digital marketing and business management

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm start
   ```

3. The app will open at `http://localhost:3000`

## Environment Configuration

Create a `.env` file in the root directory with:
```
REACT_APP_API_URL=http://localhost:5000
```

## Browser Requirements

- Modern browser with MediaRecorder support (Chrome, Firefox, Edge)
- Microphone access permissions for voice recording
- JavaScript enabled

## Troubleshooting

### Microphone Permission Issues
If you get a "Permission denied" error:
1. Click the microphone icon in your browser's address bar
2. Select "Allow" for microphone access
3. Refresh the page and try again

### API Connection Issues
Make sure the backend server is running on the configured port (default: 5000).

## Tech Stack

- React 18
- React Router DOM
- Tailwind CSS
- Axios for API calls
- Web APIs for voice recording
