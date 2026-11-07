'use client';

import { useState, type FormEvent } from 'react';
import { Instagram, Facebook, Twitter, Mail, Phone, MapPin, ArrowRight } from 'lucide-react';
import { NAV_LINKS } from '@/lib/data';
import { useToast } from '@/hooks/use-toast';
import { getSupabase } from '@/lib/supabase';

export function Footer() {
  const { toast } = useToast();
  const [subscribing, setSubscribing] = useState(false);

  const handleSubscribe = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const email = (new FormData(form).get('email') as string) || '';
    setSubscribing(true);
    try {
      const { error } = await getSupabase()
        .from('newsletter_subscribers')
        .insert({ email });
      if (error) {
        if (error.code === '23505') {
          toast({
            title: 'Already subscribed',
            description: 'This email is already on the Amarya circle list.',
          });
        } else {
          throw error;
        }
      } else {
        form.reset();
        toast({
          title: 'Subscribed',
          description:
            'Welcome to the Amarya circle. Watch your inbox for island stories.',
        });
      }
    } catch {
      toast({
        title: 'Something went wrong',
        description:
          'We could not add your subscription just now. Please try again.',
      });
    } finally {
      setSubscribing(false);
    }
  };

  return (
    <footer className="relative bg-forest-deep text-ivory">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-20">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-baseline gap-2">
              <span className="font-serif-display text-3xl font-medium">Amarya</span>
              <span className="text-[10px] uppercase tracking-luxe text-gold-soft">
                Resort &amp; Spa
              </span>
            </div>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-ivory/65">
              A five-star tropical sanctuary where rainforest meets reef.
              Private villas, soulful wellness, and cuisine rooted in the land
              and sea.
            </p>
            <div className="mt-6 flex gap-3">
              {[Instagram, Facebook, Twitter].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label="Social link"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-ivory/20 text-ivory/80 transition-all hover:border-gold hover:bg-gold hover:text-forest-deep"
                >
                  <Icon className="h-4 w-4" strokeWidth={1.5} />
                </a>
              ))}
            </div>
          </div>

          {/* Nav */}
          <div>
            <h4 className="text-[11px] uppercase tracking-luxe text-gold-soft">
              Explore
            </h4>
            <ul className="mt-5 space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-ivory/70 transition-colors hover:text-ivory"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-[11px] uppercase tracking-luxe text-gold-soft">
              Contact
            </h4>
            <ul className="mt-5 space-y-4">
              <li className="flex items-start gap-3 text-sm text-ivory/70">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold/70" strokeWidth={1.5} />
                Coral Bay, Rainforest Coast, Island Nation
              </li>
              <li className="flex items-center gap-3 text-sm text-ivory/70">
                <Phone className="h-4 w-4 shrink-0 text-gold/70" strokeWidth={1.5} />
                +1 (800) 555-0199
              </li>
              <li className="flex items-center gap-3 text-sm text-ivory/70">
                <Mail className="h-4 w-4 shrink-0 text-gold/70" strokeWidth={1.5} />
                stay@amaryaresort.com
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-[11px] uppercase tracking-luxe text-gold-soft">
              Newsletter
            </h4>
            <p className="mt-5 text-sm text-ivory/65">
              Island stories, seasonal offers, and quiet inspiration — a few
              times a year.
            </p>
            <form onSubmit={handleSubscribe} className="mt-5 flex items-center gap-2">
              <input
                type="email"
                name="email"
                required
                placeholder="Email address"
                aria-label="Email address"
                className="w-full flex-1 border-b border-ivory/25 bg-transparent pb-2 text-sm text-ivory placeholder:text-ivory/50 outline-none transition-colors focus:border-gold [color-scheme:dark]"
              />
              <button
                type="submit"
                disabled={subscribing}
                aria-label="Subscribe"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold text-forest-deep transition-colors hover:bg-ivory disabled:opacity-60"
              >
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-ivory/10 pt-8 sm:flex-row">
          <p className="text-[12px] text-ivory/50">
            © {new Date().getFullYear()} Amarya Resort &amp; Spa. All rights reserved.
          </p>
          <div className="flex gap-6 text-[12px] text-ivory/50">
            <a href="#" className="transition-colors hover:text-ivory">Privacy</a>
            <a href="#" className="transition-colors hover:text-ivory">Terms</a>
            <a href="#" className="transition-colors hover:text-ivory">Sustainability</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
