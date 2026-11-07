'use client';

import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { GALLERY_IMAGES } from '@/lib/data';
import { SectionHeading } from '@/components/motion/SectionHeading';
import { Reveal } from '@/components/motion/Reveal';

export function Gallery() {
  const [index, setIndex] = useState<number | null>(null);
  const prefersReduced = useReducedMotion();
  const isOpen = index !== null;

  const close = () => setIndex(null);
  const prev = () =>
    setIndex((i) => (i === null ? null : (i - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length));
  const next = () =>
    setIndex((i) => (i === null ? null : (i + 1) % GALLERY_IMAGES.length));

  return (
    <section id="gallery" className="relative bg-background py-24 lg:py-36">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Gallery"
          title="A glimpse of life at Amarya"
          description="Cinematic moments captured across our villas, shores, and rainforest — each frame an invitation to imagine your stay."
        />

        <div className="mt-16 grid auto-rows-[220px] grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {GALLERY_IMAGES.map((img, i) => (
            <Reveal
              key={img.src}
              delay={(i % 4) * 0.06}
              className={img.span}
            >
              <button
                onClick={() => setIndex(i)}
                className="group relative h-full w-full overflow-hidden rounded-sm"
                aria-label={`Open image: ${img.alt}`}
              >
                <motion.img
                  src={img.src}
                  alt={img.alt}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
                  initial={prefersReduced ? { opacity: 0 } : { opacity: 0, scale: 1.1 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                />
                <div className="absolute inset-0 bg-forest-deep/0 transition-colors duration-500 group-hover:bg-forest-deep/30" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  <span className="rounded-full glass px-4 py-2 text-[11px] uppercase tracking-wide-luxe text-ivory">
                    View
                  </span>
                </div>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[80] flex items-center justify-center bg-forest-deep/90 backdrop-blur-md"
            onClick={close}
          >
            <button
              aria-label="Close"
              onClick={close}
              className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full text-ivory transition-colors hover:bg-ivory/10"
            >
              <X className="h-6 w-6" strokeWidth={1.5} />
            </button>

            <button
              aria-label="Previous"
              onClick={(e) => { e.stopPropagation(); prev(); }}
              className="absolute left-3 flex h-12 w-12 items-center justify-center rounded-full text-ivory transition-colors hover:bg-ivory/10 sm:left-8"
            >
              <ChevronLeft className="h-7 w-7" strokeWidth={1.5} />
            </button>

            <motion.img
              key={index}
              src={GALLERY_IMAGES[index!].src}
              alt={GALLERY_IMAGES[index!].alt}
              className="max-h-[82vh] max-w-[90vw] rounded-sm object-contain"
              initial={prefersReduced ? { opacity: 0 } : { opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
            />

            <button
              aria-label="Next"
              onClick={(e) => { e.stopPropagation(); next(); }}
              className="absolute right-3 flex h-12 w-12 items-center justify-center rounded-full text-ivory transition-colors hover:bg-ivory/10 sm:right-8"
            >
              <ChevronRight className="h-7 w-7" strokeWidth={1.5} />
            </button>

            <span className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[11px] uppercase tracking-luxe text-ivory/60">
              {index! + 1} / {GALLERY_IMAGES.length}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
