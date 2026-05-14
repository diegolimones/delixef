'use client';

import { useState, useEffect } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AdminLogin() {
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [error, setError]       = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router  = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    if (session) router.push('/admin');
  }, [session, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    try {
      const result = await signIn('credentials', { email, password, redirect: false });
      if (result?.error) setError('Credenciales incorrectas');
      else if (result?.ok) router.push('/admin');
    } catch {
      setError('Error al iniciar sesión');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">

      {/* ── Izquierda — marca ── */}
      <div className="hidden lg:flex lg:w-[44%] bg-sea-900 flex-col justify-between p-12 relative overflow-hidden">
        {/* Decorativo */}
        <div
          aria-hidden="true"
          className="absolute -bottom-16 -left-10 font-display font-light italic text-[18rem] leading-none text-sand-50/[0.04] select-none pointer-events-none"
        >
          admin
        </div>

        {/* Brand */}
        <Link href="/" className="block">
          <span className="font-display text-4xl font-light tracking-tightest text-sand-50 leading-none">
            Delixef
          </span>
          <div className="eyebrow text-foam-400 mt-3">— Panel de gestión</div>
        </Link>

        {/* Quote editorial */}
        <div className="relative z-10">
          <p className="font-display font-light text-2xl text-sand-50/80 leading-snug italic">
            Cada plato comienza<br />con una buena gestión.
          </p>
          <div className="mt-6 flex items-center gap-4">
            <span className="block w-8 h-px bg-foam-400" />
            <span className="eyebrow text-foam-400">DeliXef · Ibiza</span>
          </div>
        </div>

        {/* Bottom nav */}
        <Link href="/" className="eyebrow text-sand-50/40 hover:text-foam-400 transition-colors">
          ← Ver web pública
        </Link>
      </div>

      {/* ── Derecha — formulario ── */}
      <div className="flex-1 flex items-center justify-center bg-sand-50 px-6 py-12">
        <div className="w-full max-w-sm">

          {/* Mobile brand */}
          <div className="lg:hidden mb-10 text-center">
            <Link href="/">
              <span className="font-display text-3xl font-light tracking-tightest text-ink leading-none">
                Delixef
              </span>
            </Link>
            <div className="eyebrow text-amber-500 mt-2">— Panel admin</div>
          </div>

          <div className="mb-8">
            <span className="eyebrow text-amber-500 block mb-3">— Acceso</span>
            <h1 className="font-display font-light text-3xl text-ink leading-tight">
              Inicia <span className="italic text-sea-600">sesión</span>.
            </h1>
          </div>

          {error && (
            <div className="mb-6 flex items-center gap-3 bg-coral-50 border border-coral-200 px-4 py-3 rounded-lg">
              <span className="text-coral-500 text-sm">⚠</span>
              <p className="text-sm text-coral-700 font-light">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-xs font-semibold tracking-[0.14em] uppercase text-ink-mute mb-2">
                Correo electrónico
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@delixef.com"
                required
                disabled={isLoading}
                autoComplete="email"
                className="w-full px-4 py-3 bg-white border border-sea-200 rounded-lg text-ink placeholder:text-ink-mute/50 focus:outline-none focus:border-sea-500 focus:ring-2 focus:ring-sea-200 transition-all font-light disabled:opacity-50"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-xs font-semibold tracking-[0.14em] uppercase text-ink-mute mb-2">
                Contraseña
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                disabled={isLoading}
                autoComplete="current-password"
                className="w-full px-4 py-3 bg-white border border-sea-200 rounded-lg text-ink placeholder:text-ink-mute/50 focus:outline-none focus:border-sea-500 focus:ring-2 focus:ring-sea-200 transition-all font-light disabled:opacity-50"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full inline-flex items-center justify-center bg-sea-900 hover:bg-sea-800 text-sand-50 px-6 py-4 rounded-lg text-xs font-semibold tracking-[0.22em] uppercase transition-colors disabled:opacity-60 mt-2"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-sand-50/30 border-t-sand-50 rounded-full animate-spin" />
                  Iniciando sesión…
                </span>
              ) : 'Iniciar sesión →'}
            </button>
          </form>

          <div className="mt-8 lg:hidden text-center">
            <Link href="/" className="eyebrow text-ink-mute hover:text-amber-500 transition-colors">
              ← Volver a la web
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
