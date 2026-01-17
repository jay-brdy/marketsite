# Quickstart: Animal Crossing Fish Market Showcase

## Overview
This feature delivers a responsive, full-stack demo storefront with authentication, cart, and orders.

## Run Locally
- Create a PostgreSQL database and apply migrations in backend/src/db/migrations/001_init.sql.
- Seed demo data using backend/src/db/seed/seed.sql.
- Start the backend API and connect it to PostgreSQL.
- Serve the frontend files (static hosting) and point API calls to the backend base URL.

## Demo Accounts
- Register a user or log in with seeded demo credentials.
- Admin users can access the admin orders page.

## Data Sources
- Products are seeded from fandom wiki text/images where license terms allow, with stored attribution and license metadata.
- FAQs are stored in the database.

## Acceptance Smoke Test
1. Open the landing page and navigate to Products to see 20 items.
2. Register or log in.
3. Add items to cart and place a mock order.
4. View Orders as a user.
5. Log in as admin and view Admin Orders.
