'use client';

import { useState, type FormEvent } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Loader2 } from 'lucide-react';
import { FINAL_CTA_IMAGE } from '@/lib/data';
import { MagneticButton } from '@/components/motion/MagneticButton';
import { useToast } from '@/hooks/use-toast';

export function FinalCTA() {
  const prefersReduced = useReducedMotion();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 3000], ['-10%', '15%']);
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);

  const handleReserve = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const email = (new FormData(form).get('email') as string) || '';
    setSubmitting(true);
    try {
      const response = await fetch('/api/booking-enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'reservation', email }),
      });
      if (!response.ok) throw new Error('Reservation request failed');
      form.reset();
      toast({
        title: 'Reservation request received',
        description:
          'Our concierge team will reach out within 24 hours to craft your stay.',
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
    <section className="relative h-[100svh] min-h-[560px] w-full overflow-hidden">
      <motion.div
        style={prefersReduced ? undefined : { y }}
        className="absolute inset-0"
      >
        <img
          src={FINAL_CTA_IMAGE}
          alt="Tropical beach at sunset with palm trees"
          className="h-full w-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-forest-deep/60 via-forest-deep/40 to-forest-deep/80" />
      </motion.div>

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-5 text-center">
        <motion.span
          initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mb-6 flex items-center gap-3 text-[11px] uppercase tracking-luxe text-gold-soft"
        >
          <span className="h-px w-8 bg-gold-soft/60" />
          Amarya Awaits
          <span className="h-px w-8 bg-gold-soft/60" />
        </motion.span>

        <motion.h2
          initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl font-serif-display text-4xl font-light leading-[1.1] text-ivory text-shadow-luxe sm:text-6xl lg:text-[4.5rem]"
        >
          Your escape is just
          <br />
          <span className="italic text-gold-soft">one booking away.</span>
        </motion.h2>

        <motion.form
          onSubmit={handleReserve}
          initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 flex w-full max-w-md flex-col items-center gap-3 sm:flex-row"
        >
          <input
            type="email"
            name="email"
            required
            placeholder="Your email"
            aria-label="Your email"
            className="w-full flex-1 rounded-full border border-ivory/40 bg-ivory/10 px-6 py-3.5 font-sans-body text-sm text-ivory placeholder:text-ivory/60 outline-none backdrop-blur-sm transition-colors focus:border-gold-soft [color-scheme:dark]"
          />
          <MagneticButton
            type="submit"
            disabled={submitting}
            className="group flex w-full items-center justify-center gap-2 rounded-full bg-gold px-7 py-3.5 text-[12px] font-sans-body uppercase tracking-wide-luxe text-forest-deep transition-colors hover:bg-ivory disabled:opacity-60 sm:w-auto"
          >
            {submitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Sending
              </>
            ) : (
              <>
                Reserve Your Stay
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </>
            )}
          </MagneticButton>
        </motion.form>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
          className="mt-5 text-[12px] text-ivory/55"
        >
          No deposit required to enquire. Our concierge replies within 24 hours.
        </motion.p>
      </div>
    </section>
  );
}
