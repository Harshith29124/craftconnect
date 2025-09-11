# CraftConnect

AI-powered artisan marketplace assistant: React + Tailwind frontend, Node.js/Express backend, MongoDB, and Google Cloud AI (Speech-to-Text, Vision, Vertex AI).

## Project Structure

```
craftconnect-frontend/
craftconnect-backend/
```

## Prerequisites

- Node.js 18+
- npm 9+
- MongoDB Atlas connection string
- Google Cloud project with APIs enabled: Speech-to-Text, Vision, Vertex AI

## Backend Setup

1. Configure environment:

Create `craftconnect-backend/.env`:

```
PORT=5000
NODE_ENV=development
MONGODB_URI=<your-mongodb-uri>
GOOGLE_APPLICATION_CREDENTIALS=./config/service-account-key.json
GOOGLE_PROJECT_ID=<your-project-id>
CLIENT_URL=http://localhost:3000
```

Place your Google service account key at `craftconnect-backend/config/service-account-key.json`.

2. Install and run:

```
cd craftconnect-backend
npm install
npm run dev
```

## Frontend Setup

```
cd craftconnect-frontend
npm install
npm start
```

The frontend expects the backend at `http://localhost:5000` and proxies API requests beginning with `/api` (use a dev proxy or run both on same origin via reverse proxy).

## Key Features

- Voice capture and analysis → Speech-to-Text → Vertex AI JSON insights
- Product upload with Vision AI label detection
- Tailwind UI with responsive pages

## Notes

- Ensure CORS `CLIENT_URL` matches your frontend origin
- For production, store uploads on durable storage (e.g., Cloud Storage)



