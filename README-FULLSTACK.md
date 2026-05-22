# Frontend + Backend Setup

## Frontend (React)

```bash
cd frontend
npm install
npm start
```

## Backend (FastAPI)

```bash
cd backend
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
```

1. Copy the example environment file:

```bash
copy .env.example .env
```

2. Update `.env` for PostgreSQL, for example:

```text
WEBENTRA_DATABASE_URL=postgresql://postgres:987654321@localhost:5432/webevora
WEBENTRA_ADMIN_EMAIL=admin@webentra.com
WEBENTRA_ADMIN_PASSWORD=Admin@12345
WEBENTRA_ADMIN_NAME=WebEntra Admin
WEBENTRA_SESSION_COOKIE_NAME=webentra_admin_session
WEBENTRA_SESSION_COOKIE_SECURE=false
WEBENTRA_ADMIN_SESSION_TTL_HOURS=12
WEBENTRA_CORS_ORIGINS=http://localhost:3000,http://127.0.0.1:3000
```

3. Start the API:

```bash
uvicorn app.main:app --reload --host localhost --port 8000
```

> Note: This repository currently deploys the frontend to GitHub Pages. The live admin login and API-powered dashboard require this FastAPI backend to be deployed separately and a matching `REACT_APP_API_BASE_URL` set for the production frontend.
