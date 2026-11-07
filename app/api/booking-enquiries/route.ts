import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const payload = {
      check_in: typeof body.check_in === 'string' && body.check_in ? body.check_in : null,
      check_out: typeof body.check_out === 'string' && body.check_out ? body.check_out : null,
      guests: typeof body.guests === 'string' && body.guests ? body.guests : null,
      room_type: typeof body.room_type === 'string' && body.room_type ? body.room_type : null,
    };

    if (!payload.check_in || !payload.check_out) {
      return NextResponse.json(
        { error: 'Please choose both check-in and check-out dates.' },
        { status: 400 },
      );
    }

    const supabaseUrl =
      process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey =
      process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
      return NextResponse.json(
        { error: 'Booking service is temporarily unavailable.' },
        { status: 503 },
      );
    }

    const supabase = createClient(supabaseUrl, supabaseAnonKey);
    const { error } = await supabase.from('booking_enquiries').insert(payload);

    if (error) {
      return NextResponse.json(
        { error: 'We could not submit your request just now.' },
        { status: 502 },
      );
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: 'We could not submit your request just now.' },
      { status: 400 },
    );
  }
}
