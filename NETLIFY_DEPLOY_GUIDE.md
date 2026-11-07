# Netlify deployment guide (Next.js + Supabase)

## 1. Push this project to GitHub
- Extract this ZIP.
- Create a new GitHub repository and upload/push the contents of this folder (the folder containing `package.json`).
- Do not commit `.env` files. `.env.example` is a template only.

## 2. Import into Netlify
- In Netlify, choose **Add new project → Import an existing project**.
- Connect the GitHub repository.
- Base directory: leave blank if `package.json` is at the repository root.
- Build command: `npm run build` (or keep the included `netlify.toml`).
- Publish directory: `.next` (handled by the included Netlify Next.js plugin).
- Deploy. The included `@netlify/plugin-nextjs` adapter enables Next.js routes and API handlers as Netlify functions; do not use a plain drag-and-drop static deploy.

## 3. Set Netlify environment variables
In **Site configuration → Environment variables**, add:
- `NEXT_PUBLIC_SUPABASE_URL` = your Supabase Project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` = your Supabase anon/public key

For the booking API, you may also add these aliases (the API supports either naming convention):
- `SUPABASE_URL` = same Supabase Project URL
- `SUPABASE_ANON_KEY` = same Supabase anon/public key

Then trigger a fresh deploy so the build receives the variables. Never put a Supabase `service_role` key in a `NEXT_PUBLIC_` variable or in frontend code.

## 4. Create the Supabase tables
- Open your Supabase project → **SQL Editor** → **New query**.
- Copy and run the full SQL from `supabase/migrations/20261107071837_create_enquiries_and_subscribers.sql`.
- This creates `booking_enquiries` and `newsletter_subscribers`, enables RLS, and grants public INSERT only.

## 5. Test after deployment
- Submit the hero booking form (check-in and check-out are required).
- Submit an offer reservation.
- Submit the final reservation email form.
- Subscribe using the footer newsletter form.
- Confirm rows appear in Supabase → Table Editor.

## Notes
- The hero booking form calls `/api/booking-enquiries`; Netlify's Next.js plugin must be active for this API route to work.
- Offer reservations, final reservation requests, and newsletter subscriptions use the Supabase browser client and therefore require the two `NEXT_PUBLIC_` variables.
- The SQL policies allow anonymous inserts but do not allow anonymous reads.
