# Amarya Netlify booking fix

## What changed
- All four public forms now submit through `/api/booking-enquiries`.
- The server route normalizes Supabase URLs, including accidentally pasted `/rest/v1` suffixes.
- Supabase errors are logged in Netlify Function logs with database code/message/details (no keys are logged).
- The browser no longer needs to connect directly to Supabase for package, reservation, or newsletter inserts.
- The original Supabase migration is retained.

## Required Netlify environment variables
Set all four to the SAME current Supabase project:
- `NEXT_PUBLIC_SUPABASE_URL`
- `SUPABASE_URL`
  - Value: `https://YOUR_PROJECT_REF.supabase.co` (no `/rest/v1/`)
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_ANON_KEY`
  - Value: the current project's publishable key or legacy anon key (not service_role / secret key)

After changing variables, trigger a new production deploy.

## Database
The original migration is at:
`supabase/migrations/20261107071837_create_enquiries_and_subscribers.sql`

It creates `booking_enquiries`, `newsletter_subscribers`, grants public INSERT, and enables RLS. Apply this migration once in the target Supabase project. Do not run it repeatedly if already applied; its DDL/policies are designed to be re-runnable.

## Test
Submit one Hero availability request, one package reservation, one final reservation email, and one newsletter email. Check Supabase Table Editor for records.
If an insert fails, open Netlify > Cloud compute > Functions > Next.js Server Handler and inspect the newest log entry for `[amarya-enquiries] Supabase insert failed`.
