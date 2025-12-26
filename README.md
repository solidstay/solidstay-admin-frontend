# Solidstay Admin Client (React + Vite)

## Environment Configuration

This project uses separate environment files for development and production:

- `.env.development` (used for `npm run dev`):
  - `VITE_API_BASE_URL='http://localhost:8080/'`
- `.env.production` (used for `npm run build`/`npm start`/Railway):
  - `VITE_API_BASE_URL='https://api.solidstayproperties.co.uk/'`

Vite automatically loads the correct file based on the command you run. No manual switching is needed.

## Local Development

1. Start your backend API on `localhost:8080`.
2. Run the client:
   ```bash
   npm install
   npm run dev
   ```
3. The app will use the local API base URL from `.env.development`.

## Production/Deployment

- On Railway or other platforms, ensure `VITE_API_BASE_URL` is set to your production API domain in the environment variables, or use `.env.production` locally:
  ```bash
  npm run build
  npm start
  ```
- The app will use the production API base URL from `.env.production`.

## Notes

- Do **not** commit sensitive values in your env files.
- For more on Vite env loading, see: [Vite Env Docs](https://vitejs.dev/guide/env-and-mode.html)
