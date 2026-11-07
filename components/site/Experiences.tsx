'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { EXPERIENCES } from '@/lib/data';
import { SectionHeading } from '@/components/motion/SectionHeading';
import { Reveal } from '@/components/motion/Reveal';

export function Experiences() {
  const prefersReduced = useReducedMotion();
  return (
    <section id="experiences" className="relative bg-forest-deep py-24 lg:py-36">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Experiences"
          title="Curated moments beyond the ordinary"
          description="From horizon-edge stillness to forest adventures and candlelit shores — every experience is designed to deepen your connection to this place."
          light
        />

        <div className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {EXPERIENCES.map((exp, i) => (
            <Reveal
              key={exp.id}
              delay={i * 0.08}
              className={i === 0 ? 'lg:row-span-2' : ''}
            >
              <article className="group relative h-full min-h-[300px] cursor-pointer overflow-hidden rounded-sm">
                <motion.img
                  src={exp.image}
                  alt={exp.title}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.3s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
                  initial={prefersReduced ? { opacity: 0 } : { opacity: 0, scale: 1.12 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/85 via-forest-deep/20 to-transparent" />
                <div className="absolute inset-0 bg-forest-deep/10 transition-colors duration-500 group-hover:bg-forest-deep/0" />

                <div className="absolute inset-0 flex flex-col justify-end p-6">
                  <motion.div
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: 0.1 }}
                  >
                    <h3 className="font-serif-display text-2xl text-ivory sm:text-3xl">
                      {exp.title}
                    </h3>
                    <div className="mt-2 max-h-0 overflow-hidden opacity-0 transition-all duration-500 group-hover:max-h-24 group-hover:opacity-100">
                      <p className="text-sm leading-relaxed text-ivory/80">
                        {exp.blurb}
                      </p>
                    </div>
                  </motion.div>
                </div>

                {/* Index marker */}
                <span className="absolute right-5 top-5 font-serif-display text-sm text-ivory/50">
                  0{i + 1}
                </span>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
