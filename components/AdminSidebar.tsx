'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, status } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/admin/login');
    }
  }, [status, router]);

  if (status === 'loading' || status === 'unauthenticated') {
    return null;
  }

  const navItems = [
    { href: '/admin', label: 'Dashboard', num: '01' },
    { href: '/admin/reservas', label: 'Reservas', num: '02' },
    { href: '/admin/disponibilidad', label: 'Disponibilidad', num: '03' },
    { href: '/admin/menus', label: 'Menús', num: '04' },
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-4 left-4 z-50 p-3 bg-ink text-sand-50 hover:bg-coral-600 transition-colors"
        aria-label="Abrir menú"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {isOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 8h16M4 16h16" />
          )}
        </svg>
      </button>

      {/* Sidebar */}
      <aside
        className={`
          fixed md:sticky md:top-0 z-40 w-72 h-screen flex flex-col
          bg-sea-900 text-sand-50
          transition-transform duration-300
          ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}
      >
        {/* Brand */}
        <div className="px-8 pt-10 pb-8 border-b border-sand-50/15">
          <Link href="/" className="block group">
            <span className="font-display text-3xl font-light tracking-tightest text-sand-50 leading-none">
              Delixef
            </span>
          </Link>
          <div className="eyebrow text-coral-400 mt-3">— Panel admin</div>
        </div>

        {/* User Info */}
        <div className="px-8 py-6 border-b border-sand-50/15">
          <div className="eyebrow text-sand-50/60 mb-2">Conectado como</div>
          <div className="font-display text-base text-sand-50 truncate italic">
            {session?.user?.email}
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`group flex items-baseline gap-4 px-4 py-3 transition-colors ${
                  active
                    ? 'bg-sand-50/[0.06] text-sand-50'
                    : 'text-sand-50/70 hover:text-sand-50 hover:bg-sand-50/[0.03]'
                }`}
              >
                <span
                  className={`font-display text-sm font-light tabular-nums transition-colors ${
                    active ? 'text-coral-400' : 'text-sand-50/40'
                  }`}
                >
                  {item.num}
                </span>
                <span
                  className={`font-display text-lg transition-all ${
                    active ? 'italic' : 'group-hover:italic'
                  }`}
                >
                  {item.label}
                </span>
              </Link>
            );
          })}
        </nav>

        {/* Footer actions */}
        <div className="px-8 py-6 border-t border-sand-50/15 space-y-4">
          <Link
            href="/"
            className="block eyebrow text-sand-50/70 hover:text-coral-400 transition-colors"
            target="_blank"
          >
            ↗ Ver web pública
          </Link>
          <button
            onClick={() => signOut({ callbackUrl: '/' })}
            className="w-full inline-flex items-center justify-center bg-coral-500 text-sand-50 px-5 py-3 text-xs font-semibold tracking-[0.2em] uppercase hover:bg-coral-600 transition-colors"
          >
            Cerrar sesión
          </button>
        </div>
      </aside>

      {/* Mobile overlay */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-ink/60 md:hidden z-30"
        />
      )}
    </>
  );
}
