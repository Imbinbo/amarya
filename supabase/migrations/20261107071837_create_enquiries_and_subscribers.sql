/*
# Create booking enquiries and newsletter subscribers tables

1. Purpose
   The Amarya resort marketing site has public-facing forms (no sign-in):
   - A hero booking widget (check-in / check-out / guests / room).
   - A final-CTA reservation form (email).
   - A footer newsletter subscription (email).
   These tables persist those submissions so the resort team can follow up.

2. New Tables
   - `booking_enquiries`
     - `id`           uuid primary key
     - `check_in`     date (nullable, hero widget may omit)
     - `check_out`    date (nullable, hero widget may omit)
     - `guests`       text (e.g. "2 Guests")
     - `room_type`    text (e.g. "Oceanfront Villa")
     - `email`        text (nullable; reservation form provides it)
     - `offer`        text (nullable; reserved when an offer package is chosen)
     - `status`       text default 'new' (new / contacted / confirmed)
     - `created_at`   timestamptz default now()
   - `newsletter_subscribers`
     - `id`           uuid primary key
     - `email`        text unique not null
     - `created_at`   timestamptz default now()

3. Security
   - RLS enabled on both tables.
   - Grants + permissive policies target `anon, authenticated` because this is
     a single-tenant public marketing site with no sign-in screen; the
     anon-key browser client must be able to INSERT its own submissions.
   - Only INSERT is granted to anon (the public only submits, never reads back
     enquiries or the subscriber list). SELECT is granted to `authenticated`
     only — i.e. resort staff who sign in to the Supabase dashboard can read.
   - `service_role` gets full CRUD for any server-side tooling.

4. Notes
   - No user_id / auth.users foreign keys: there is no sign-in flow.
   - Newsletter email is unique to prevent duplicate subscriptions.
*/

CREATE TABLE IF NOT EXISTS booking_enquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  check_in date,
  check_out date,
  guests text,
  room_type text,
  email text,
  offer text,
  status text NOT NULL DEFAULT 'new',
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE booking_enquiries ENABLE ROW LEVEL SECURITY;

GRANT INSERT ON booking_enquiries TO anon, authenticated;
GRANT SELECT, UPDATE, DELETE ON booking_enquiries TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON booking_enquiries TO service_role;

DROP POLICY IF EXISTS "public_insert_enquiries" ON booking_enquiries;
CREATE POLICY "public_insert_enquiries"
  ON booking_enquiries FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "staff_select_enquiries" ON booking_enquiries;
CREATE POLICY "staff_select_enquiries"
  ON booking_enquiries FOR SELECT
  TO authenticated USING (true);

DROP POLICY IF EXISTS "staff_update_enquiries" ON booking_enquiries;
CREATE POLICY "staff_update_enquiries"
  ON booking_enquiries FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "staff_delete_enquiries" ON booking_enquiries;
CREATE POLICY "staff_delete_enquiries"
  ON booking_enquiries FOR DELETE
  TO authenticated USING (true);


CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

GRANT INSERT ON newsletter_subscribers TO anon, authenticated;
GRANT SELECT, DELETE ON newsletter_subscribers TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON newsletter_subscribers TO service_role;

DROP POLICY IF EXISTS "public_insert_subscribers" ON newsletter_subscribers;
CREATE POLICY "public_insert_subscribers"
  ON newsletter_subscribers FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "staff_select_subscribers" ON newsletter_subscribers;
CREATE POLICY "staff_select_subscribers"
  ON newsletter_subscribers FOR SELECT
  TO authenticated USING (true);

DROP POLICY IF EXISTS "staff_delete_subscribers" ON newsletter_subscribers;
CREATE POLICY "staff_delete_subscribers"
  ON newsletter_subscribers FOR DELETE
  TO authenticated USING (true);

CREATE INDEX IF NOT EXISTS idx_booking_enquiries_created_at
  ON booking_enquiries (created_at DESC);
