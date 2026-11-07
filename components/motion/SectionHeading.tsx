'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/utils';

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  align?: 'left' | 'center';
  light?: boolean;
  className?: string;
  description?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  align = 'center',
  light = false,
  className,
  description,
}: SectionHeadingProps) {
  const prefersReduced = useReducedMotion();
  const centered = align === 'center';

  return (
    <div
      className={cn(
        'flex flex-col gap-5',
        centered ? 'items-center text-center' : 'items-start text-left',
        className,
      )}
    >
      <motion.div
        initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="flex items-center gap-3"
      >
        <span className="h-px w-8 bg-gold/70" />
        <span
          className={cn(
            'text-[11px] uppercase tracking-luxe font-sans-body',
            light ? 'text-gold-soft' : 'text-gold',
          )}
        >
          {eyebrow}
        </span>
        <span className="h-px w-8 bg-gold/70" />
      </motion.div>

      <motion.h2
        initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.9, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          'font-serif-display font-light text-balance leading-[1.08] text-4xl sm:text-5xl lg:text-[3.4rem]',
          light ? 'text-ivory' : 'text-forest-deep',
        )}
      >
        {title}
      </motion.h2>

      {description && (
        <motion.p
          initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.9, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
          className={cn(
            'max-w-xl font-sans-body text-base leading-relaxed',
            centered ? 'mx-auto' : '',
            light ? 'text-ivory/75' : 'text-foreground/65',
          )}
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}
