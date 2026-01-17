# Data Model: Animal Crossing Fish Market Showcase

## Entity: Product
- **Purpose**: Fish item shown in the catalog.
- **Fields**:
  - `id` (string, required)
  - `name` (string, required)
  - `description` (string, required, sourced or derived text with attribution)
  - `price` (number, required, >= 0)
  - `size` (string, required; e.g., Small/Medium/Large)
  - `inventory` (number, required, integer >= 0)
  - `imageUrl` (string, optional)
  - `sourceAttribution` (string, optional)
  - `sourceUrl` (string, optional)
  - `license` (string, optional)
- **Validation**:
  - `name` must be unique.
  - `inventory` must be non-negative.

## Entity: User
- **Purpose**: Account holder for login, cart, and orders.
- **Fields**:
  - `id` (string, required)
  - `displayName` (string, required)
  - `email` (string, required, unique)
  - `passwordHash` (string, required)
  - `role` (string, required; `user` or `admin`)
  - `createdAt` (ISO string, required)
  - `lastLoginAt` (ISO string, optional)

## Entity: Order
- **Purpose**: Persistent order history for users/admins.
- **Fields**:
  - `id` (string, required)
  - `userId` (string, required)
  - `items` (array of OrderItem, required)
  - `total` (number, required, >= 0)
  - `status` (string, required; `placed`, `fulfilled`, `cancelled`)
  - `paymentStatus` (string, required; `mocked`, `pending`, `failed`)
  - `createdAt` (ISO string, required)
- **Relationships**:
  - One `User` has many `Order`.
- **State Transitions**:
  - `placed` → `fulfilled` or `cancelled`.

## Entity: Cart
- **Purpose**: Active shopping cart for a user.
- **Fields**:
  - `id` (string, required)
  - `userId` (string, required)
  - `items` (array of CartItem, required)
  - `updatedAt` (ISO string, required)

## Entity: CartItem
- **Purpose**: Line item in a cart.
- **Fields**:
  - `productId` (string, required)
  - `quantity` (number, required, integer >= 1)

## Entity: OrderItem
- **Purpose**: Line item in an order.
- **Fields**:
  - `productId` (string, required)
  - `quantity` (number, required, integer >= 1)
  - `unitPrice` (number, required, >= 0)

## Entity: FAQEntry
- **Purpose**: FAQ content for the FAQ page.
- **Fields**:
  - `id` (string, required)
  - `question` (string, required)
  - `answer` (string, required)
