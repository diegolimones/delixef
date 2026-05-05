'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import Image from 'next/image';

interface MenuItem {
  id: string;
  name: string;
  description?: string;
  category: 'desayuno' | 'comida' | 'cena' | 'evento';
  price?: number;
  ingredients?: string;
  dietary_restrictions?: string;
  available: boolean;
}

const categoryLabels: Record<string, string> = {
  desayuno: 'Desayuno',
  comida: 'Comida',
  cena: 'Cena',
  evento: 'Evento',
};

const heroImage =
  'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=1600&q=85&auto=format&fit=crop';

const customMenuImage =
  'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=1200&q=85&auto=format&fit=crop';

export default function Catalogo() {
  const [menus, setMenus] = useState<MenuItem[]>([]);
  const [filteredMenus, setFilteredMenus] = useState<MenuItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<
    'todas' | 'desayuno' | 'comida' | 'cena' | 'evento'
  >('todas');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const categories = [
    { id: 'todas', label: 'Todos' },
    { id: 'desayuno', label: 'Desayunos' },
    { id: 'comida', label: 'Comidas' },
    { id: 'cena', label: 'Cenas' },
    { id: 'evento', label: 'Eventos' },
  ];

  useEffect(() => {
    fetchMenus();
  }, []);

  const fetchMenus = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const { data, error: sbError } = await supabase
        .from('menus')
        .select('*')
        .eq('available', true)
        .order('category', { ascending: true });

      if (sbError) {
        console.error('Supabase error:', sbError);
        setError(sbError.message);
      } else {
        setMenus(data || []);
        setFilteredMenus(data || []);
      }
    } catch (err) {
      console.error('Error fetching menus:', err);
      setError('Error de conexión con la base de datos');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCategoryChange = (category: any) => {
    setSelectedCategory(category);

    if (category === 'todas') {
      setFilteredMenus(menus);
    } else {
      setFilteredMenus(menus.filter((menu) => menu.category === category));
    }
  };

  return (
    <>
      {/* HERO — cinematic */}
      <section className="relative -mt-20 md:-mt-24">
        <div className="relative h-[72vh] min-h-[520px] max-h-[760px] overflow-hidden">
          <div className="absolute inset-0 hero-breathe">
            <Image
              src={heroImage}
              alt="Plato de cocina mediterránea servido en mesa frente al mar"
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          </div>

          <div
            aria-hidden="true"
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(180deg, oklch(0.13 0.05 232 / 0.50) 0%, oklch(0.13 0.05 232 / 0.20) 35%, oklch(0.13 0.05 232 / 0.40) 75%, oklch(0.13 0.05 232 / 0.80) 100%)',
            }}
          />

          {/* Animated waves */}
          <div
            aria-hidden="true"
            className="absolute bottom-0 left-0 right-0 h-24 md:h-32 overflow-hidden pointer-events-none"
          >
            <svg className="absolute bottom-0 left-0 wave-animate-slow text-sand-50/20" style={{ width: '200%', height: '100%' }} viewBox="0 0 2880 160" preserveAspectRatio="none">
              <path d="M0,80 Q360,30 720,80 T1440,80 T2160,80 T2880,80 L2880,160 L0,160 Z" fill="currentColor" />
            </svg>
            <svg className="absolute bottom-0 left-0 wave-animate text-sand-50/30" style={{ width: '200%', height: '100%' }} viewBox="0 0 2880 160" preserveAspectRatio="none">
              <path d="M0,110 Q360,70 720,110 T1440,110 T2160,110 T2880,110 L2880,160 L0,160 Z" fill="currentColor" />
            </svg>
            <svg className="absolute bottom-0 left-0 wave-animate-reverse text-sand-50" style={{ width: '200%', height: '100%' }} viewBox="0 0 2880 160" preserveAspectRatio="none">
              <path d="M0,140 Q360,115 720,140 T1440,140 T2160,140 T2880,140 L2880,160 L0,160 Z" fill="currentColor" />
            </svg>
          </div>

          {/* Edition mark */}
          <div className="absolute top-24 md:top-28 inset-x-0 z-10">
            <div className="max-w-editorial mx-auto px-6 md:px-10">
              <div className="flex items-center justify-between fade-up fade-up-1">
                <span className="eyebrow text-sand-50/95">N°03 · Catálogo</span>
                <span className="eyebrow text-sand-50/85 hidden md:inline tabular-nums">
                  {menus.length > 0 ? `${menus.length} platos` : 'Mediterráneo'}
                </span>
              </div>
            </div>
          </div>

          {/* Headline */}
          <div className="absolute inset-0 flex items-center z-10">
            <div className="max-w-editorial mx-auto px-6 md:px-10 w-full">
              <h1 className="font-display font-light text-display-xl text-sand-50 leading-[0.88]">
                <span className="block fade-up fade-up-2">Catálogo</span>
                <span className="block italic font-normal text-coral-400 fade-up fade-up-3">
                  de menús
                </span>
              </h1>

              <div className="mt-8 md:mt-10 max-w-md fade-up fade-up-5">
                <p className="text-base md:text-lg text-sand-50/90 font-light leading-relaxed">
                  Una selección de platos y menús que servimos esta temporada.
                  <br />
                  Es un punto de partida — los menús finales se diseñan contigo.
                </p>
              </div>
            </div>
          </div>

          {/* Bottom caption */}
          <div className="absolute bottom-6 left-0 right-0 z-10">
            <div className="max-w-editorial mx-auto px-6 md:px-10 flex items-end justify-end fade-up fade-up-6">
              <div className="flex items-baseline gap-6">
                <span className="eyebrow text-sand-50/80">Producto local</span>
                <span className="eyebrow text-sand-50/80 tabular-nums">DeliXef · 2026</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filter + List */}
      <section className="bg-sand-100 border-y border-sea-200/40 py-16 md:py-24">
        <div className="max-w-editorial mx-auto px-6 md:px-10">
          {/* Editorial filter */}
          <div className="flex items-baseline gap-2 md:gap-4 flex-wrap mb-12 md:mb-16 pb-6 border-b border-sea-200/60">
            <span className="eyebrow text-coral-600 mr-4">— Filtrar</span>
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => handleCategoryChange(c.id)}
                className={`text-sm md:text-base font-light transition-colors duration-200 ${
                  selectedCategory === c.id
                    ? 'text-ink underline underline-offset-8 decoration-coral-500 decoration-2'
                    : 'text-ink-mute hover:text-ink'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>

          {isLoading ? (
            <div className="py-20 text-center text-ink-mute font-light">Cargando menús…</div>
          ) : error ? (
            <div className="py-20 text-center">
              <p className="font-display text-xl text-coral-600 font-light">Error al cargar los menús</p>
              <p className="mt-2 text-sm text-ink-mute font-mono">{error}</p>
            </div>
          ) : filteredMenus.length > 0 ? (
            <ul className="divide-y divide-sea-200/60 border-t border-b border-sea-200/60">
              {filteredMenus.map((menu) => (
                <li
                  key={menu.id}
                  className="grid grid-cols-12 gap-4 md:gap-8 py-8 md:py-10 items-baseline group hover:bg-sand-50 transition-colors -mx-4 px-4 md:-mx-6 md:px-6"
                >
                  <div className="col-span-12 md:col-span-2">
                    <span className="eyebrow text-coral-600">
                      {categoryLabels[menu.category]}
                    </span>
                  </div>

                  <div className="col-span-12 md:col-span-6">
                    <h3 className="font-display text-2xl md:text-3xl text-ink font-light leading-tight group-hover:italic transition-all duration-300">
                      {menu.name}
                    </h3>
                    {menu.description && (
                      <p className="mt-3 text-ink-soft font-light leading-relaxed">
                        {menu.description}
                      </p>
                    )}
                    {menu.ingredients && (
                      <p className="mt-3 text-sm text-ink-mute italic font-light">
                        {menu.ingredients}
                      </p>
                    )}
                  </div>

                  <div className="col-span-6 md:col-span-2">
                    {menu.dietary_restrictions && (
                      <span className="eyebrow text-ink-mute">
                        {menu.dietary_restrictions}
                      </span>
                    )}
                  </div>

                  <div className="col-span-6 md:col-span-2 md:text-right">
                    {menu.price && (
                      <span className="font-display text-2xl md:text-3xl text-ink font-light tabular-nums">
                        {menu.price.toFixed(0)}€
                      </span>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="py-20 text-center">
              <p className="font-display text-2xl text-ink-soft font-light">
                Aún no hay menús en esta categoría.
              </p>
              <p className="mt-4 text-ink-mute font-light max-w-md mx-auto">
                Diseñamos cada menú a medida del evento. Cuéntanos qué tienes en mente y te enviamos una propuesta.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Custom menu — with image */}
      <section className="bg-sand-50 py-20 md:py-28 border-t border-sea-200/40">
        <div className="max-w-editorial mx-auto px-6 md:px-10">
          <div className="grid grid-cols-12 gap-y-12 gap-x-10 items-center">
            <div className="col-span-12 md:col-span-7">
              <span className="eyebrow text-coral-600 block mb-6">— A medida</span>
              <h2 className="font-display font-light text-display-md text-ink leading-tight">
                ¿No encuentras
                <br />
                <span className="italic text-sea-600">lo que buscas?</span>
              </h2>
              <p className="mt-8 text-lg text-ink-soft font-light leading-relaxed max-w-xl">
                El catálogo es un punto de partida. Si tienes una idea concreta —un plato que recuerdas, una temática, una restricción— diseñamos el menú desde cero contigo.
              </p>
              <Link
                href="/contacto"
                className="mt-10 inline-flex items-center gap-3 text-sm font-semibold text-ink hover:text-coral-600 transition-colors uppercase tracking-[0.2em]"
              >
                Solicitar menú a medida
                <span className="w-10 h-px bg-current"></span>
              </Link>
            </div>

            <div className="col-span-12 md:col-span-4 md:col-start-9">
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src={customMenuImage}
                  alt="Menú gastronómico personalizado de DeliXef"
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="font-display text-xl md:text-2xl text-sand-50 font-light leading-snug italic">
                    «No diseñamos un menú estándar y luego intentamos encajar al cliente. Es al revés.»
                  </p>
                  <p className="mt-3 eyebrow text-sand-50/80">— Pau Baena</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
