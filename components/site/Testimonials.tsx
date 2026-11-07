'use client';

import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { TESTIMONIALS } from '@/lib/data';
import { SectionHeading } from '@/components/motion/SectionHeading';

export function Testimonials() {
  const [active, setActive] = useState(0);
  const [dir, setDir] = useState(1);
  const prefersReduced = useReducedMotion();
  const count = TESTIMONIALS.length;

  const go = useCallback((next: number, direction = 1) => {
    setDir(direction);
    setActive((n) => (next + count) % count);
  }, [count]);

  useEffect(() => {
    if (prefersReduced) return;
    const id = setInterval(() => go(active + 1, 1), 6500);
    return () => clearInterval(id);
  }, [active, go, prefersReduced]);

  const t = TESTIMONIALS[active];

  return (
    <section className="relative overflow-hidden bg-forest-deep py-24 lg:py-36">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute -left-40 top-1/3 h-96 w-96 rounded-full bg-gold/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-40 bottom-1/4 h-96 w-96 rounded-full bg-forest-light/20 blur-3xl" />

      <div className="relative mx-auto max-w-4xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Guest Stories"
          title="Words from those who wandered here"
          light
        />

        <div className="relative mt-16 min-h-[280px] sm:min-h-[240px]">
          <AnimatePresence mode="wait" custom={dir}>
            <motion.div
              key={t.id}
              custom={dir}
              initial={prefersReduced ? { opacity: 0 } : { opacity: 0, x: dir * 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={prefersReduced ? { opacity: 0 } : { opacity: 0, x: dir * -60 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-center text-center"
            >
              <Quote className="h-10 w-10 text-gold-soft/70" strokeWidth={1} />
              <div className="mt-5 flex gap-1">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-gold text-gold" strokeWidth={0} />
                ))}
              </div>
              <p className="mt-6 max-w-2xl font-serif-display text-2xl font-light leading-[1.5] text-ivory sm:text-3xl lg:text-[2.1rem]">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="mt-8">
                <p className="font-sans-body text-sm uppercase tracking-wide-luxe text-ivory">
                  {t.name}
                </p>
                <p className="mt-1 text-[12px] text-ivory/55">{t.origin}</p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Controls */}
        <div className="mt-10 flex items-center justify-center gap-6">
          <button
            aria-label="Previous testimonial"
            onClick={() => go(active - 1, -1)}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-ivory/25 text-ivory transition-colors hover:bg-ivory/10"
          >
            <ChevronLeft className="h-5 w-5" strokeWidth={1.5} />
          </button>

          <div className="flex gap-2">
            {TESTIMONIALS.map((item, i) => (
              <button
                key={item.id}
                aria-label={`Go to testimonial ${i + 1}`}
                onClick={() => go(i, i > active ? 1 : -1)}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  i === active ? 'w-8 bg-gold' : 'w-1.5 bg-ivory/30 hover:bg-ivory/50'
                }`}
              />
            ))}
          </div>

          <button
            aria-label="Next testimonial"
            onClick={() => go(active + 1, 1)}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-ivory/25 text-ivory transition-colors hover:bg-ivory/10"
          >
            <ChevronRight className="h-5 w-5" strokeWidth={1.5} />
          </button>
        </div>
      </div>
    </section>
  );
}
