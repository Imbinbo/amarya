import './globals.css';
import type { Metadata } from 'next';
import { Inter, Cormorant_Garamond } from 'next/font/google';
import { Toaster } from '@/components/ui/toaster';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-cormorant',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://amaryaresort.example'),
  title: 'Amarya — Luxury Tropical Resort & Spa',
  description:
    'Escape into nature and experience luxury at Amarya, a 5-star tropical resort offering private villas, wellness, fine dining, and immersive experiences.',
  keywords: [
    'luxury resort',
    'tropical resort',
    '5 star resort',
    'spa retreat',
    'private villas',
    'fine dining',
    'honeymoon destination',
  ],
  openGraph: {
    title: 'Amarya — Luxury Tropical Resort & Spa',
    description:
      'Escape into nature and experience luxury at Amarya, a 5-star tropical resort.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Amarya — Luxury Tropical Resort & Spa',
    description:
      'Escape into nature and experience luxury at Amarya, a 5-star tropical resort.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${cormorant.variable}`}>
      <body className="font-sans-body bg-background text-foreground antialiased overflow-x-hidden">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
