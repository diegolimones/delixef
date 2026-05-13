'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-warm-50/95 backdrop-blur-sm shadow-sm border-b border-gold-200/40'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-editorial mx-auto px-6 md:px-10 h-16 md:h-20 flex items-center justify-between">
        <Link href="/" className="flex flex-col leading-none">
          <span className={`font-display text-xl font-light tracking-wide transition-colors duration-300 ${
            scrolled ? 'text-ink' : 'text-sand-50'
          }`}>
            Delixef
          </span>
          <span className={`text-[10px] tracking-[0.18em] uppercase font-light transition-colors duration-300 ${
            scrolled ? 'text-ink-mute' : 'text-sand-50/70'
          }`}>
            38°54′N · Ibiza
          </span>
        </Link>

        <nav className="flex items-center gap-8">
          <Link
            href="/servicios"
            className={`text-sm tracking-widest uppercase transition-colors duration-300 hover:text-amber-500 ${
              scrolled ? 'text-ink-soft' : 'text-sand-100'
            }`}
          >
            Servicios
          </Link>
          <Link
            href="/catalogo"
            className={`text-sm tracking-widest uppercase transition-colors duration-300 hover:text-amber-500 ${
              scrolled ? 'text-ink-soft' : 'text-sand-100'
            }`}
          >
            Catálogo
          </Link>
          <Link
            href="/reservar"
            className={`text-sm px-5 py-2.5 rounded-full border transition-all duration-300 ${
              scrolled
                ? 'border-amber-500 text-amber-600 hover:bg-amber-500 hover:text-white'
                : 'border-sand-100/60 text-sand-50 hover:border-sand-50 hover:bg-sand-50/10'
            }`}
          >
            Reservar
          </Link>
        </nav>
      </div>
    </header>
  );
}
