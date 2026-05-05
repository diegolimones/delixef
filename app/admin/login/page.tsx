'use client';

import { useState, useEffect } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      router.push('/admin');
    }
  }, [session, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError(result.error);
      } else if (result?.ok) {
        router.push('/admin');
      }
    } catch (err) {
      setError('Error al iniciar sesión');
    } finally {
      setIsLoading(false);
    }
  };

  const inputClass =
    'w-full px-0 py-3 border-0 border-b border-sand-50/30 bg-transparent text-sand-50 placeholder:text-sand-50/40 focus:outline-none focus:border-coral-400 transition-colors font-light disabled:opacity-50';

  return (
    <div className="min-h-screen bg-tide flex items-center justify-center px-6 py-12 relative overflow-hidden">
      {/* Decorative italic */}
      <div
        aria-hidden="true"
        className="hidden md:block absolute -top-12 -right-12 font-display font-light italic text-[16rem] leading-none text-coral-400/[0.06] select-none pointer-events-none"
      >
        admin
      </div>

      <div className="relative w-full max-w-md">
        {/* Brand */}
        <Link href="/" className="block mb-12 text-center">
          <span className="font-display text-4xl font-light tracking-tightest text-sand-50 leading-none">
            Delixef
          </span>
          <div className="eyebrow text-coral-400 mt-3">— Panel admin</div>
        </Link>

        <div className="border border-sand-50/20 bg-sand-50/[0.04] backdrop-blur-sm p-8 md:p-10">
          <div className="mb-8">
            <span className="eyebrow text-coral-400 block mb-3">— Acceso</span>
            <h1 className="font-display font-light text-3xl text-sand-50 leading-tight">
              Inicia <span className="italic text-coral-400">sesión</span>.
            </h1>
          </div>

          {error && (
            <div className="mb-6 border border-coral-500/50 bg-coral-500/10 px-4 py-3">
              <p className="text-sm text-coral-400 font-light">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-7">
            <div>
              <label htmlFor="email" className="eyebrow text-sand-50/70 block mb-2">
                Correo
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@delixef.com"
                required
                disabled={isLoading}
                className={inputClass}
                autoComplete="email"
              />
            </div>

            <div>
              <label htmlFor="password" className="eyebrow text-sand-50/70 block mb-2">
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
                className={inputClass}
                autoComplete="current-password"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full inline-flex items-center justify-center bg-coral-500 text-sand-50 px-6 py-4 text-xs font-semibold tracking-[0.22em] uppercase hover:bg-coral-600 transition-colors disabled:opacity-60 mt-4"
            >
              {isLoading ? 'Iniciando sesión…' : 'Iniciar sesión'}
            </button>
          </form>
        </div>

        {/* Back to public */}
        <div className="mt-8 text-center">
          <Link
            href="/"
            className="eyebrow text-sand-50/60 hover:text-coral-400 transition-colors"
          >
            ← Volver a la web
          </Link>
        </div>
      </div>
    </div>
  );
}
