# Deploying Meridian to Vercel

This folder is a separate, Vercel-compatible version of the demo. It's not a
copy-paste of the Node server — it had to change shape because Vercel doesn't
run a long-lived process:

| | Local demo (`meridian/`) | This folder (`meridian-vercel/`) |
|---|---|---|
| Server | One always-on Node process | Serverless functions in `/api`, one per request |
| Database | SQLite file on disk | Postgres (hosted — disk isn't persistent on Vercel) |
| Price simulation | `setInterval` mutating memory | A time-based formula, recalculated per request (looks the same to a viewer, needs no memory) |
| Frontend | Same HTML/CSS/JS | Same HTML/CSS/JS, unchanged |

## 1. Create a Postgres database (2 minutes, in the Vercel dashboard)

You'll need this before the app can store users, holdings, or orders.

1. Go to vercel.com → your project (or create one first, see below) → **Storage** tab.
2. **Create Database → Postgres** (the free "Hobby" tier is enough for a demo).
3. Vercel automatically adds the connection details as environment variables
   (`POSTGRES_URL`, etc.) to your project — you don't need to copy anything.

## 2. Get the code onto Vercel

**Option A — from a computer (recommended, ~5 minutes):**
1. Unzip this folder, `cd` into it, run `npm install` (this locks in the
   `@vercel/postgres` version).
2. Push it to a GitHub repo.
3. At vercel.com → **Add New → Project** → import that repo → Deploy.
4. Do step 1 above (create the Postgres database) if you haven't yet, then
   redeploy (Vercel → Deployments → ⋯ → Redeploy) so the function picks up
   the new database env vars.

**Option B — entirely from your phone:**
1. In GitHub's mobile site or app, create a new repository and use "Upload
   files" to drag in every file from this folder (keep the folder structure —
   `api/` and its contents, plus the HTML/CSS/JS at the root).
2. Open vercel.com in your phone's browser, sign in, **Add New → Project**,
   import that GitHub repo, Deploy.
3. Create the Postgres database as in step 1 (Vercel's dashboard is fully
   usable on mobile), then redeploy.
4. Vercel gives you a live URL — open it in Safari/Chrome on your phone to
   check it, and that's the same link you send the investor.

There's no step where you "run the server on your phone" — you're not
hosting anything locally. You deploy once to Vercel, and after that it's
just a website: anyone (you, the investor) opens the URL in a browser.

## 3. One environment variable worth setting

Vercel → your project → **Settings → Environment Variables** → add:

- `SESSION_SECRET` — any long random string. Without it, the app falls back
  to a hardcoded demo value, which is fine for a click-through demo but
  shouldn't be trusted beyond that.

Redeploy after adding it.

## 4. Before the investor call

- Load the URL yourself first and register a fresh demo account — Postgres
  data persists between requests (unlike plain serverless memory), so
  whatever you set up will still be there live.
- Cold starts: the very first request after a period of inactivity can take
  a second or two longer while the function spins up. Open the site
  yourself a minute before the call so it's warm.
