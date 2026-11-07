-- Store the guest phone number for availability and special-offer enquiries.
ALTER TABLE public.booking_enquiries
  ADD COLUMN IF NOT EXISTS phone text;
