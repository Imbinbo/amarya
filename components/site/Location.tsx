'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { MapPin, Plane, Navigation } from 'lucide-react';
import { NEARBY, LOCATION_IMAGE } from '@/lib/data';
import { SectionHeading } from '@/components/motion/SectionHeading';
import { Reveal } from '@/components/motion/Reveal';

export function Location() {
  const prefersReduced = useReducedMotion();
  return (
    <section id="contact" className="relative bg-background py-24 lg:py-36">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Location"
          title="Find your way to the wild"
          description="A short journey from the airport to a different pace of life. Coordinates and travel notes below."
        />

        <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Map visual */}
          <Reveal>
            <div className="relative h-full min-h-[360px] overflow-hidden rounded-sm">
              <motion.img
                src={LOCATION_IMAGE}
                alt="Aerial view of the tropical coastline near Amarya resort"
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover"
                initial={prefersReduced ? { opacity: 0 } : { opacity: 0, scale: 1.12 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1] }}
              />
              <div className="absolute inset-0 bg-forest-deep/30" />

              {/* Pin marker */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <motion.span
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3, type: 'spring', stiffness: 200 }}
                  className="relative flex h-6 w-6 items-center justify-center"
                >
                  <span className="absolute h-full w-full animate-ping rounded-full bg-gold/50" />
                  <MapPin className="relative h-8 w-8 text-gold drop-shadow-lg" fill="currentColor" strokeWidth={0} />
                </motion.span>
              </div>

              <div className="absolute bottom-5 left-5 right-5 glass-dark rounded-sm px-5 py-4">
                <p className="font-serif-display text-xl text-ivory">Amarya Resort &amp; Spa</p>
                <p className="mt-1 flex items-center gap-2 text-[12px] text-ivory/70">
                  <Navigation className="h-3.5 w-3.5 text-gold-soft" strokeWidth={1.5} />
                  Coral Bay, Rainforest Coast · Island Nation
                </p>
              </div>
            </div>
          </Reveal>

          {/* Nearby + travel info */}
          <div className="flex flex-col justify-center">
            <Reveal>
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/40 text-gold">
                  <Plane className="h-4 w-4" strokeWidth={1.5} />
                </span>
                <div>
                  <h3 className="font-serif-display text-2xl text-forest-deep">
                    Getting Here
                  </h3>
                  <p className="text-sm text-foreground/60">
                    45 minutes by private road transfer &amp; resort boat.
                  </p>
                </div>
              </div>
            </Reveal>

            <div className="mt-10">
              <Reveal delay={0.08}>
                <p className="mb-5 text-[11px] uppercase tracking-luxe text-gold">
                  Nearby Attractions
                </p>
              </Reveal>
              <div className="divide-y divide-forest/8 overflow-hidden rounded-sm border border-forest/8">
                {NEARBY.map((place, i) => (
                  <Reveal key={place.name} delay={0.1 + i * 0.06}>
                    <div className="group flex items-center justify-between gap-4 bg-card px-5 py-4 transition-colors hover:bg-beige/40">
                      <span className="flex items-center gap-3 font-sans-body text-sm text-forest-deep">
                        <span className="font-serif-display text-lg text-gold/70">
                          0{i + 1}
                        </span>
                        {place.name}
                      </span>
                      <span className="text-[12px] font-sans-body text-forest-light">
                        {place.distance}
                      </span>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
