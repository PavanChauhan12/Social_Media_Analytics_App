# Social Media Analytics

A full-stack web application for analyzing Reddit data, including sentiment analysis, trending topics, and key performance indicators (KPIs). Built with Node.js/Express (backend) and React/Vite/Tailwind (frontend).

## Features
- **Data Ingestion:** Collect Reddit posts and comments for analysis
- **Data Cleaning:** Preprocess and clean raw data
- **Sentiment Analysis:** Analyze sentiment trends over time
- **Topic Modeling:** Discover trending topics
- **KPIs Dashboard:** Visualize metrics and insights

## Tech Stack
- **Frontend:** React, Vite, Tailwind CSS
- **Backend:** Node.js, Express
- **Database:** (Add your DB, e.g., MongoDB)

## Folder Structure
```
Social_Media_Analytics/
├── backend/
│   ├── app.js
│   ├── server.js
│   ├── config/
│   ├── controllers/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── services/
│   └── utils/
├── frontend/
│   ├── src/
│   ├── public/
│   ├── index.html
│   ├── vite.config.js
│   └── ...
├── package.json
└── README.md
```

## Getting Started

### Prerequisites
- Node.js (v16+ recommended)
- npm or yarn

### Backend Setup
1. Navigate to backend folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure your database in `config/db.js`.
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

### Environment Variables
- Add any required environment variables in `.env` files for both backend and frontend as needed.

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
