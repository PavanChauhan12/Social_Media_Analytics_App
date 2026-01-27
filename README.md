# Social Media Analytics

A full-stack web application for analyzing Reddit data, including sentiment analysis, trending topics, and key performance indicators (KPIs). Built with Node.js/Express (backend) and React/Vite/Tailwind (frontend).

## Features
- **Data Ingestion:** Collect Reddit posts and comments for analysis
- **Data Cleaning:** Preprocess and clean raw data
- **Sentiment Analysis:** Analyze sentiment trends over time
- **Topic Modeling:** Discover trending topics
- **KPIs Dashboard:** Visualize metrics and insights

## Tech Stack
- **Frontend:** React, Vite, Tailwind CSS, Axios, ApexCharts, Recharts
- **Backend:** Node.js, Express, MongoDB
- **Libraries:** Natural (NLP), Vader Sentiment, Stopword

## Prerequisites
- Node.js (v16+ recommended)
- MongoDB (local or Atlas)

## Environment Setup
Create a `.env` file in the root directory with:
```
MONGO_URI=your_mongodb_connection_string
MONGO_DB_NAME=Social_Media_Analytics
PORT=5000
NODE_ENV=development
LOG_LEVEL=info
```

For the frontend, create `.env` in `frontend/` with:
```
VITE_API_BASE_URL=http://localhost:5000/api
```

## Getting Started

### Backend Setup
1. Navigate to backend folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure your database in `config/db.js` (uses .env).
4. Start the backend server:
   ```bash
   npm run dev
   ```

### Frontend Setup
1. Navigate to frontend folder:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the frontend dev server:
   ```bash
   npm run dev
   ```

## Usage
- Access the dashboard at `http://localhost:3000` (frontend dev server).
- Use the Ingest Panel to collect Reddit data.
- View analytics filtered by subreddit.

## Features
- Data Ingestion from Reddit API
- Sentiment Analysis using Vader
- Topic Modeling with LDA
- Interactive Charts and KPIs
- Responsive UI with Tailwind CSS

## Usage
- Access the dashboard at `http://localhost:3000` (or the port specified in frontend).
- Use the UI to view analytics, sentiment charts, trending topics, and top posts.

## Contributing
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/YourFeature`)
3. Commit your changes
4. Push to the branch (`git push origin feature/YourFeature`)
5. Open a pull request

## License
This project is licensed under the MIT License.

## Authors
- PAVAN CHAUHAN
- pavan_dev, PavanChauhan12

## Acknowledgements
- Reddit API
- Open Source Libraries
