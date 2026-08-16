# Ravi Sir English Classes Auth System

## Backend

- Start the backend with `npm run dev`
- Auth routes:
  - POST /api/auth/register
  - POST /api/auth/login
  - POST /api/auth/google
  - POST /api/auth/send-otp
  - POST /api/auth/verify-otp
  - POST /api/auth/forgot-password
  - POST /api/auth/reset-password
  - GET /api/auth/profile

## Frontend

- Open the site and use the auth modal from the top navigation.
- Add `?debug=1` to the URL to show the diagnostic panel for backend and request details.

## Notes

- The backend runs in memory when MongoDB is unavailable so authentication still works locally.
- If MongoDB is running locally, set `MONGODB_URI` in the `.env` file.
