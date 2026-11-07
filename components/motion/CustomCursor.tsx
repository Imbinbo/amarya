'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';

export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const ringX = useSpring(cursorX, { stiffness: 350, damping: 28, mass: 0.4 });
  const ringY = useSpring(cursorY, { stiffness: 350, damping: 28, mass: 0.4 });
  const dotX = useSpring(cursorX, { stiffness: 900, damping: 40 });
  const dotY = useSpring(cursorY, { stiffness: 900, damping: 40 });
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const isFinePointer =
      window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (!isFinePointer) return;
    setEnabled(true);
    document.body.classList.add('custom-cursor-active');

    const move = (e: MouseEvent) => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        cursorX.set(e.clientX);
        cursorY.set(e.clientY);
      });
      const target = e.target as HTMLElement;
      const interactive = target.closest(
        'a, button, input, select, textarea, [role="button"], [data-cursor="hover"]',
      );
      setHovering(!!interactive);
      if (!visible) setVisible(true);
    };

    const leave = () => setVisible(false);

    window.addEventListener('mousemove', move);
    document.addEventListener('mouseleave', leave);
    return () => {
      window.removeEventListener('mousemove', move);
      document.removeEventListener('mouseleave', leave);
      document.body.classList.remove('custom-cursor-active');
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [cursorX, cursorY, visible]);

  if (!enabled) return null;

  return (
    <AnimatePresence>
      {visible && (
        <>
          <motion.div
            style={{ x: ringX, y: ringY }}
            className="pointer-events-none fixed left-0 top-0 z-[100] -translate-x-1/2 -translate-y-1/2"
            animate={{
              scale: hovering ? 1.6 : 1,
              opacity: hovering ? 0.9 : 0.55,
            }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            <div className="h-9 w-9 rounded-full border border-gold" />
          </motion.div>
          <motion.div
            style={{ x: dotX, y: dotY }}
            className="pointer-events-none fixed left-0 top-0 z-[100] -translate-x-1/2 -translate-y-1/2"
            animate={{ scale: hovering ? 0.5 : 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          >
            <div className="h-1.5 w-1.5 rounded-full bg-gold" />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
