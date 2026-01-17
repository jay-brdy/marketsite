# Research Summary: Animal Crossing Fish Market Showcase

## Decision 1: Authentication and sessions
- **Decision**: Use server-side authentication with bcrypt password hashing and a session stored in PostgreSQL, backed by an HTTP-only cookie.
- **Rationale**: Enables persistent accounts and secure role checks for orders/admin in a full-stack app.
- **Alternatives considered**: Stateless JWT (rejected to keep revocation and session management simple); client-only auth (rejected due to new dynamic requirement).

## Decision 2: Data persistence
- **Decision**: Store users, products, carts, and orders in PostgreSQL using node-postgres (pg).
- **Rationale**: Meets the requirement for persistent data and enables admin reporting.
- **Alternatives considered**: In-memory storage (rejected due to persistence requirement); file-based JSON (rejected for multi-user consistency).

## Decision 3: Fish content sourcing
- **Decision**: Reuse fandom wiki text/images only when license terms allow it, and store/display attribution and license metadata per asset.
- **Rationale**: Ensures compliance with third-party licensing while meeting the requirement to reuse fandom content.
- **Alternatives considered**: Original descriptions and placeholder images (kept as fallback if any asset lacks a compatible license).

## Decision 4: Payments
- **Decision**: Mock payments server-side by creating orders without real payment processing.
- **Rationale**: Keeps scope learning-focused while supporting checkout flow and order history.
- **Alternatives considered**: Integrating a real payment provider (rejected for scope and complexity).

## Decision 5: Responsiveness approach
- **Decision**: Mobile-first layout with CSS grid, flexible cards, and fluid typography.
- **Rationale**: Meets the requirement for responsive, mobile-ready design while keeping CSS simple.
- **Alternatives considered**: CSS frameworks (rejected to keep styling minimal and custom).
