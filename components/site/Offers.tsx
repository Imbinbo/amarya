'use client';

import { useState, useCallback } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Tag, Loader2 } from 'lucide-react';
import { OFFERS } from '@/lib/data';
import { SectionHeading } from '@/components/motion/SectionHeading';
import { Reveal } from '@/components/motion/Reveal';
import { MagneticButton } from '@/components/motion/MagneticButton';
import { useToast } from '@/hooks/use-toast';

export function Offers() {
  const prefersReduced = useReducedMotion();
  const { toast } = useToast();
  const [reserving, setReserving] = useState<string | null>(null);

  const handleReserve = useCallback(
    async (offerTitle: string) => {
      setReserving(offerTitle);
      try {
        const response = await fetch('/api/booking-enquiries', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action: 'package', offer: offerTitle }),
        });
        if (!response.ok) throw new Error('Package reservation failed');
        toast({
          title: `${offerTitle} reserved`,
          description:
            'Our concierge will be in touch to personalise your package.',
        });
      } catch {
        toast({
          title: 'Something went wrong',
          description:
            'We could not reserve this package just now. Please try again.',
        });
      } finally {
        setReserving(null);
      }
    },
    [toast],
  );

  return (
    <section id="offers" className="relative bg-background py-24 lg:py-36">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Special Offers"
          title="Seasonal escapes & curated packages"
          description="Considered ways to stay longer, celebrate more, and discover Amarya at its most enchanting."
        />

        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2">
          {OFFERS.map((offer, i) => (
            <Reveal key={offer.id} delay={i * 0.1}>
              <article
                className={`group relative overflow-hidden rounded-sm ${
                  offer.featured ? 'md:col-span-2' : ''
                }`}
              >
                <div className={`relative ${offer.featured ? 'aspect-[2/1] sm:aspect-[5/2]' : 'aspect-[4/3]'} overflow-hidden`}>
                  <motion.img
                    src={offer.image}
                    alt={offer.title}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.3s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
                    initial={prefersReduced ? { opacity: 0 } : { opacity: 0, scale: 1.1 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-forest-deep/85 via-forest-deep/45 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/60 to-transparent" />

                  {/* Tag */}
                  <div className="absolute left-5 top-5 flex items-center gap-2 rounded-full bg-gold/90 px-3 py-1.5 text-[10px] font-sans-body uppercase tracking-wide-luxe text-forest-deep">
                    <Tag className="h-3 w-3" strokeWidth={2} />
                    {offer.tag}
                  </div>

                  {/* Content */}
                  <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-8 lg:p-10">
                    <h3 className={`font-serif-display font-light text-ivory ${offer.featured ? 'text-4xl sm:text-5xl' : 'text-3xl'}`}>
                      {offer.title}
                    </h3>
                    <p className="mt-3 max-w-md text-sm leading-relaxed text-ivory/80">
                      {offer.description}
                    </p>
                    <div className="mt-5 flex flex-wrap items-center gap-4">
                      <span className="text-[12px] font-sans-body uppercase tracking-wide-luxe text-gold-soft">
                        {offer.details}
                      </span>
                      <MagneticButton
                        onClick={() => handleReserve(offer.title)}
                        disabled={reserving === offer.title}
                        className="group/btn inline-flex items-center gap-2 rounded-full bg-ivory px-5 py-2.5 text-[11px] font-sans-body uppercase tracking-wide-luxe text-forest-deep transition-colors hover:bg-gold disabled:opacity-60"
                      >
                        {reserving === offer.title ? (
                          <>
                            <Loader2 className="h-3.5 w-3.5 animate-spin" />
                            Reserving
                          </>
                        ) : (
                          <>
                            Reserve
                            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover/btn:translate-x-1" />
                          </>
                        )}
                      </MagneticButton>
                    </div>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
