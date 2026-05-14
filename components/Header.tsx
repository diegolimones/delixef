'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  if (pathname?.startsWith('/admin')) return null;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Cierra el menú al cambiar de ruta
  const close = () => setOpen(false);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled || open
            ? 'bg-warm-50/95 backdrop-blur-sm shadow-sm border-b border-gold-200/40'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-editorial mx-auto px-6 md:px-10 h-16 md:h-20 flex items-center justify-between">
          <Link href="/" onClick={close} className="flex flex-col leading-none">
            <span className={`font-display text-xl font-light tracking-wide transition-colors duration-300 ${
              scrolled || open ? 'text-ink' : 'text-sand-50'
            }`}>
              Delixef
            </span>
            <span className={`text-[10px] tracking-[0.18em] uppercase font-light transition-colors duration-300 ${
              scrolled || open ? 'text-ink-mute' : 'text-sand-50/70'
            }`}>
              38°54′N · Ibiza
            </span>
          </Link>

          {/* Nav escritorio */}
          <nav className="hidden md:flex items-center gap-8">
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

          {/* Botón hamburguesa móvil */}
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
            className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.5"
          >
            <span className={`block h-px w-6 transition-all duration-300 origin-center ${
              open
                ? 'rotate-45 translate-y-[4.5px] bg-ink'
                : scrolled ? 'bg-ink' : 'bg-sand-50'
            }`} />
            <span className={`block h-px transition-all duration-300 ${
              open ? 'w-0 opacity-0 bg-ink' : 'w-6 ' + (scrolled ? 'bg-ink' : 'bg-sand-50')
            }`} />
            <span className={`block h-px w-6 transition-all duration-300 origin-center ${
              open
                ? '-rotate-45 -translate-y-[4.5px] bg-ink'
                : scrolled ? 'bg-ink' : 'bg-sand-50'
            }`} />
          </button>
        </div>
      </header>

      {/* Menú móvil desplegable */}
      <div
        className={`fixed inset-x-0 top-16 z-40 bg-warm-50/98 backdrop-blur-sm transition-all duration-300 md:hidden ${
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <nav className="flex flex-col px-8 py-8 gap-6 border-b border-gold-200/40">
          <Link
            href="/servicios"
            onClick={close}
            className="text-sm tracking-widest uppercase text-ink-soft hover:text-amber-500 transition-colors"
          >
            Servicios
          </Link>
          <Link
            href="/catalogo"
            onClick={close}
            className="text-sm tracking-widest uppercase text-ink-soft hover:text-amber-500 transition-colors"
          >
            Catálogo
          </Link>
          <Link
            href="/reservar"
            onClick={close}
            className="self-start text-sm px-5 py-2.5 rounded-full border border-amber-500 text-amber-600 hover:bg-amber-500 hover:text-white transition-all duration-300"
          >
            Reservar
          </Link>
        </nav>
      </div>
    </>
  );
}
