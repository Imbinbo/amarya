'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Clock, Leaf } from 'lucide-react';
import { DINING_IMAGE, DINING_PLATE_IMAGE } from '@/lib/data';
import { Reveal } from '@/components/motion/Reveal';
import { MagneticButton } from '@/components/motion/MagneticButton';

const MENUS = [
  {
    name: 'Sirena',
    type: 'Ocean-to-table fine dining',
    hours: 'Dinner · 6:30 – 10:30 PM',
    note: 'A seasonal tasting menu drawn from the day\'s catch and foraged gardens.',
  },
  {
    name: 'Ember',
    type: 'Open-fire grill & raw bar',
    hours: 'Lunch & Dinner · 12:00 – 11:00 PM',
    note: 'Wood-fired local produce, line-caught fish, and an island raw selection.',
  },
  {
    name: 'Canopy Lounge',
    type: 'Cocktails & light plates',
    hours: 'All day · 10:00 AM – late',
    note: 'Botanical cocktails and small plates beneath the lantern-lit trees.',
  },
];

export function Dining() {
  const prefersReduced = useReducedMotion();
  return (
    <section id="dining" className="relative bg-beige/40 py-24 lg:py-36">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Image side */}
          <div className="relative">
            <Reveal>
              <div className="overflow-hidden rounded-sm">
                <motion.img
                  src={DINING_IMAGE}
                  alt="Elegant restaurant table with plated dishes and wine"
                  loading="lazy"
                  className="aspect-[4/3] w-full object-cover"
                  initial={prefersReduced ? { opacity: 0 } : { opacity: 0, scale: 1.12 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>
            </Reveal>
            <Reveal delay={0.18} className="absolute -bottom-12 -right-4 hidden w-52 overflow-hidden rounded-sm border-8 border-beige/40 shadow-xl sm:block lg:w-64">
              <motion.img
                src={DINING_PLATE_IMAGE}
                alt="Gourmet plated dish on marble table"
                loading="lazy"
                className="aspect-square w-full object-cover"
                initial={prefersReduced ? { opacity: 0 } : { opacity: 0, scale: 1.15 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 1.3, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
              />
            </Reveal>
          </div>

          {/* Text side */}
          <div className="flex flex-col justify-center">
            <Reveal>
              <div className="mb-6 flex items-center gap-3">
                <span className="h-px w-8 bg-gold/70" />
                <span className="text-[11px] uppercase tracking-luxe text-gold">
                  Dining
                </span>
              </div>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="font-serif-display text-4xl font-light leading-[1.1] text-forest-deep sm:text-5xl lg:text-[3.4rem]">
                A table set by
                <br />
                <span className="italic text-forest-light">land and sea.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mt-7 max-w-lg text-base leading-relaxed text-foreground/70">
                Three distinct venues, one philosophy. Our chefs work hand in
                hand with island fishermen, farmers, and foragers to shape menus
                that honour the season, the soil, and the sea — served in
                settings as memorable as the plates themselves.
              </p>
            </Reveal>

            <div className="mt-10 space-y-px overflow-hidden rounded-sm bg-card shadow-[0_10px_40px_-24px_rgba(20,40,28,0.3)]">
              {MENUS.map((m, i) => (
                <Reveal key={m.name} delay={0.16 + i * 0.08}>
                  <div className="group flex items-center justify-between gap-4 border-b border-forest/8 px-6 py-5 transition-colors last:border-0 hover:bg-beige/50">
                    <div>
                      <h3 className="font-serif-display text-2xl text-forest-deep">
                        {m.name}
                      </h3>
                      <p className="mt-0.5 text-sm text-foreground/60">{m.type}</p>
                      <p className="mt-2 flex items-center gap-2 text-[12px] font-sans-body text-forest-light">
                        <Clock className="h-3.5 w-3.5" strokeWidth={1.5} />
                        {m.hours}
                      </p>
                    </div>
                    <Leaf className="h-5 w-5 shrink-0 text-gold/60 transition-transform group-hover:rotate-12" strokeWidth={1.5} />
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.3}>
              <MagneticButton
                as="a"
                href="#contact"
                className="group mt-10 inline-flex items-center gap-2 text-[12px] font-sans-body uppercase tracking-wide-luxe text-forest-deep"
              >
                <span className="border-b border-forest/30 pb-1 transition-colors group-hover:border-gold">
                  Discover Dining
                </span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </MagneticButton>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
