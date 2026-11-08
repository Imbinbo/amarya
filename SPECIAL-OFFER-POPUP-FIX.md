# Special Offer Contact Form Popup Fix

## What changed
- Rendered the Special Offers enquiry modal through a React portal into `document.body`, outside animated/overflow-hidden page sections.
- Kept the existing package enquiry API request and Supabase backend flow unchanged.
- Restored the native mouse cursor inside this modal only. The global custom cursor remains active elsewhere on the website.
- Explicitly enabled pointer events and text selection on the modal, form, inputs, and buttons.
- Added Escape-to-close and background scroll locking while the modal is open.

## Files changed
- `components/site/Offers.tsx`
- `app/globals.css`

## Deploy
Replace these two files in the project, commit and push to GitHub, then wait for Netlify to show Published. Test Special Offers > Reserve with mouse clicks in Email and Phone fields, type text, and submit.

The source ZIP was inspected, but a production build was not run in this environment.
