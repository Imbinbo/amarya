'use client';

import { Navbar } from '@/components/site/Navbar';
import { Hero } from '@/components/site/Hero';
import { About } from '@/components/site/About';
import { Rooms } from '@/components/site/Rooms';
import { Experiences } from '@/components/site/Experiences';
import { Gallery } from '@/components/site/Gallery';
import { Dining } from '@/components/site/Dining';
import { Offers } from '@/components/site/Offers';
import { Testimonials } from '@/components/site/Testimonials';
import { Location } from '@/components/site/Location';
import { FinalCTA } from '@/components/site/FinalCTA';
import { Footer } from '@/components/site/Footer';
import { CustomCursor } from '@/components/motion/CustomCursor';

export default function Home() {
  return (
    <main className="relative">
      <CustomCursor />
      <Navbar />
      <Hero />
      <About />
      <Rooms />
      <Experiences />
      <Gallery />
      <Dining />
      <Offers />
      <Testimonials />
      <Location />
      <FinalCTA />
      <Footer />
    </main>
  );
}
