# Deployment Guide

## What this repo now does

- `frontend`: Vite + React website
- `backend`: Express API for enquiry saving and Gemini-based disease detection
- `database`: Firestore collection named `enquiries`

## 1. Local setup

### Frontend

Create a root `.env` file:

```env
VITE_API_BASE_URL=http://localhost:8080
```

If you use Firebase Hosting rewrites in production, you can leave `VITE_API_BASE_URL` empty during production builds.

### Backend

Copy `backend/.env.example` to `backend/.env` and set:

```env
PORT=8080
ALLOWED_ORIGINS=http://localhost:5173
GEMINI_API_KEY=your_google_ai_studio_key
GEMINI_MODEL=gemini-2.5-flash
FIRESTORE_ENQUIRIES_COLLECTION=enquiries
```

For Firestore access in local development, use one of these:

1. `gcloud auth application-default login`
2. Or set `GOOGLE_APPLICATION_CREDENTIALS=/absolute/path/service-account.json`

### Run locally

```bash
npm install
npm --prefix backend install
npm --prefix backend run dev
npm run dev
```

## 2. GCP backend deployment

### Create project and enable services

```bash
gcloud config set project YOUR_GCP_PROJECT_ID
gcloud services enable run.googleapis.com cloudbuild.googleapis.com artifactregistry.googleapis.com firestore.googleapis.com
```

### Create Firestore database

In Google Cloud Console:

1. Open Firestore
2. Create database
3. Choose `Native mode`
4. Pick a region close to your users

### Deploy the backend to Cloud Run

From the repo root:

```bash
gcloud run deploy agro-seeds-api \
  --source backend \
  --region asia-south1 \
  --allow-unauthenticated \
  --set-env-vars GEMINI_API_KEY=YOUR_GEMINI_KEY,GEMINI_MODEL=gemini-2.5-flash,ALLOWED_ORIGINS=https://www.yourdomain.com
```

After deploy, Cloud Run gives you a URL like:

```text
https://agro-seeds-api-xxxxx-uc.a.run.app
```

Test it:

```bash
curl https://agro-seeds-api-xxxxx-uc.a.run.app/api/health
```

## 3. Frontend deployment

### Option A: Firebase Hosting (recommended for this repo)

Install Firebase CLI:

```bash
npm install -g firebase-tools
firebase login
firebase init hosting
firebase use --add
```

If you want the frontend to call the Cloud Run URL directly, build with:

```bash
VITE_API_BASE_URL=https://agro-seeds-api-xxxxx-uc.a.run.app npm run build
firebase deploy --only hosting
```

If you want the same domain to serve both the site and `/api/*`, add this rewrite inside `firebase.json` before the catch-all SPA rewrite:

```json
{
  "source": "/api/**",
  "run": {
    "serviceId": "agro-seeds-api",
    "region": "asia-south1",
    "pinTag": true
  }
}
```

Then build without `VITE_API_BASE_URL` and deploy:

```bash
npm run build
firebase deploy --only hosting
```

## 4. Custom domain setup

Assume:

- frontend domain: `www.yourdomain.com`
- optional apex redirect: `yourdomain.com`

### Buy the domain

Buy it from any registrar like GoDaddy, Namecheap, Google Domains partner, or Cloudflare Registrar.

### Connect the domain to Firebase Hosting

In Firebase Console:

1. Open `Hosting`
2. Click `Add custom domain`
3. Enter `www.yourdomain.com`
4. Add the shown DNS records in your domain registrar
5. Wait for verification and SSL provisioning

If you also want `yourdomain.com`, add that as a second custom domain and configure redirect behavior in Firebase Hosting.

## 5. Recommended production structure

- `https://www.yourdomain.com` -> Firebase Hosting
- `https://www.yourdomain.com/api/*` -> Firebase rewrite to Cloud Run

This keeps the frontend and API under one public domain and avoids CORS headaches.

## 6. Notes

- Gemini API key should stay only in the backend, never in the frontend.
- Firestore is used here because it is the simplest managed database path on GCP for this app.
- If you later want PostgreSQL or MySQL on Cloud SQL, the backend can be swapped without changing the frontend forms much.
