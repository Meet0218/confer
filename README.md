# Confer

A video-calling application with real-time drawing, AI transcription, and summaries.

## Tech Stack

- Frontend: React + Vite + TypeScript (`client/`)
- Backend: Node.js + Express + Socket.io (`server/`)
- AI Service: Python + FastAPI (`ai-service/`)
- Database: PostgreSQL (via Sequelize)
- PubSub/Cache: Redis

## Prerequisites

- Node.js (v18+ recommended)
- Python (3.11+ recommended)
- PostgreSQL running locally or remotely
- Redis running locally or remotely

## Setup Instructions

### 1. Install Dependencies

From the root of the project, install the Node workspaces:

```bash
npm install
```

### 2. Set up Python Environment

Navigate to `ai-service/`, create a virtual environment, and install dependencies:

```bash
cd ai-service
python -m venv venv

# On Windows:
venv\Scripts\activate
# On Mac/Linux:
source venv/bin/activate

pip install -r requirements.txt
cd ..
```

### 3. Environment Variables

1. Copy the root `.env.example` to `server/.env` and update the values (especially `DATABASE_URL` and `REDIS_URL`).
2. Copy `client/.env.example` to `client/.env` (no changes needed usually for local dev).
3. Copy the relevant AI keys to `ai-service/.env`.

### 4. Database Setup

Make sure PostgreSQL is running, and create a database named `confer` (or whatever matches your `DATABASE_URL`).
Run the Sequelize migrations from the root:

```bash
npm run migrate
```

### 5. Start Development Servers

From the root directory, start all three services concurrently:

```bash
npm run dev
```

- Client: http://localhost:5173
- Server API: http://localhost:3000
- AI Service API: http://localhost:8000
