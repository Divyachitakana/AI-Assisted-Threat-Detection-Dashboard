# AI-Assisted Threat Detection Dashboard — Backend

FastAPI backend for the dashboard. Serves realistic, seeded cybersecurity
data with response shapes that match the frontend's TypeScript types
(`frontend/src/types/index.ts`) field-for-field via camelCase JSON aliasing,
so the React app only needed its service layer (`src/services/*.ts`)
repointed from mock functions to Axios calls — no component, hook, or type
changes.

## Quickstart

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate        # Windows: .venv\Scripts\activate

pip install -r requirements.txt

uvicorn app.main:app --reload    # http://localhost:8000
```

On first startup the app creates `threat_dashboard.db` (SQLite) and seeds it
automatically (`AUTO_SEED=true` by default) with 64 alerts, ~21 incidents,
10 assets, 12 threat-origin countries, AI insights, notifications, and two
reports — all internally consistent (same analysts, same MITRE mappings,
same asset names referenced across tables).

- Interactive API docs: **http://localhost:8000/docs**
- Health check: **http://localhost:8000/health**

Then, in a second terminal, run the frontend as usual:

```bash
cd frontend
npm install
npm run dev                      # http://localhost:5173
```

The Vite dev server proxies `/api/*` to `http://localhost:8000/api/*`
(see `frontend/vite.config.ts`), so no frontend env config is needed.

## Configuration

All settings live in `app/config.py` and are overridable via a `.env` file
(copy `.env.example`). Nothing beyond the defaults is required for local
development.

## Project layout

```
backend/
├── app/
│   ├── main.py            FastAPI app: CORS, routers, startup seeding, error handling
│   ├── config.py          Settings (env-driven), incl. unused GCP placeholders
│   ├── database.py        SQLAlchemy engine/session, init_db()
│   ├── dependencies.py    DI providers (get_db)
│   │
│   ├── routers/           HTTP layer only — parses request, calls a service, returns a schema
│   ├── services/          Business logic — orchestrates repositories + ml modules
│   ├── repositories/      Data access only — SQLAlchemy queries, no business logic
│   ├── models/             SQLAlchemy ORM models (the tables)
│   ├── schemas/            Pydantic request/response models (the JSON contract)
│   ├── ml/                  Placeholder AI/ML modules (see below)
│   ├── seed/                Reference data + seed_database()
│   └── utils/               Logging, pagination dependency, custom exceptions
│
├── requirements.txt
├── .env.example
└── README.md
```

This is a standard **clean/layered architecture**: routers never touch the
database directly, services never know they're being called over HTTP, and
repositories never contain business rules. Swapping SQLite for Cloud SQL,
or a repository's local query for a BigQuery call, only touches that one
file.

## API reference

All routes are mounted under `/api`.

| Method | Path | Purpose |
|---|---|---|
| GET | `/api/dashboard` | Overview metrics + severity distribution + attack trend + recent threats + AI insights, bundled for the Dashboard page |
| GET | `/api/notifications` | Topbar notification feed |
| GET | `/api/threats` | Paginated threat list (Threat Monitor). Query: `page`, `pageSize`, `search`, `severities` (comma-separated), `statuses` (comma-separated), `source` |
| GET | `/api/threats/{id}` | Single threat |
| GET | `/api/threats/{id}/ml-analysis` | *(demo)* full ML pipeline output for one threat — not called by the frontend |
| GET | `/api/threats/map/points` | Threat map markers |
| GET | `/api/threats/map/countries` | Country-level threat stats table |
| GET | `/api/alerts` | Paginated alert list (Active Alerts) — same query params as `/threats` |
| GET | `/api/alerts/{id}` | Single alert |
| GET | `/api/incidents` | Incident list |
| GET | `/api/incidents/{id}` | Incident detail, including embedded MITRE mapping, response recommendations, and timeline |
| GET | `/api/analytics` | Severity distribution, attack trend, threat categories, top attack sources, assets — bundled for the Analytics page |
| GET | `/api/reports` | Weekly/monthly report summaries |
| POST | `/api/assistant/chat` | Send a message, get a pattern-matched assistant reply |
| GET | `/api/assistant/suggested-questions` | Starter prompts for the chat UI |
| GET | `/api/assistant/insights` | Proactive AI insights feed |
| GET | `/api/settings` | Current user preferences |
| PUT | `/api/settings` | Update user preferences |

Every list endpoint response is camelCase JSON matching the corresponding
TypeScript interface in `frontend/src/types/index.ts` exactly — e.g.
`GET /api/threats` → `{ items, total, page, pageSize }` matches
`PaginatedResult<Alert>`.

## Database schema

SQLite tables (see `app/models/`):

- **alerts** — the `Alert`/`ThreatAlert` record backing both `/threats` and `/alerts` (severity, status, MITRE fields, risk/confidence scores, assigned analyst FK)
- **analysts** — id, name, initials
- **incidents** — correlated incidents with `timeline` and `response_recommendations` stored as JSON columns, plus embedded MITRE mapping
- **assets** — monitored asset inventory (name, type, risk score, criticality)
- **ai_insights** — proactive AI-generated insight cards
- **notifications** — topbar notification feed
- **reports** — weekly/monthly report summaries, `highlights` and `metrics` as JSON columns
- **settings** — single-row user preferences (theme, notification toggles, dashboard defaults)
- **threat_map_points** / **country_threat_stats** — geographic threat intelligence for the Threat Map page

`timeline`, `response_recommendations`, `highlights`, `metrics`,
`notifications`, and `dashboard` (the last two on `settings`) are stored as
SQLite `JSON` columns since they're small, always-fetched-together nested
structures — normalizing them into their own tables would add joins with no
real query benefit at this scale. Migrating to PostgreSQL/Cloud SQL later
keeps these as native `JSONB` columns with no code change.

## AI module placeholders (`app/ml/`)

Each returns a deterministic, plausible result today and is structured so
the *call site* never has to change when a real model replaces the
internals:

| Module | Placeholder behavior | Production replacement |
|---|---|---|
| `anomaly_detection.py` | Hashes the event ID into a 0–1 score | Trained `IsolationForest` / Vertex AI custom model over real feature vectors |
| `threat_classification.py` | Hashes the event ID into an attack category + confidence | Trained `RandomForestClassifier` |
| `risk_scoring.py` | Weighted formula: severity × asset criticality + small jitter | Regression/ranking model or a reviewed weighted-sum heuristic with real CVE/exploit-availability signals |
| `confidence_scoring.py` | Hash-derived 55–99 score | Calibrated confidence output from the detection model itself |
| `mitre_mapping.py` | Keyword-matches a threat title to a small tactic/technique table | RAG lookup against a vectorized MITRE ATT&CK knowledge base (the "Generative AI Assistant Agent" layer in the architecture diagram) |

`app/services/detection_service.py` composes all five into `analyze_event()`
— the function a real event-ingestion pipeline (Pub/Sub subscriber, Cloud
Run job) would call per incoming event. `seed/seed_data.py` calls the risk
and confidence modules directly when generating seed alerts, so the
placeholders are exercised by a real code path today, not just defined and
left unused.

## Assistant service

`app/services/assistant_service.py` returns pattern-matched canned replies
(mirrors the frontend's previous mock behavior exactly, so chat UX didn't
change during the cutover). `generate_reply(message: str)` is the single
function to replace with a real Gemini/Vertex AI call — the request/response
schemas (`ChatRequest`, `ChatMessageOut`, including citation support) are
already shaped for a RAG-backed answer with source citations.

## Error handling & logging

- Every router logs at `INFO` on list operations and `WARNING` on 404s (`app/utils/logging_config.py`).
- A global exception handler in `main.py` catches anything unhandled, logs the full traceback, and returns a generic 500 — no internal error details leak to the client.
- `PUT /settings` catches `SQLAlchemyError` specifically, rolls back, and returns a clean 500.
- Not-found lookups raise `HTTPException(404, ...)` from the router layer (services return `None`, keeping HTTP concerns out of the service layer — see `app/utils/exceptions.py` for the `NotFoundError` convention used internally).

## What's NOT implemented (by design, per project scope)

- **Authentication** — every endpoint is open. Settings are single-row/global rather than per-user.
- **Alembic migrations** — `Base.metadata.create_all()` is used for simplicity; `alembic.ini` / `alembic/` scaffolding is a follow-up (`alembic init alembic` against `app.database.Base.metadata`).
- **Real GCP services** — Cloud Audit Logs, VPC Flow Logs, Security Command Center, BigQuery, Pub/Sub, Vertex AI, and Cloud Storage are all still local/simulated. See `app/config.py` for the placeholder settings already reserved for these.
- **Write endpoints beyond Settings** — alerts/incidents are currently read-only from the API's perspective (status changes, assignment, escalation "buttons" in the UI aren't wired to a backend mutation yet).
