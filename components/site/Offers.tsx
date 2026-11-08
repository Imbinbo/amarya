'use client';

import { useState, useCallback, useEffect, useRef, type FormEvent } from 'react';
import { createPortal } from 'react-dom';
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
  const [selectedOffer, setSelectedOffer] = useState<string | null>(null);
  const [portalReady, setPortalReady] = useState(false);
  const emailInputRef = useRef<HTMLInputElement>(null);

  // A portal keeps the dialog outside animated/overflow-hidden page sections.
  useEffect(() => {
    setPortalReady(true);
  }, []);

  // Lock background scrolling and support Escape while the dialog is open.
  useEffect(() => {
    if (!selectedOffer) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.body.classList.add('offer-modal-open');

    // Move keyboard focus into the modal after it is mounted.
    const focusTimer = window.setTimeout(() => emailInputRef.current?.focus(), 50);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && !reserving) setSelectedOffer(null);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.body.classList.remove('offer-modal-open');
      window.clearTimeout(focusTimer);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedOffer, reserving]);

  const handleReserve = useCallback((offerTitle: string) => {
    setSelectedOffer(offerTitle);
  }, []);

  const closeModal = () => {
    if (!reserving) setSelectedOffer(null);
  };

  const submitOfferEnquiry = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!selectedOffer || reserving) return;

    const form = event.currentTarget;
    const formData = new FormData(form);
    const email = String(formData.get('email') || '').trim();
    const phone = String(formData.get('phone') || '').trim();

    setReserving(selectedOffer);
    try {
      const response = await fetch('/api/booking-enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'package', offer: selectedOffer, email, phone }),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(result.error || 'Package reservation failed');

      toast({
        title: `${selectedOffer} request received`,
        description: 'Our concierge will be in touch to personalise your package.',
      });
      form.reset();
      setSelectedOffer(null);
    } catch (error) {
      toast({
        title: 'Something went wrong',
        description: error instanceof Error ? error.message : 'We could not reserve this package just now. Please try again.',
      });
    } finally {
      setReserving(null);
    }
  };

  return (
    <>
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

                    <div className="absolute left-5 top-5 flex items-center gap-2 rounded-full bg-gold/90 px-3 py-1.5 text-[10px] font-sans-body uppercase tracking-wide-luxe text-forest-deep">
                      <Tag className="h-3 w-3" strokeWidth={2} />
                      {offer.tag}
                    </div>

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
                            <><Loader2 className="h-3.5 w-3.5 animate-spin" /> Reserving</>
                          ) : (
                            <>Reserve <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover/btn:translate-x-1" /></>
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

      {portalReady && selectedOffer && createPortal(
        <div
          className="offer-modal fixed inset-0 z-[9999] flex items-center justify-center overflow-y-auto overscroll-contain bg-forest-deep/75 px-4 py-8 backdrop-blur-sm"
          role="presentation"
          onClick={(event) => {
            if (event.target === event.currentTarget) closeModal();
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="offer-enquiry-title"
            className="relative z-[10000] my-auto w-full max-w-md touch-auto rounded-sm bg-background p-6 text-forest-deep shadow-2xl sm:p-8"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              aria-label="Close reservation form"
              onClick={closeModal}
              disabled={!!reserving}
              className="absolute right-4 top-4 z-10 cursor-pointer p-2 text-2xl leading-none text-forest/60 hover:text-forest disabled:cursor-not-allowed"
            >
              ×
            </button>

            <p className="text-[10px] uppercase tracking-luxe text-gold">Special offer enquiry</p>
            <h3 id="offer-enquiry-title" className="mt-2 pr-8 font-serif-display text-3xl font-light">
              {selectedOffer}
            </h3>
            <p className="mt-2 text-sm text-forest/70">
              Share your contact details and our concierge will get in touch.
            </p>

            <form onSubmit={submitOfferEnquiry} className="relative z-[10001] mt-6 space-y-4" noValidate={false}>
              <div>
                <label htmlFor="offer-email" className="mb-1.5 block text-xs uppercase tracking-wide-luxe text-forest/70">Email address</label>
                <input
                  id="offer-email"
                  name="email"
                  type="email"
                  required
                  ref={emailInputRef}
                  autoComplete="email"
                  placeholder="you@example.com"
                  className="offer-modal-control relative z-[10002] block w-full touch-auto cursor-text select-text border border-forest/20 bg-transparent px-4 py-3 text-sm text-forest-deep outline-none focus:border-gold focus:ring-1 focus:ring-gold"
                />
              </div>
              <div>
                <label htmlFor="offer-phone" className="mb-1.5 block text-xs uppercase tracking-wide-luxe text-forest/70">Phone number</label>
                <input
                  id="offer-phone"
                  name="phone"
                  type="tel"
                  required
                  autoComplete="tel"
                  inputMode="tel"
                  pattern="[+0-9()\s.-]{7,25}"
                  title="Enter a valid phone number"
                  placeholder="+91 98765 43210"
                  className="offer-modal-control relative z-[10002] block w-full touch-auto cursor-text select-text border border-forest/20 bg-transparent px-4 py-3 text-sm text-forest-deep outline-none focus:border-gold focus:ring-1 focus:ring-gold"
                />
              </div>
              <button
                type="submit"
                disabled={!!reserving}
                className="relative z-[10002] flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-forest px-6 py-3.5 text-xs uppercase tracking-wide-luxe text-ivory transition-colors hover:bg-forest-deep disabled:cursor-wait disabled:opacity-60"
              >
                {reserving ? <><Loader2 className="h-4 w-4 animate-spin" /> Sending</> : <>Send reservation request <ArrowRight className="h-4 w-4" /></>}
              </button>
            </form>
          </div>
        </div>,
        document.body,
      )}
    </>
  );
}
