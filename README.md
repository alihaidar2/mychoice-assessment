# myChoice Assessment

Building on the given Full-Stack Coding Task, this repository delivers:

- **Backend** in **Python 3.10** with **Django 5.2** & **Django REST Framework**  
  - CRUD endpoints (`GET /api/items/`, `POST`, `PATCH /{id}/`, `GET /{id}/`) as specified  
  - `Item` model with `name`, `group` (Primary/Secondary `TextChoices`), `created_at`, `updated_at`  
  - Database-level `UniqueConstraint` on `(name, group)` to enforce per-group uniqueness  
  - Proper HTTP status codes (201, 200, 400, 404) and error handling  
  - Automated **pytest-django** tests covering create, duplicate-rejection, and update flows  

- **Frontend** in **TypeScript**, **Vite**, and **React**  
  - **Chakra UI** for styled, accessible components and a light/dark theme toggle  
  - **React-Query** for data fetching/invalidation of list/detail/edit flows  
  - **Zod** + **react-hook-form** for schema-driven form validation in Create/Edit modals  
  - **React Router** for `/`, `/:id` (detail), and `/:id/edit` routes  
  - Clickable IDs, in-modal creation, pre-filled edit forms—full end-to-end UX  

- **DevOps & Environment**  
  - **Hybrid setup**: local SQLite by default, or one-command Docker Compose spins up PostgreSQL, Django, and Vite containers  
  - Clear `.env.example`, `docker-compose.yml`, `backend/Dockerfile`, and `frontend/Dockerfile`  
  - README instructions for both Docker & native runs  

> **Extra polish**:  
> • Inline form error messages, skeleton loaders & hover animations (via Framer Motion)  
> • Custom Chakra theme (fonts, colors, global styles) and responsive mobile card view  
> • Git-tracked migrations, clean commit history, and comprehensive setup documentation  

This fully addresses the must-haves—Python, TypeScript/JavaScript, React, Git, PostgreSQL (via Docker), Django & DRF, Chakra UI—while showcasing extra attention to UX and developer experience.  

---

## 📦 Docker (recommended)

> Spins up three containers—PostgreSQL, Django, and Vite/React—in one command.  
> Django will run migrations against Postgres, and React will proxy API calls into the Django container.  
> No local installs of Python, Node, or Postgres required beyond Docker.

### Prerequisites

- Docker Desktop (or Docker Engine & Compose plugin)

### Steps

1. **Copy the example env**  
   ```bash
   cp .env.example .env
   ```
2. **Launch the stack**  
   ```bash
   docker compose up --build
   ```
3. **Browse**  
   - Frontend → `http://localhost:5173`  
   - API (JSON) → `http://localhost:8000/api/items/`  

When you’re done, stop & clean resources with:  
```bash
docker compose down --volumes
```

---

## 🏃 Local (no Docker)

> Runs Django locally against a SQLite database (`db.sqlite3`) and Vite locally for React.

### Prerequisites

- Python ≥ 3.10  
- Node.js ≥ 18 & npm  
- Git  

### Backend (SQLite)

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate           # macOS/Linux
# .venv\Scripts\Activate.ps1       # Windows PowerShell

pip install -r requirements.txt
python manage.py migrate            # creates db.sqlite3
python manage.py runserver          # serves at http://localhost:8000
```

### Frontend (Vite + React)

_In a separate terminal:_

```bash
cd frontend
npm install
npm run dev -- --host              # serves at http://localhost:5173
```

> The React app proxies `/api` to your Django server on port 8000.  

---

## 🔀 Database modes

- **Docker mode** → Django migrates into **PostgreSQL** (container `db:5432`)  
- **Local mode** → Django uses **SQLite** (`backend/db.sqlite3`)  

All application code (models, serializers, viewsets) is ORM‐agnostic—your logic works identically against both databases.

---

## ✅ What to Expect

- **Create**, **List**, **Detail**, and **Edit** items end‐to‐end  
- Unique per‐group item names enforced at the database level  
- Clean UX with Chakra UI, React Query for data fetching & mutations  
- Zod + react-hook-form for validation  
- Fully documented commits and automated tests for backend rules  

---

## 📬 Feedback

If any step fails or you run into issues, please drop a note here or open an issue. Enjoy exploring the code! 😊  
