# Wedding Invitation Frontend

React + Vite frontend for the wedding invitation and RSVP tracker.

## Current scope

- `/invite/INV001` — personalized wedding invitation + RSVP
- `/invite/INV002` — sample invitation
- `/invite/INV003` — sample invitation
- `/invite/INV004` — sample invitation
- `/admin` — RSVP tracker

## Current data layer

The frontend currently uses `src/services/weddingApi.js` with `localStorage` as a temporary mock backend.

This is intentional. The UI can be built and tested before connecting Google Apps Script + Google Sheets.

## Run locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Later: Google Apps Script

Replace the functions in `src/services/weddingApi.js` with `fetch()` calls to the Google Apps Script web app.

Suggested operations:

- `getInvitation(inviteId)`
- `submitRsvp(payload)`
- `getRsvps()`

Do not place Google credentials or private Sheet access tokens in the frontend.

## Customization

Main wedding content:
- `src/data/wedding.js`

Main invitation examples:
- `src/data/wedding.js`

Frontend styling:
- `src/index.css`

Gallery images are currently visual placeholders. Replace the gallery cards with the final wedding photos when available.
