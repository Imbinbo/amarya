'use client';

import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useState, type FormEvent } from 'react';
import { ArrowRight, ChevronDown, Loader2 } from 'lucide-react';
import { MagneticButton } from '@/components/motion/MagneticButton';
import { HERO_IMAGE } from '@/lib/data';
import { useToast } from '@/hooks/use-toast';

export function Hero() {
  const prefersReduced = useReducedMotion();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 900], ['0%', '30%']);
  const opacity = useTransform(scrollY, [0, 720], [1, 0]);
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);

  const handleBooking = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      action: 'availability',
      check_in: (data.get('checkin') as string) || null,
      check_out: (data.get('checkout') as string) || null,
      guests: (data.get('guests') as string) || null,
      room_type: (data.get('room') as string) || null,
      email: (data.get('email') as string) || '',
      phone: (data.get('phone') as string) || '',
    };
    setSubmitting(true);
    try {
      const response = await fetch('/api/booking-enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!response.ok) throw new Error('Booking request failed');
      form.reset();
      toast({
        title: 'Availability checked',
        description:
          'Thank you. Our concierge will confirm your dates and curated stay shortly.',
      });
    } catch {
      toast({
        title: 'Something went wrong',
        description:
          'We could not submit your request just now. Please try again or call us.',
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="home" className="relative h-[100svh] min-h-[900px] w-full overflow-hidden sm:min-h-[680px]">
      {/* Cinematic background */}
      <motion.div
        style={prefersReduced ? undefined : { y }}
        className="absolute inset-0"
      >
        <img
          src={HERO_IMAGE}
          alt="Aerial view of Amarya luxury tropical resort"
          className="h-full w-full object-cover"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-forest-deep/55 via-forest-deep/25 to-forest-deep/70" />
        <div className="absolute inset-0 bg-gradient-to-r from-forest-deep/40 to-transparent" />
      </motion.div>

      {/* Content */}
      <motion.div
        style={prefersReduced ? undefined : { opacity }}
        className="relative z-10 flex h-full flex-col items-center justify-start px-5 pt-20 pb-[430px] text-center sm:pt-24 sm:pb-[300px] lg:pt-20 lg:pb-[190px]"
      >
        <motion.span
          initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-5 flex items-center gap-3 text-[11px] uppercase tracking-luxe text-gold-soft sm:mb-6"
        >
          <span className="h-px w-8 bg-gold-soft/60" />
          A Tropical Sanctuary
          <span className="h-px w-8 bg-gold-soft/60" />
        </motion.span>

        <motion.h1
          initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-4xl font-serif-display text-4xl font-light leading-[1.05] text-ivory text-shadow-luxe sm:text-6xl lg:text-[5.2rem]"
        >
          Escape Into Nature.
          <br />
          <span className="italic text-gold-soft">Experience Luxury.</span>
        </motion.h1>

        <motion.p
          initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1, ease: [0.22, 1, 0.36, 1] }}
          className="mt-5 max-w-xl text-base font-sans-body leading-relaxed text-ivory/80 sm:mt-6 sm:text-lg"
        >
          A five-star sanctuary where rainforest meets reef — private villas,
          soulful wellness, and cuisine rooted in the land and sea.
        </motion.p>

        <motion.div
          initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.15, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 flex flex-col items-center gap-3 sm:mt-7 sm:flex-row sm:gap-4"
        >
          <MagneticButton
            as="a"
            href="#about"
            className="group rounded-full bg-ivory px-8 py-4 text-[12px] font-sans-body uppercase tracking-wide-luxe text-forest-deep transition-colors hover:bg-gold"
          >
            Discover Our Resort
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </MagneticButton>
          <MagneticButton
            as="a"
            href="#offers"
            className="rounded-full border border-ivory/50 px-8 py-4 text-[12px] font-sans-body uppercase tracking-wide-luxe text-ivory transition-colors hover:bg-ivory/10"
          >
            Book Your Stay
          </MagneticButton>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.6 }}
        className="absolute bottom-[190px] left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 lg:bottom-[175px] sm:flex"
      >
        <span className="text-[10px] uppercase tracking-luxe text-ivory/60">
          Scroll
        </span>
        <div className="relative flex h-9 w-5 justify-center rounded-full border border-ivory/40">
          <span className="animate-scroll-dot mt-1.5 h-1.5 w-1.5 rounded-full bg-gold-soft" />
        </div>
      </motion.div>

      {/* Booking widget */}
      <motion.div
        initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1.3, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-x-0 bottom-0 z-20 w-full min-w-0 px-4 pb-5 sm:px-5 sm:pb-7"
      >
        <form
          onSubmit={handleBooking}
          className="glass-light mx-auto grid w-full max-w-7xl min-w-0 grid-cols-1 gap-3 rounded-2xl px-4 py-4 text-forest-deep shadow-[0_20px_50px_-20px_rgba(20,40,28,0.4)] sm:grid-cols-2 sm:gap-x-4 sm:gap-y-4 sm:px-6 sm:py-5 lg:grid-cols-6 lg:items-end lg:gap-3 xl:grid-cols-7"
        >
          <BookingField label="Check-in" type="date" id="checkin" name="checkin" />
          <BookingField label="Check-out" type="date" id="checkout" name="checkout" />
          <BookingSelectField
            label="Guests"
            id="guests"
            name="guests"
            options={['1 Guest', '2 Guests', '3 Guests', '4 Guests', '5+ Guests']}
          />
          <BookingField label="Email" type="email" id="booking-email" name="email" />
          <BookingField label="Phone" type="tel" id="booking-phone" name="phone" />
          <BookingSelectField
            label="Room"
            id="room"
            name="room"
            options={[
              'Garden Pavilion',
              'Oceanfront Villa',
              'Canopy Treehouse',
              'Lagoon Estate',
            ]}
          />
          <button
            type="submit"
            disabled={submitting}
            className="mt-1 flex min-h-[52px] w-full min-w-0 items-center justify-center gap-2 whitespace-nowrap rounded-xl bg-forest px-5 py-3.5 text-[11px] font-sans-body uppercase tracking-[0.14em] text-ivory transition-colors hover:bg-forest-deep disabled:cursor-wait disabled:opacity-60 sm:col-span-2 sm:mt-0 sm:px-6 lg:col-span-6 lg:w-full xl:col-span-1 xl:px-3 xl:text-[10px] xl:tracking-[0.1em]"
          >
            {submitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Checking
              </>
            ) : (
              <>
                Check Availability
                <ChevronDown className="h-4 w-4" />
              </>
            )}
          </button>
        </form>
      </motion.div>
    </section>
  );
}

function BookingField({
  label,
  type,
  id,
  name,
}: {
  label: string;
  type: string;
  id: string;
  name: string;
}) {
  return (
    <div className="flex min-w-0 w-full flex-col gap-1.5">
      <label
        htmlFor={id}
        className="text-[10px] uppercase tracking-wide-luxe text-forest-light"
      >
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        required
        autoComplete={type === 'email' ? 'email' : type === 'tel' ? 'tel' : undefined}
        inputMode={type === 'tel' ? 'tel' : undefined}
        pattern={type === 'tel' ? '[+0-9()\\s.-]{7,25}' : undefined}
        title={type === 'tel' ? 'Enter a valid phone number' : undefined}
        className="block w-full min-w-0 max-w-full border-b border-forest/15 bg-transparent pb-2 font-sans-body text-sm text-forest-deep outline-none transition-colors focus:border-gold [color-scheme:light]"
      />
    </div>
  );
}

function BookingSelectField({
  label,
  id,
  name,
  options,
}: {
  label: string;
  id: string;
  name: string;
  options: string[];
}) {
  return (
    <div className="flex min-w-0 w-full flex-col gap-1.5">
      <label
        htmlFor={id}
        className="text-[10px] uppercase tracking-wide-luxe text-forest-light"
      >
        {label}
      </label>
      <select
        id={id}
        name={name}
        className="block w-full min-w-0 max-w-full cursor-pointer border-b border-forest/15 bg-transparent pb-2 font-sans-body text-sm text-forest-deep outline-none transition-colors focus:border-gold"
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}
