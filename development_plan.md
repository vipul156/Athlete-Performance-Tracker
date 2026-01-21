# Athlete Performance Tracker - Development Plan

## Project Overview
**Goal:** Develop a Minimum Viable Product (MVP) for managing athlete profiles, tracking physical test metrics, and visualizing performance via leaderboards.
**Timeline:** ~4-6 Weeks (Estimated)
**Stack:** Next.js (Frontend), Express & Node.js (Backend), MongoDB (Database).

---

## 1. Database Design (MongoDB)
**Strategy:** Normalized schema with references.

### Collections

#### `users` (Coaches)
- `_id`: ObjectId
- `name`: String
- `email`: String (Unique)
- `password_hash`: String
- `role`: String (Enum: 'coach', 'viewer', 'admin')
- `created_at`: Date

#### `athletes`
- `_id`: ObjectId
- `name`: String
- `dob`: Date
- `height`: Number (cm)
- `weight`: Number (kg)
- `created_by`: ObjectId (Ref: users)
- `created_at`: Date

#### `tests` (Test Definitions)
- `_id`: ObjectId
- `name`: String (e.g., "30m Sprint", "Vertical Jump")
- `unit`: String (e.g., "s", "cm")
- `type`: String (Enum: 'lower_is_better', 'higher_is_better')
- `created_at`: Date

#### `scores`
- `_id`: ObjectId
- `athlete_id`: ObjectId (Ref: athletes)
- `test_id`: ObjectId (Ref: tests)
- `value`: Number
- `date`: Date
- `recorded_by`: ObjectId (Ref: users)

---

## 2. Backend Development (Node.js & Express)
**Strategy:** REST API with JWT Authentication.

### Setup & Architecture
- **Server:** Express.js app.
- **Authentication:** JWT (JSON Web Tokens) + Middleware for Role-Based Access Control (RBAC).
- **Validation:** Zod or Joi for request validation.

### Key API Endpoints

#### Authentication
- `POST /api/auth/login`: Authenticate coach/viewer.
- `POST /api/auth/register`: Register new coach.

#### Athletes Management
- `GET /api/athletes`: List all athletes (Pagination + Search).
- `POST /api/athletes`: Create new athlete profile (Coach only).
- `GET /api/athletes/:id`: Get detailed profile + scores history.
- `PUT /api/athletes/:id`: Update components (Coach only).

#### Test & Score Management
- `POST /api/scores`: Submit a test result (Coach only).
- `POST /api/tests`: Define a new test type.

#### Analytics / Leaderboard
- `GET /api/leaderboard`: Returns ranked list.
    - **Logic:** Compute normalized scores (0-100 scale) per test type, then average them.
    - **Optimization:** MongoDB Aggregation pipelines for real-time calculation.

---

## 3. Frontend Development (Next.js & React)
**Strategy:** Next.js (App Router), Tailwind CSS, Shadcn UI components.

### UI/UX Structure

#### Dashboard (Home)
- **Summary Cards:** Total Athletes, Recent Tests, Top Performer.
- **Quick Actions:** "Add Athlete", "New Test Entry".

#### Athlete Management
- **List View:** Table using Shadcn `Table` component.
- **Profile Detail:** Graphs (Recharts) showing progress.

#### Data Entry
- **Forms:** React Hook Form + Zod validation.
- **Input:** Dynamic fields based on Test Type.

#### Leaderboard
- **Display:** Ranked list with gamification badges for Top 3.
- **Filters:** Filter by Test Type or "Overall".

---

## Execution Timeline (4 Weeks)

### Week 1: Foundation & Backend Core
- Setup Repo.
- Initialize MongoDB & Express.
- Implement Auth & User Roles.
- Create basic CRUD APIs for Athletes.

### Week 2: Frontend Core & Data Entry
- Setup Next.js + Tailwind + Shadcn.
- Build Layout (Sidebar, Navbar).
- Implement Athlete List & Add Athlete Forms.

### Week 3: Scoring & Leaderboard
- Implement Score submission APIs & Forms.
- Build the Leaderboard Aggregation Logic.
- Leaderboard UI.

### Week 4: Polish & Deploy
- Add Score Normalization logic.
- UI Polish (Loading states, Toasts).
- Deployment.
