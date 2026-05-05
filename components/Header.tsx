'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // Hide on admin pages
  if (pathname?.startsWith('/admin')) return null;

  // Home has dark cinematic hero — header should be transparent with light text initially
  const onDarkHero = pathname === '/' && !scrolled;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { href: '/servicios', label: 'Servicios' },
    { href: '/catalogo', label: 'Catálogo' },
    { href: '/contacto', label: 'Contacto' },
  ];

  // Color tokens based on context
  const logoColor = onDarkHero ? 'text-sand-50' : 'text-ink';
  const tagColor = onDarkHero ? 'text-coral-400' : 'text-coral-600';
  const navColor = onDarkHero
    ? 'text-sand-50 hover:text-coral-400'
    : 'text-ink hover:text-coral-600';
  const reserveBtn = onDarkHero
    ? 'bg-sand-50 text-ink hover:bg-coral-500 hover:text-sand-50'
    : 'bg-ink text-sand-50 hover:bg-sea-900';
  const burgerColor = onDarkHero ? 'text-sand-50' : 'text-ink';

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-sand-50/95 backdrop-blur-md border-b border-sea-200/60 shadow-sm'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-editorial mx-auto px-6 md:px-10 py-5 md:py-6 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-baseline gap-3 group">
          <span
            className={`font-display text-[1.6rem] md:text-3xl font-medium tracking-tightest leading-none transition-colors duration-500 ${logoColor}`}
          >
            Delixef
          </span>
          <span
            className={`hidden sm:inline eyebrow tabular-nums transition-colors duration-500 ${tagColor}`}
          >
            38°54′N · Ibiza
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`relative text-sm font-medium transition-colors duration-300 ${navColor}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Link
            href="/reservar"
            className={`hidden sm:inline-flex items-center px-5 py-2.5 text-xs font-semibold tracking-[0.18em] uppercase transition-colors duration-300 ${reserveBtn}`}
          >
            Reservar
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 -mr-2"
            aria-label="Abrir menú"
          >
            <svg
              className={`w-6 h-6 transition-colors duration-300 ${burgerColor}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 8h16M4 16h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <nav className="md:hidden bg-sand-50 border-t border-sea-200/60">
          <div className="max-w-editorial mx-auto px-6 py-6 flex flex-col gap-1">
            {navLinks.map((link, i) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-baseline justify-between py-3 border-b border-sea-100 group"
              >
                <span className="font-display text-2xl text-ink">{link.label}</span>
                <span className="eyebrow text-ink-mute">0{i + 1}</span>
              </Link>
            ))}
            <Link
              href="/reservar"
              onClick={() => setMobileMenuOpen(false)}
              className="mt-6 inline-flex items-center justify-center bg-ink text-sand-50 px-6 py-4 text-sm font-semibold tracking-wide uppercase hover:bg-sea-900 transition-colors"
            >
              Reservar mesa
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
