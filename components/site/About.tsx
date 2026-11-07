'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Leaf, ShieldCheck, Sparkles, HeartHandshake } from 'lucide-react';
import { Reveal } from '@/components/motion/Reveal';
import { MagneticButton } from '@/components/motion/MagneticButton';
import { ABOUT_IMAGE_PRIMARY, ABOUT_IMAGE_SECONDARY } from '@/lib/data';

const PILLARS = [
  {
    icon: Leaf,
    title: 'Nature',
    text: 'Set within 40 acres of protected rainforest and coral coastline.',
  },
  {
    icon: ShieldCheck,
    title: 'Privacy',
    text: 'Secluded villas designed for uninterrupted, intimate serenity.',
  },
  {
    icon: Sparkles,
    title: 'Luxury',
    text: 'Considered detail, bespoke service, and timeless craftsmanship.',
  },
  {
    icon: HeartHandshake,
    title: 'Hospitality',
    text: 'A culture of warmth where every guest is quietly known by name.',
  },
];

export function About() {
  const prefersReduced = useReducedMotion();
  return (
    <section id="about" className="relative bg-background py-24 lg:py-36">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {/* Asymmetric editorial layout */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
          {/* Images */}
          <div className="relative lg:col-span-6">
            <Reveal className="relative">
              <div className="overflow-hidden rounded-sm">
                <motion.img
                  src={ABOUT_IMAGE_PRIMARY}
                  alt="Villa interior opening onto tropical gardens"
                  loading="lazy"
                  className="aspect-[4/5] w-full object-cover"
                  initial={prefersReduced ? { opacity: 0 } : { opacity: 0, scale: 1.12 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>
            </Reveal>
            <Reveal delay={0.2} className="absolute -bottom-10 -right-4 hidden w-56 overflow-hidden rounded-sm border-8 border-background shadow-xl sm:block lg:w-72">
              <motion.img
                src={ABOUT_IMAGE_SECONDARY}
                alt="Beachfront resort with pools and palm trees"
                loading="lazy"
                className="aspect-[4/3] w-full object-cover"
                initial={prefersReduced ? { opacity: 0 } : { opacity: 0, scale: 1.15 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 1.3, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              />
            </Reveal>
            {/* Decorative number */}
            <div className="pointer-events-none absolute -left-4 -top-16 select-none font-serif-display text-[10rem] leading-none text-forest/5 lg:text-[14rem]">
              01
            </div>
          </div>

          {/* Text */}
          <div className="flex flex-col justify-center lg:col-span-6 lg:pl-6">
            <Reveal>
              <div className="mb-6 flex items-center gap-3">
                <span className="h-px w-8 bg-gold/70" />
                <span className="text-[11px] uppercase tracking-luxe text-gold">
                  Our Sanctuary
                </span>
              </div>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="font-serif-display text-4xl font-light leading-[1.1] text-forest-deep sm:text-5xl lg:text-[3.4rem]">
                Where the rainforest
                <br />
                <span className="italic text-forest-light">meets the reef.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mt-7 max-w-xl text-base leading-relaxed text-foreground/70">
                Amarya was born from a simple belief — that true luxury is the
                feeling of being entirely present in nature. Tucked between an
                ancient rainforest and a protected coral bay, our resort is a
                quiet act of devotion to the land it rests upon.
              </p>
            </Reveal>
            <Reveal delay={0.18}>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-foreground/70">
                Every villa, every dish, every ritual is shaped by the rhythms
                of the island. Here, time slows. The senses awaken. And
                hospitality becomes something felt, rather than performed.
              </p>
            </Reveal>

            {/* Pillars */}
            <div className="mt-12 grid grid-cols-2 gap-x-8 gap-y-7">
              {PILLARS.map((p, i) => (
                <Reveal key={p.title} delay={0.1 + i * 0.08}>
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gold/40 text-gold">
                      <p.icon className="h-4 w-4" strokeWidth={1.5} />
                    </span>
                    <div>
                      <h3 className="font-serif-display text-xl text-forest-deep">
                        {p.title}
                      </h3>
                      <p className="mt-1 text-sm leading-relaxed text-foreground/60">
                        {p.text}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.3}>
              <MagneticButton
                as="a"
                href="#experiences"
                className="group mt-12 inline-flex items-center gap-2 text-[12px] font-sans-body uppercase tracking-wide-luxe text-forest-deep"
              >
                <span className="border-b border-forest/30 pb-1 transition-colors group-hover:border-gold">
                  Explore Our Story
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
