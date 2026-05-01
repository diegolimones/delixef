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
    { href: '/admin', label: 'Dashboard', icon: '📊' },
    { href: '/admin/reservas', label: 'Reservas', icon: '📅' },
    { href: '/admin/disponibilidad', label: 'Disponibilidad', icon: '🗓️' },
    { href: '/admin/menus', label: 'Menús', icon: '🍽️' },
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-gold text-white rounded-lg"
      >
        ☰
      </button>

      {/* Sidebar */}
      <aside
        className={`
          fixed md:relative z-40 w-64 h-screen bg-gray-900 text-white
          transition-transform duration-300
          ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
          overflow-y-auto
        `}
      >
        <div className="p-6 border-b border-gray-700">
          <h1 className="font-playfair text-2xl font-bold text-gold">Delixef</h1>
          <p className="text-sm text-gray-400 mt-1">Admin</p>
        </div>

        {/* User Info */}
        <div className="p-6 border-b border-gray-700">
          <p className="text-sm text-gray-400">Conectado como</p>
          <p className="font-semibold text-white truncate">{session?.user?.email}</p>
        </div>

        {/* Navigation */}
        <nav className="p-6 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className={`
                flex items-center gap-3 px-4 py-3 rounded-lg transition
                ${
                  isActive(item.href)
                    ? 'bg-gold text-white'
                    : 'text-gray-300 hover:bg-gray-800'
                }
              `}
            >
              <span className="text-xl">{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Logout Button */}
        <div className="p-6 border-t border-gray-700">
          <button
            onClick={() => signOut({ callbackUrl: '/' })}
            className="w-full px-4 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg transition font-semibold"
          >
            Cerrar Sesión
          </button>
        </div>
      </aside>

      {/* Mobile overlay */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-50 md:hidden z-30"
        />
      )}
    </>
  );
}
