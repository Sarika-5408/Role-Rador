# ⚡ Role Radar — AI-Powered Career Platform

> A production-ready, secure full-stack web application for resume editing, job searching, interview preparation, and internship guidance.

---

## 📋 Table of Contents

1. [What is Role Radar?](#what-is-role-radar)
2. [Features](#features)
3. [Tech Stack](#tech-stack)
4. [Project Structure](#project-structure)
5. [Quick Start](#quick-start)
6. [Environment Variables](#environment-variables)
7. [Security Features](#security-features)
8. [Deployment](#deployment)
9. [How to Access the Website](#how-to-access-the-website)
10. [Troubleshooting](#troubleshooting)

---

## What is Role Radar?

Role Radar is an AI-powered career platform that helps users:

- ✏️ **Edit & improve** existing resumes using AI
- 📝 **Create new resumes** from scratch with AI generation
- 🌍 **Explore job vacancies** worldwide (real listings, no mock data)
- 🎤 **Prepare for interviews** with AI-generated questions and feedback
- 🎓 **Get internship guidance** with curated platforms and AI tips

---

## Features

| Feature | Description |
|---|---|
| Auth System | Signup/Login with JWT in HTTP-only cookies |
| Edit Resume | Upload PDF/DOCX/TXT → AI improves it → Download PDF |
| New Resume | Multi-step form → AI generates full resume → Download PDF |
| Job Vacancies | Live jobs from Adzuna + Remotive + Arbeitnow (all free) |
| Interview Prep | AI-generated questions + answer evaluation with scoring |
| Internship Guide | 10 curated platforms + AI personalized guidance |
| Activity Log | Full audit trail of all user actions |

---

## Tech Stack

### Frontend
- **Next.js 14** (React)
- **Tailwind CSS**
- **Axios** (API calls with automatic token refresh)

### Backend
- **Node.js + Express**
- **MongoDB Atlas** (free tier)
- **JWT** (access token 15 min + refresh token 7 days)

### AI Engine
- **HuggingFace** free inference API (default)
- **Ollama** local LLM support (optional, no cost)

### Job APIs (all free)
- Adzuna (free registration)
- Remotive (no key needed)
- Arbeitnow (no key needed)

---

## Project Structure

```
role-radar/
│
├── .env.example                      ← Copy to backend/.env and fill in values
├── API_DOCS.md                       ← Full API reference
├── README.md                         ← This file
├── SETUP.md                          ← Detailed setup & deployment guide
│
├── backend/
│   ├── package.json
│   └── src/
│       ├── server.js                 ← Express entry point
│       ├── config/
│       │   ├── database.js           ← MongoDB Atlas connection
│       │   └── logger.js             ← Winston logging
│       ├── middleware/
│       │   ├── auth.js               ← JWT authentication guard
│       │   ├── rateLimiter.js        ← Rate limiting rules
│       │   ├── upload.js             ← Multer + MIME validation
│       │   ├── activityLogger.js     ← Action logging helper
│       │   └── errorHandler.js       ← Global error handler
│       ├── models/
│       │   ├── User.js               ← bcrypt passwords + daily AI limits
│       │   ├── Resume.js             ← Resume schema
│       │   └── Activity.js           ← Audit log (auto-purge 90 days)
│       ├── routes/
│       │   ├── auth.js               ← signup / login / logout / refresh
│       │   ├── resume.js             ← upload / create / download
│       │   ├── jobs.js               ← search across 3 free APIs
│       │   ├── interview.js          ← generate questions / evaluate answers
│       │   ├── internship.js         ← platforms / AI guidance
│       │   └── activity.js           ← usage stats and log
│       └── services/
│           └── aiService.js          ← HuggingFace + Ollama abstraction
│
└── frontend/
    ├── package.json
    ├── next.config.js                ← Security headers
    ├── tailwind.config.js
    └── src/
        ├── styles/globals.css        ← Dark theme + custom fonts
        ├── lib/api.js                ← Axios with silent token refresh
        ├── context/AuthContext.jsx   ← Global auth state + withAuth HOC
        ├── components/
        │   └── AppLayout.jsx         ← Sidebar navigation layout
        └── pages/
            ├── index.jsx             ← Auto-redirect
            ├── login.jsx
            ├── signup.jsx
            └── dashboard/
                ├── index.jsx         ← Dashboard home with stats
                ├── edit-resume.jsx   ← Drag-and-drop upload + AI edit
                ├── create-resume.jsx ← 5-step resume builder
                ├── jobs.jsx          ← Job search with filters
                ├── interview.jsx     ← Question cards + answer eval
                ├── internship.jsx    ← Platforms + AI guidance
                └── activity.jsx      ← Activity log + usage stats
```

---

## Quick Start

### Prerequisites
- Node.js 18+
- MongoDB Atlas free account → https://cloud.mongodb.com
- HuggingFace free account → https://huggingface.co

### Step 1 — Install dependencies

```bash
cd backend && npm install
cd ../frontend && npm install
```

### Step 2 — Configure environment

```bash
cd backend
cp ../.env.example .env
mkdir -p logs uploads
# Edit .env with your values (see Environment Variables section)

cd ../frontend
echo "NEXT_PUBLIC_API_URL=${https://role-rador-backend.onrender.com" > .env.local
```

### Step 3 — Run both servers

```bash
# Terminal 1 — Backend
cd backend && npm run dev

# Terminal 2 — Frontend
cd frontend && npm run dev
```

### Step 4 — Open the website

```
http://localhost:3000
```

---

## Environment Variables

### Required (backend/.env)

```env
NODE_ENV=development
PORT=5000
FRONTEND_URL=http://localhost:3000

# MongoDB Atlas URI
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/roleradar

# Generate all 3 secrets with:
# node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
JWT_SECRET=your_32_char_random_secret_here
JWT_EXPIRES_IN=15m
JWT_REFRESH_SECRET=different_32_char_random_secret
JWT_REFRESH_EXPIRES_IN=7d
COOKIE_SECRET=yet_another_32_char_random_secret

# HuggingFace free API key from huggingface.co/settings/tokens
HUGGINGFACE_API_KEY=hf_xxxxxxxxxxxxxxxxxxxxxxxx
HUGGINGFACE_MODEL=mistralai/Mistral-7B-Instruct-v0.3
```

### Optional

```env
# Adzuna jobs API (free — register at developer.adzuna.com)
ADZUNA_APP_ID=your_app_id
ADZUNA_APP_KEY=your_app_key

# Use local Ollama instead of HuggingFace
USE_OLLAMA=false
OLLAMA_URL=http://localhost:11434
OLLAMA_MODEL=llama3

# Daily limits per user
DAILY_RESUME_GENERATIONS=5
DAILY_INTERVIEW_SESSIONS=10
MAX_FILE_SIZE_MB=2
```

---

## Security Features

| Layer | Implementation |
|---|---|
| Passwords | bcrypt (12 salt rounds) — never plain text |
| Authentication | JWT in HTTP-only cookies — never localStorage |
| Token expiry | Access token: 15 min / Refresh token: 7 days |
| Rate limiting | 5 uploads/min · 10 AI/min · 20 general/min |
| Input validation | express-validator on all endpoints |
| NoSQL injection | express-mongo-sanitize |
| XSS prevention | xss-clean middleware |
| HTTP headers | helmet (CSP, HSTS, X-Frame, etc.) |
| Parameter pollution | hpp middleware |
| File uploads | MIME type + extension validation, 2MB max |
| Daily AI limits | 5 resume generations + 10 interviews per user/day |
| Audit logging | All actions logged: userId + action + timestamp |
| CORS | Restricted to FRONTEND_URL only |

---

## Deployment

### Frontend → Vercel (free)

```
1. Push frontend/ to GitHub
2. vercel.com → New Project → Import repo
3. Set root directory: frontend
4. Add env var: NEXT_PUBLIC_API_URL=https://your-backend.onrender.com
5. Deploy → get your URL: https://your-app.vercel.app
```

### Backend → Render (free)

```
1. Push backend/ to GitHub
2. render.com → New Web Service → Connect repo
3. Build command: npm install
4. Start command: npm start
5. Add all .env variables
6. Set NODE_ENV=production
7. Set FRONTEND_URL=https://your-app.vercel.app
```

### Database → MongoDB Atlas (free)

```
1. cloud.mongodb.com → Create free M0 cluster
2. Database Access → Add user with password
3. Network Access → Add 0.0.0.0/0
4. Connect → Drivers → Copy URI
5. Paste into MONGODB_URI in .env
```

---

## How to Access the Website

### Local Development

| What | URL |
|------|-----|
| **Main Website** | **http://localhost:3000** |
| API Server | ${https://role-rador-backend.onrender.com |
| Health Check | ${https://role-rador-backend.onrender.com/health |

### All Page URLs

| Page | URL |
|------|-----|
| Home (auto-redirect) | http://localhost:3000 |
| Login | http://localhost:3000/login |
| Sign Up | http://localhost:3000/signup |
| **Dashboard** | **http://localhost:3000/dashboard** |
| Edit Resume | http://localhost:3000/dashboard/edit-resume |
| New Resume | http://localhost:3000/dashboard/create-resume |
| Job Vacancies | http://localhost:3000/dashboard/jobs |
| Interview Prep | http://localhost:3000/dashboard/interview |
| Internship Guide | http://localhost:3000/dashboard/internship |
| Activity Log | http://localhost:3000/dashboard/activity |

### After Deployment

Replace `localhost:3000` with your Vercel domain:
```
https://your-app.vercel.app                          ← Home
https://your-app.vercel.app/dashboard                ← Dashboard
https://your-app.vercel.app/dashboard/jobs           ← Jobs
https://your-app.vercel.app/dashboard/interview      ← Interview Prep
```

---

## Troubleshooting

**AI is slow on first call**
HuggingFace free tier cold-starts in 20–30 seconds. Retry if it times out. Use Ollama locally for instant responses.

**MongoDB connection failed**
Check URI format, IP whitelist in Atlas, and username/password in the connection string.

**CORS error in browser**
`FRONTEND_URL` must exactly match your frontend URL — no trailing slash, include `https://`.

**File upload rejected**
Only `.pdf`, `.docx`, `.txt` under 2MB. Password-protected PDFs cannot be parsed.

**Rate limit hit (429)**
Wait 1 minute for API limits, or until tomorrow for daily AI limits.

---

## License

MIT — free to use, modify, and distribute.
