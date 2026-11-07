'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, Users, Maximize } from 'lucide-react';
import { ROOMS } from '@/lib/data';
import { SectionHeading } from '@/components/motion/SectionHeading';
import { Reveal } from '@/components/motion/Reveal';
import { MagneticButton } from '@/components/motion/MagneticButton';

export function Rooms() {
  const prefersReduced = useReducedMotion();
  return (
    <section id="rooms" className="relative bg-beige/40 py-24 lg:py-36">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Accommodation"
          title="Villas shaped by light and landscape"
          description="Four distinct sanctuaries, each a private world of its own — designed for stillness, intimacy, and a deep connection to the surroundings."
        />

        <div className="mt-16 grid grid-cols-1 gap-7 md:grid-cols-2">
          {ROOMS.map((room, i) => (
            <Reveal key={room.id} delay={i * 0.1}>
              <article className="group relative overflow-hidden rounded-sm bg-card shadow-[0_10px_40px_-20px_rgba(20,40,28,0.3)] transition-shadow duration-500 hover:shadow-[0_24px_60px_-24px_rgba(20,40,28,0.45)]">
                {/* Image */}
                <div className="relative h-72 overflow-hidden sm:h-80">
                  <motion.img
                    src={room.image}
                    alt={room.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
                    initial={prefersReduced ? { opacity: 0 } : { opacity: 0, scale: 1.1 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/60 via-transparent to-transparent opacity-70" />
                  <div className="absolute left-5 top-5 flex items-center gap-2 rounded-full glass-light px-3 py-1.5 text-[11px] font-sans-body text-forest-deep">
                    <span className="font-serif-display text-base text-gold">
                      ${room.price}
                    </span>
                    <span className="text-forest-light">/ night</span>
                  </div>
                  <div className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full bg-ivory/90 text-forest-deep opacity-0 transition-all duration-500 group-hover:opacity-100">
                    <ArrowUpRight className="h-5 w-5" strokeWidth={1.5} />
                  </div>
                </div>

                {/* Body */}
                <div className="px-6 py-7 sm:px-8">
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="font-serif-display text-2xl text-forest-deep sm:text-3xl">
                      {room.name}
                    </h3>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-foreground/65">
                    {room.description}
                  </p>

                  <div className="mt-6 flex items-center gap-5 text-[12px] font-sans-body text-forest-light">
                    <span className="flex items-center gap-1.5">
                      <Users className="h-4 w-4" strokeWidth={1.5} />
                      {room.capacity}
                    </span>
                    <span className="h-3 w-px bg-forest/15" />
                    <span className="flex items-center gap-1.5">
                      <Maximize className="h-4 w-4" strokeWidth={1.5} />
                      {room.size}
                    </span>
                  </div>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {room.amenities.map((a) => (
                      <span
                        key={a}
                        className="rounded-full bg-beige px-3 py-1 text-[11px] font-sans-body text-forest-light"
                      >
                        {a}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2} className="mt-14 flex justify-center">
          <MagneticButton
            as="a"
            href="#offers"
            className="group rounded-full border border-forest/30 px-8 py-4 text-[12px] font-sans-body uppercase tracking-wide-luxe text-forest-deep transition-colors hover:bg-forest hover:text-ivory"
          >
            Explore Rooms
            <ArrowUpRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </MagneticButton>
        </Reveal>
      </div>
    </section>
  );
}
