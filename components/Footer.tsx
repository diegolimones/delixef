'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Footer() {
  const pathname = usePathname();
  if (pathname?.startsWith('/admin')) return null;

  return (
    <footer className="bg-ink py-16 px-6 md:px-10">
      <div className="max-w-editorial mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
          <div>
            <p className="font-display text-2xl font-light text-sand-50 mb-3">Delixef</p>
            <p className="text-sm text-ink-mute font-light leading-relaxed">
              Chef privado en Ibiza.<br />
              Experiencias gastronómicas únicas para momentos que no se olvidan.
            </p>
          </div>

          <div>
            <p className="text-xs tracking-widest uppercase text-gold-500 mb-4">Explorar</p>
            <ul className="space-y-2">
              {[
                { href: '/servicios', label: 'Servicios' },
                { href: '/reservar', label: 'Reservar' },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-ink-mute hover:text-sand-100 transition-colors font-light">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs tracking-widest uppercase text-gold-500 mb-4">Contacto</p>
            <ul className="space-y-2">
              <li>
                <a href="https://instagram.com/delixef.ibiza" target="_blank" rel="noopener noreferrer"
                  className="text-sm text-ink-mute hover:text-sand-100 transition-colors font-light">
                  @delixef.ibiza
                </a>
              </li>
              <li>
                <a href="mailto:hola@delixef.com"
                  className="text-sm text-ink-mute hover:text-sand-100 transition-colors font-light">
                  hola@delixef.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-ink-mute/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-ink-mute/50 font-light">© 2025 Delixef. Todos los derechos reservados.</p>
          <p className="text-xs text-ink-mute/50 font-light">Ibiza, España</p>
        </div>
      </div>
    </footer>
  );
}
