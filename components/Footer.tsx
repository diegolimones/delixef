'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Footer() {
  const pathname = usePathname();
  if (pathname?.startsWith('/admin')) return null;

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-cream-50 border-t border-olive-200/60 text-ink">
      <div className="max-w-editorial mx-auto px-6 md:px-10 pt-20 pb-10">
        {/* Top — Masthead */}
        <div className="grid grid-cols-12 gap-y-12 gap-x-8 pb-16 border-b border-olive-200/60">
          {/* Brand block */}
          <div className="col-span-12 md:col-span-5">
            <Link href="/" className="inline-block">
              <span className="font-display font-light text-5xl md:text-6xl tracking-tightest text-ink leading-none">
                Delixef
              </span>
            </Link>
            <p className="mt-6 max-w-sm text-ink-soft font-light leading-relaxed">
              Bodas y eventos privados con cocina mediterránea en Ibiza. Dirigidos por Pau Baena. De Santa Gertrudis a toda la isla.
            </p>
            <div className="mt-8 eyebrow text-ink-mute">
              DeliXef Private Events · Ibiza · 2026
            </div>
          </div>

          {/* Services column */}
          <div className="col-span-6 md:col-span-2 md:col-start-7">
            <div className="eyebrow text-terracotta-600 mb-5">— Servicios</div>
            <ul className="space-y-3 font-light">
              <li><Link href="/servicios#desayunos" className="text-ink hover:text-terracotta-600 transition-colors">Desayunos</Link></li>
              <li><Link href="/servicios#comidas" className="text-ink hover:text-terracotta-600 transition-colors">Comidas</Link></li>
              <li><Link href="/servicios#cenas" className="text-ink hover:text-terracotta-600 transition-colors">Cenas</Link></li>
              <li><Link href="/servicios#eventos" className="text-ink hover:text-terracotta-600 transition-colors">Eventos</Link></li>
            </ul>
          </div>

          {/* Site column */}
          <div className="col-span-6 md:col-span-2">
            <div className="eyebrow text-terracotta-600 mb-5">— Estudio</div>
            <ul className="space-y-3 font-light">
              <li><Link href="/catalogo" className="text-ink hover:text-terracotta-600 transition-colors">Catálogo</Link></li>
              <li><Link href="/contacto" className="text-ink hover:text-terracotta-600 transition-colors">Contacto</Link></li>
              <li><Link href="/reservar" className="text-ink hover:text-terracotta-600 transition-colors">Reservar</Link></li>
            </ul>
          </div>

          {/* Contact column */}
          <div className="col-span-12 md:col-span-3">
            <div className="eyebrow text-terracotta-600 mb-5">— Contacto</div>
            <ul className="space-y-3 font-light">
              <li>
                <a href="mailto:info@delixef.com" className="font-display text-xl text-ink hover:text-terracotta-600 transition-colors">
                  info@delixef.com
                </a>
              </li>
              <li className="text-ink-soft">
                <a href="tel:+34XXXXXXXXX" className="hover:text-terracotta-600 transition-colors">
                  +34 XXX XXX XXX
                </a>
              </li>
              <li className="text-ink-mute pt-3">
                Santa Gertrudis de Fruitera
                <br />
                Ibiza · Islas Baleares
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom strip */}
        <div className="pt-8 flex flex-col-reverse md:flex-row justify-between items-start md:items-center gap-6">
          <div className="text-sm text-ink-mute font-light">
            © {currentYear} Delixef. Todos los derechos reservados.
          </div>

          <div className="flex items-center gap-6">
            <a
              href="https://www.instagram.com/delixef.ibiza/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-ink hover:text-terracotta-600 transition-colors uppercase tracking-wider"
              aria-label="Instagram"
            >
              Instagram
            </a>
            <span className="w-px h-4 bg-olive-200" aria-hidden="true"></span>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-ink hover:text-terracotta-600 transition-colors uppercase tracking-wider"
              aria-label="Facebook"
            >
              Facebook
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
