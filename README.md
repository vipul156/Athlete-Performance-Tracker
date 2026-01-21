# Athlete Performance Tracker

The **Athlete Performance Tracker** is a full-stack web application designed for coaches to manage athletes, track their physical performance metrics, and visualize progress through a competitive leaderboard. It features Role-Based Access Control (RBAC) to distinguish between Coaches (who manage data) and Viewers (who can only view results).

## 🌟 Features

### 🏃 Athlete Management
- **Create Profiles**: Coaches can add new athletes with details like Name, DOB, Height, and Weight.
- **View All**: A searchable/sortable list of all athletes in the system.

### 📊 Performance Tracking
- **Record Scores**: Input results for standardized tests (e.g., 30m Sprint, Vertical Jump, Bench Press).
- **Test Definitions**: Pre-configured tests with units (seconds, cm, kg) and logic (whether lower or higher is better).
- **Score Normalization**: Automatically calculates a relative "Points" score (0-100) based on predefined performance standards.

### 🏆 Leaderboard & Gamification
- **Live Rankings**: view athletes ranked by their **Total Points** across all tests.
- **Badges**: Automatic badge assignment based on performance levels:
  - 🟡 **Elite**: Average > 90 pts
  - ⚪ **Pro**: Average > 75 pts
  - 🟠 **Rookie**: Average > 50 pts
  - 🔴 **Iron Athlete**: Total Points > 300
- **Detailed Calibration**: Shows both the raw score (e.g., "3.5 s") and the normalized points (e.g., "97 pts").

### 🔐 Security & Roles
- **Authentication**: Secure Login and Registration using JWT (JSON Web Tokens).
- **Roles**:
  - **Coach**: Full Access (Add Athletes, Record Scores, View Leaderboard).
  - **Viewer**: Read-Only Access (View Athletes, View Leaderboard).

---

## 🛠 Technology Stack

### Frontend
- **Framework**: [Next.js 14+](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **State/Form**: React Hook Form, Zod

### Backend
- **Runtime**: [Node.js](https://nodejs.org/) & [Express.js](https://expressjs.com/)
- **Database**: [MongoDB](https://www.mongodb.com/) (Mongoose ODM)
- **Authentication**: `jsonwebtoken` (JWT) & `bcryptjs`

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- VS Code or any code editor
- MongoDB (Local instance or Atlas URI)

### 1. Backend Setup
The backend handles the API, database connection, and authentication logic.

```bash
cd backend

# Install dependencies
npm install

# Setup Environment Variables
# Create a .env file in the backend folder with:
# NODE_ENV=development
# PORT=5000
# MONGO_URI=mongodb://localhost:27017/athlete-tracker
# JWT_SECRET=your_super_secret_key

# Database Seeding (Optional)
# Populates DB with default Tests, a Coach, a Viewer, and sample Athletes/Scores
node seeder.js

# Start Server
npm run dev
```
*Server runs on `http://localhost:5000`*

### 2. Frontend Setup
The frontend is the user interface built with Next.js.

```bash
cd frontend

# Install dependencies
npm install

# Start Development Server
npm run dev
```
*App opens at `http://localhost:3000`*

---

## 📖 Usage Guide

### Registration & Login
1. Navigate to `/register`.
2. Create an account. select **Coach** to have full access, or **Viewer** for read-only access.
3. Pre-seeded accounts (password: `password123`):
   - **Coach**: `coach@example.com`
   - **Viewer**: `viewer@example.com`

### Managing Data (Coach Only)
- **Add Athlete**: Go to the **Athletes** page and click the "Add Athlete" button.
- **Record Score**: Go to the **Dashboard** or **Record Score** nav link. Select an athlete, a test type (e.g., Vertical Jump), and enter the value.

### Viewing Results
- **Leaderboard**: Navigate to **Leaderboard** to see the matrix of scores.
  - Rows are sorted by **Total Points**.
  - Badges are displayed next to the athlete's name.
  - Each cell shows the raw performance and the normalized point value.

---

## 📂 Project Structure

```
athlete-performance-tracker/
├── backend/                # Express API
│   ├── config/            # DB connection
│   ├── controllers/       # Route logic (Auth, Athlete, Score)
│   ├── middleware/        # Auth & Error handling
│   ├── models/            # Mongoose Schemas
│   ├── routes/            # API Route definitions
│   ├── server.js          # Entry point
│   └── seeder.js          # Data population script
│
└── frontend/               # Next.js App
    ├── app/               # App Router pages
    │   ├── athletes/      # Athlete list & add pages
    │   ├── leaderboard/   # Leaderboard page
    │   ├── login/         # Auth pages
    │   └── scores/        # Score submission page
    ├── components/        # Reusable UI components
    │   └── ui/            # shadcn/ui components
    └── lib/               # Utilities (API client, class merger)
```

## 🔮 Future Improvements
- **Team Management**: Group athletes into teams or squads.
- **Progress Analytics**: Charts showing an athlete's improvement over time.
- **Custom Tests**: Allow coaches to define their own test metrics and normalization standards from the UI.
- **Export**: Export leaderboard data to CSV/PDF.
