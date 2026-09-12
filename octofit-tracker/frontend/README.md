# OctoFit Tracker Frontend

This Vite React app provides the presentation tier for the OctoFit Tracker multi-tier application.

## Environment configuration

The frontend must define `VITE_CODESPACE_NAME` before it can generate the Codespaces API URL pattern.

Example `.env.local`:

```bash
VITE_CODESPACE_NAME=my-codespace
```

When `VITE_CODESPACE_NAME` is not set, the app falls back to `http://localhost:8000` instead of generating `https://undefined-8000.app.github.dev` URLs.

## Available routes

- `/users`
- `/teams`
- `/activities`
- `/leaderboard`
- `/workouts`

The app uses the backend API on port `8000` and reads data from the MongoDB-backed routes under `/api`.
