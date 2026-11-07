# Guest contact details update

## Changes
- Check Availability now requires guest email and phone number.
- Each Special Offers > Reserve button opens a contact form requiring email and phone.
- Both submissions are saved to `public.booking_enquiries` with the selected dates/room or offer.
- API validates email and phone server-side.

## Required Supabase SQL (run once in SQL Editor)
```sql
ALTER TABLE public.booking_enquiries
  ADD COLUMN IF NOT EXISTS phone text;
```

Run this SQL in the same Supabase project connected to Netlify before testing the updated website.

## Deploy
Push the updated project files to the connected GitHub `main` branch. Netlify will build and publish automatically.

## Test
1. Submit Check Availability with dates, room, email and phone.
2. In Supabase Table Editor > `booking_enquiries`, confirm the row contains `email` and `phone`.
3. Click a Special Offer's Reserve button, submit email and phone, and confirm the row includes the offer, email and phone.
