'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { NAV_LINKS } from '@/lib/data';
import { cn } from '@/lib/utils';
import { MagneticButton } from '@/components/motion/MagneticButton';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setScrolled(latest > 60);
  });

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          'fixed inset-x-0 top-0 z-50 transition-all duration-500',
          scrolled
            ? 'py-3 glass-light shadow-[0_8px_30px_-12px_rgba(20,40,28,0.25)]'
            : 'py-5 bg-transparent',
        )}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 sm:px-8">
          {/* Logo */}
          <a
            href="#home"
            className={cn(
              'group flex items-center gap-2 transition-colors duration-500',
              scrolled ? 'text-forest-deep' : 'text-ivory',
            )}
          >
            <span className="font-serif-display text-2xl font-medium tracking-wide leading-none">
              Amarya
            </span>
            <span
              className={cn(
                'hidden text-[10px] uppercase tracking-luxe transition-colors duration-500 sm:block',
                scrolled ? 'text-gold' : 'text-gold-soft',
              )}
            >
              Resort &amp; Spa
            </span>
          </a>

          {/* Desktop links */}
          <ul
            className={cn(
              'hidden items-center gap-9 transition-colors duration-500 lg:flex',
              scrolled ? 'text-forest-deep' : 'text-ivory',
            )}
          >
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="group relative text-[13px] font-sans-body uppercase tracking-wide-luxe transition-opacity hover:opacity-100"
                >
                  <span className="opacity-80 transition-opacity group-hover:opacity-100">
                    {link.label}
                  </span>
                  <span
                    className={cn(
                      'absolute -bottom-1.5 left-0 h-px w-0 transition-all duration-500 group-hover:w-full',
                      scrolled ? 'bg-forest' : 'bg-gold-soft',
                    )}
                  />
                </a>
              </li>
            ))}
          </ul>

          <div className="hidden lg:block">
            <MagneticButton
              as="a"
              href="#offers"
              className={cn(
                'rounded-full px-6 py-2.5 text-[12px] font-sans-body uppercase tracking-wide-luxe transition-colors duration-500',
                scrolled
                  ? 'bg-forest text-ivory hover:bg-forest-deep'
                  : 'border border-ivory/40 text-ivory hover:bg-ivory hover:text-forest-deep',
              )}
            >
              Book Your Stay
            </MagneticButton>
          </div>

          {/* Mobile toggle */}
          <button
            aria-label="Open menu"
            onClick={() => setOpen(true)}
            className={cn(
              'lg:hidden transition-colors duration-500',
              scrolled ? 'text-forest-deep' : 'text-ivory',
            )}
          >
            <Menu className="h-6 w-6" strokeWidth={1.5} />
          </button>
        </nav>
      </motion.header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[60] bg-forest-deep/95 backdrop-blur-xl lg:hidden"
          >
            <div className="flex items-center justify-between px-6 py-6">
              <span className="font-serif-display text-2xl text-ivory">Amarya</span>
              <button
                aria-label="Close menu"
                onClick={() => setOpen(false)}
                className="text-ivory"
              >
                <X className="h-6 w-6" strokeWidth={1.5} />
              </button>
            </div>
            <motion.ul
              className="flex flex-col gap-2 px-6 pt-10"
              initial="hidden"
              animate="show"
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
              }}
            >
              {NAV_LINKS.map((link) => (
                <motion.li
                  key={link.href}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    show: { opacity: 1, y: 0 },
                  }}
                >
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block border-b border-ivory/10 py-4 font-serif-display text-3xl font-light text-ivory transition-colors hover:text-gold-soft"
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
              <motion.li
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show: { opacity: 1, y: 0 },
                }}
                className="pt-8"
              >
                <a
                  href="#offers"
                  onClick={() => setOpen(false)}
                  className="inline-block rounded-full bg-gold px-8 py-3.5 text-[12px] font-sans-body uppercase tracking-wide-luxe text-forest-deep"
                >
                  Book Your Stay
                </a>
              </motion.li>
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
