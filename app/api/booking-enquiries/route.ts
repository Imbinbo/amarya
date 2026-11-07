import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

type EnquiryPayload = {
  action?: 'availability' | 'package' | 'reservation' | 'newsletter';
  check_in?: string | null;
  check_out?: string | null;
  guests?: string | null;
  room_type?: string | null;
  email?: string | null;
  offer?: string | null;
};

function jsonError(message: string, status: number) {
  return NextResponse.json({ success: false, error: message }, { status });
}

function normalizeSupabaseUrl(value: string) {
  // Accept either the project URL or a REST URL accidentally pasted into Netlify.
  return value.trim().replace(/\/+$/, '').replace(/\/rest\/v1$/i, '');
}

export async function POST(request: Request) {
  let body: EnquiryPayload;

  try {
    body = (await request.json()) as EnquiryPayload;
  } catch {
    return jsonError('Invalid request body.', 400);
  }

  const action = body.action;
  if (!['availability', 'package', 'reservation', 'newsletter'].includes(action || '')) {
    return jsonError('Unknown enquiry type.', 400);
  }

  const rawUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!rawUrl || !anonKey) {
    console.error('[amarya-enquiries] Missing Supabase environment variables', {
      hasUrl: Boolean(rawUrl),
      hasAnonKey: Boolean(anonKey),
    });
    return jsonError('Booking service is not configured. Please contact the resort.', 503);
  }

  const supabaseUrl = normalizeSupabaseUrl(rawUrl);
  let table: 'booking_enquiries' | 'newsletter_subscribers';
  let payload: Record<string, string | null>;

  if (action === 'availability') {
    const checkIn = body.check_in?.trim() || '';
    const checkOut = body.check_out?.trim() || '';
    if (!/^\d{4}-\d{2}-\d{2}$/.test(checkIn) || !/^\d{4}-\d{2}-\d{2}$/.test(checkOut)) {
      return jsonError('Please choose valid check-in and check-out dates.', 400);
    }
    if (checkOut <= checkIn) {
      return jsonError('Check-out must be after check-in.', 400);
    }
    table = 'booking_enquiries';
    payload = {
      check_in: checkIn,
      check_out: checkOut,
      guests: body.guests?.trim() || null,
      room_type: body.room_type?.trim() || null,
    };
  } else if (action === 'package') {
    const offer = body.offer?.trim() || '';
    if (!offer) return jsonError('Please select a package.', 400);
    table = 'booking_enquiries';
    payload = { offer, check_in: null, check_out: null, guests: null, room_type: null, email: null };
  } else if (action === 'reservation') {
    const email = body.email?.trim().toLowerCase() || '';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return jsonError('Please enter a valid email address.', 400);
    }
    table = 'booking_enquiries';
    payload = { email, check_in: null, check_out: null, guests: null, room_type: null, offer: null };
  } else {
    const email = body.email?.trim().toLowerCase() || '';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return jsonError('Please enter a valid email address.', 400);
    }
    table = 'newsletter_subscribers';
    payload = { email };
  }

  try {
    const supabase = createClient(supabaseUrl, anonKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    });

    const { error } = await supabase.from(table).insert(payload);

    if (error) {
      // Keep the useful database details in Netlify Function logs, never expose secrets.
      console.error('[amarya-enquiries] Supabase insert failed', {
        action,
        table,
        code: error.code,
        message: error.message,
        details: error.details,
        hint: error.hint,
        supabaseHost: new URL(supabaseUrl).host,
      });

      if (action === 'newsletter' && error.code === '23505') {
        return NextResponse.json({ success: true, alreadySubscribed: true });
      }
      return jsonError('We could not save your request. Please try again or contact the resort.', 502);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[amarya-enquiries] Unexpected server error', {
      action,
      message: error instanceof Error ? error.message : String(error),
    });
    return jsonError('The booking service is temporarily unavailable.', 500);
  }
}
