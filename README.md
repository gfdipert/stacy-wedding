**Forever After — AI Wedding Page Generator**

Overview
--------
Forever After provides a backend and frontend for generating beautiful, shareable wedding pages for couples. It copies the core offering of sites like theknot.com but uses AI agents to design and populate the site automatically from the couple's input and photos.

**Features**
- **AI-driven design:** agents analyze photos and text to produce layouts, color schemes, and copy.
- **Photo-first pages:** image-aware templates that adapt to couples' pictures.
- **API + UI:** REST API for programmatic generation and a frontend for preview & customization.
- **Export & share:** publish pages with short, shareable URLs.

How it works
------------
- The frontend collects couple input and photos.
- The backend orchestrates AI agents (layout, copywriter, image stylist) that generate a site specification and assets.
- Generated pages are stored and served from the backend; images and large assets go to object storage.

Architecture (typical)
---------------------
- **Frontend:** single-page app (React/Vue) — preview, edit, and publish flow.
- **Backend:** API server (Node/Express, Python/Flask, or similar) — agent orchestration, page storage, auth.
- **AI Agents:** modular services that call LLMs and image models to produce copy, layout, and style suggestions.
- **Storage:** object storage for photos (S3, Supabase Storage) and a relational DB for metadata (Postgres).

Tech stack (suggested)
----------------------
- Frontend: React + Vite
- Backend: Node.js (Express/Koa) or Python (FastAPI)
- DB: PostgreSQL
- Storage: AWS S3 or Supabase
- AI: OpenAI, Anthropic, or other LLM/image providers

Quickstart (local)
------------------
Prereqs: Node 18+, package manager (npm/pnpm/yarn), Postgres, object storage credentials, AI API key.

Set environment variables (example):

```bash
# Backend envs
OPENAI_API_KEY=your_openai_key
DATABASE_URL=postgres://user:pass@localhost:5432/forever_after
STORAGE_PROVIDER=s3
S3_BUCKET=your-bucket

# Frontend envs
VITE_API_BASE=http://localhost:4000/api
```

Run locally (example commands):

```bash
# from repo root
cd backend
npm install
npm run dev

cd ../frontend
npm install
npm run dev
```

API (examples)
---------------
- `POST /api/pages` — create a wedding page. Payload includes couple info, preferences, and images (multipart or image URLs).
- `GET /api/pages/:id` — get generated page data and assets.
- `POST /api/pages/:id/publish` — publish and generate shareable URL.

Usage
-----
1. Use the frontend to submit the couple's names, event details, and photos.
2. The backend runs agents to produce a page draft.
3. Review and optionally edit content in the UI, then publish.

Deployment notes
----------------
- Serve the frontend using Vercel/Netlify or any static host.
- Host the backend on a managed service (Heroku, Fly, AWS ECS) or serverless functions with attention to long-running agent jobs.
- Use async workers or a job queue (Redis + Bull/RQ) for agent orchestration to avoid blocking requests.

Contributing
------------
- Please open issues for feature requests or bugs. For code contributions, fork the repo and submit a PR.

License
-------
MIT — see LICENSE for details.

Contact
-------
For design/architecture questions or help tailoring this README to a specific stack, open an issue or email the maintainer.
