# Zomato Clone

React + Vite frontend with an Express, Sequelize, and MySQL backend.

## Setup

### Backend

```bash
cd Backend
npm install
copy .env.example .env
npm start
```

Update `Backend/.env` with your own MySQL `DATABASE_URL`.

### Frontend

```bash
cd project
npm install
copy .env.example .env
npm run dev
```

For local development, `VITE_API_BASE_URL` should usually be `http://localhost:8000`.

For deployment, set `VITE_API_BASE_URL` to your own deployed backend URL.
