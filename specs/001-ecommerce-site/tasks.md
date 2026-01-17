---

description: "Task list for feature implementation"

---

# Tasks: Animal Crossing Fish Market Showcase

**Input**: Design documents from `/specs/001-ecommerce-site/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/

**Tests**: Not requested in spec; omitted.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [x] T001 Create backend package setup in backend/package.json
- [x] T002 Create frontend base structure in frontend/src/pages/index.html and frontend/src/css/styles.css
- [x] T003 [P] Add backend environment template and config loader in backend/.env.example and backend/src/config.js
- [x] T004 [P] Create frontend JS modules in frontend/src/js/api.js, frontend/src/js/ui.js, frontend/src/js/auth.js, frontend/src/js/cart.js

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

- [x] T005 Create PostgreSQL pool setup in backend/src/db/pool.js
- [x] T006 [P] Add initial schema migration in backend/src/db/migrations/001_init.sql
- [x] T007 [P] Add seed data script in backend/src/db/seed/seed.sql
- [x] T008 Create Express server bootstrap in backend/src/server.js
- [x] T009 [P] Add session middleware in backend/src/middleware/session.js
- [x] T010 [P] Add auth middleware in backend/src/middleware/auth.js
- [x] T011 [P] Add error handler middleware in backend/src/middleware/errorHandler.js
- [x] T012 Create API router index in backend/src/routes/index.js

**Checkpoint**: Foundation ready - user story implementation can now begin

---

## Phase 3: User Story 1 - Explore the store (Priority: P1) 🎯 MVP

**Goal**: Visitors can browse the landing, products, about, and FAQ pages and see 20 fish products with attribution.

**Independent Test**: Open landing page, navigate to products and FAQ pages, verify 20 products render with name/image and attribution visible.

### Implementation for User Story 1

- [x] T013 [P] [US1] Implement products service in backend/src/services/productsService.js
- [x] T014 [P] [US1] Implement products routes in backend/src/routes/products.js
- [x] T015 [P] [US1] Implement FAQ service in backend/src/services/faqService.js
- [x] T016 [P] [US1] Implement FAQ routes in backend/src/routes/faqs.js
- [x] T017 [P] [US1] Build landing page content in frontend/src/pages/index.html
- [x] T018 [P] [US1] Build products page layout with attribution area in frontend/src/pages/products.html
- [x] T019 [P] [US1] Build about page in frontend/src/pages/about.html
- [x] T020 [P] [US1] Build FAQ page in frontend/src/pages/faq.html
- [x] T021 [US1] Wire product/FAQ fetching and rendering in frontend/src/js/api.js and frontend/src/js/ui.js
- [x] T022 [US1] Apply global navigation and bubbly styling in frontend/src/css/styles.css and frontend/src/js/ui.js

**Checkpoint**: User Story 1 is fully functional and testable independently

---

## Phase 4: User Story 2 - Access personal orders (Priority: P2)

**Goal**: Users can register/login, manage a cart, and view personal orders.

**Independent Test**: Register or log in, add items to cart, place a mock order, then view the orders page.

### Implementation for User Story 2

- [x] T023 [P] [US2] Implement user service in backend/src/services/userService.js
- [x] T024 [P] [US2] Implement auth routes in backend/src/routes/auth.js
- [x] T025 [P] [US2] Implement cart service in backend/src/services/cartService.js
- [x] T026 [P] [US2] Implement cart routes in backend/src/routes/cart.js
- [x] T027 [P] [US2] Implement orders service in backend/src/services/ordersService.js
- [x] T028 [P] [US2] Implement orders routes in backend/src/routes/orders.js
- [x] T029 [P] [US2] Build login/register page in frontend/src/pages/login.html
- [x] T030 [P] [US2] Build orders page in frontend/src/pages/orders.html
- [x] T031 [US2] Implement auth UI and session handling in frontend/src/js/auth.js
- [x] T032 [US2] Implement cart and checkout UI in frontend/src/js/cart.js and frontend/src/pages/products.html
- [x] T033 [US2] Wire orders page rendering in frontend/src/js/api.js and frontend/src/js/ui.js

**Checkpoint**: User Stories 1 and 2 are independently functional

---

## Phase 5: User Story 3 - Admin reviews orders (Priority: P3)

**Goal**: Admin users can access a protected admin page and review all orders.

**Independent Test**: Log in as admin and verify the admin orders list is visible; confirm non-admin access is blocked.

### Implementation for User Story 3

- [x] T034 [P] [US3] Implement admin-only middleware in backend/src/middleware/adminOnly.js
- [x] T035 [P] [US3] Implement admin orders route in backend/src/routes/admin.js
- [x] T036 [P] [US3] Build admin orders page in frontend/src/pages/admin.html
- [x] T037 [US3] Wire admin orders UI and access handling in frontend/src/js/ui.js and frontend/src/js/api.js

**Checkpoint**: All user stories are independently functional

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [x] T038 [P] Improve responsive layout and focus styles in frontend/src/css/styles.css
- [x] T039 [P] Add empty/error state UI copy in frontend/src/js/ui.js
- [x] T040 Update setup and run steps in specs/001-ecommerce-site/quickstart.md

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies
- **Foundational (Phase 2)**: Depends on Setup completion
- **User Stories (Phase 3+)**: Depend on Foundational completion
- **Polish (Phase 6)**: Depends on selected user stories being complete

### User Story Dependencies

- **US1 (P1)**: Can start after Foundational
- **US2 (P2)**: Can start after Foundational; integrates with shared auth/cart/orders
- **US3 (P3)**: Can start after Foundational; depends on auth/roles from US2

### Parallel Opportunities

- Phase 1 tasks marked [P] can run in parallel
- Phase 2 tasks marked [P] can run in parallel
- Within each user story, tasks marked [P] can run in parallel across backend/frontend files

---

## Parallel Example: User Story 1

- Task: "Implement products service in backend/src/services/productsService.js"
- Task: "Implement FAQ service in backend/src/services/faqService.js"
- Task: "Build landing page content in frontend/src/pages/index.html"
- Task: "Build products page layout with attribution area in frontend/src/pages/products.html"

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational
3. Complete Phase 3: User Story 1
4. Validate User Story 1 independently

### Incremental Delivery

1. Setup + Foundational
2. US1 → validate
3. US2 → validate
4. US3 → validate
5. Polish
