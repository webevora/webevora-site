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
uvicorn app.main:app --reload --port 8000
```
