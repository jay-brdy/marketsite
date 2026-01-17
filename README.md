# MarketSite (Fish Market Demo)

This is a full‑stack practice e‑commerce project inspired by Animal Crossing New Horizon's fish. It includes a Node/Express API, PostgreSQL persistence, authentication, cart, orders, and a static frontend.

This project also uses GitHub’s Speckit. It’s my first time using it, and I’m using it here to learn and get familiar with the workflow.

## Features
- Product catalog with images and descriptions
- Cart add/update/remove via API
- Mock checkout + order history
- Admin orders view

## Tech Stack
- Backend: Node.js, Express, PostgreSQL
- Frontend: Static HTML/CSS/JS (served as static files)

## Project Structure
- backend/ — API server, database schema, seed data
- frontend/ — static site assets
- specs/ — planning and documentation

## Prerequisites
- Node.js
- PostgreSQL

## Setup (First Time)
1. Install backend dependencies:
   - cd backend
   - npm install

2. Create the database:
   - Create a PostgreSQL database named "marketsite" (or update the connection string in the env file).

3. Configure environment variables:
   - Copy backend/.env.example to backend/.env
   - Update DATABASE_URL as needed

4. Apply the schema:
   - Run the SQL in backend/src/db/migrations/001_init.sql

5. Seed demo data:
   - Run the SQL in backend/src/db/seed/seed.sql

## Run Locally
1. Start the API:
   - cd backend
   - npm run dev

2. Serve the frontend (from the repo root):
   - npx serve frontend/src -l 5173

3. Open the site:
   - http://localhost:5173/pages/index.html

## Notes
- Payments are mocked.
- Admin access is controlled by ADMIN_EMAIL in backend/.env.
- Images are loaded from frontend/src/assets/images and referenced by /assets/images/*.webp in the seeded product data.

## Resetting Data
If you need to reset data, re‑run the migration (if needed) and seed scripts in backend/src/db/migrations/001_init.sql and backend/src/db/seed/seed.sql.
