'use client';

import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';

export interface GalleryItem {
  src: string;
  label: string;
  category: string;
}

interface GalleryProps {
  items: GalleryItem[];
}

const CATEGORIES = ['Todos', 'Desayunos', 'Comidas', 'Cenas', 'Eventos'];

export default function Gallery({ items }: GalleryProps) {
  const [active, setActive] = useState('Todos');
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const filtered = active === 'Todos' ? items : items.filter((i) => i.category === active);

  return (
    <section ref={ref} className="bg-sea-900 pt-10 pb-14 md:pt-12 md:pb-20">
      <div className="max-w-editorial mx-auto px-6 md:px-10">
        <div className="grid grid-cols-12 gap-6 mb-12 md:mb-16">
          <div className="col-span-12 md:col-span-3">
            <span className="eyebrow text-foam-400">— Diario</span>
          </div>
          <div className="col-span-12 md:col-span-7">
            <h2 className="font-display font-light text-2xl md:text-3xl text-sand-50 leading-tight">
              Lo que <span className="italic text-gold-300">cocinamos</span> esta temporada.
            </h2>
          </div>
          <div className="col-span-12 md:col-span-2 md:text-right flex md:justify-end items-start">
            <a
              href="https://www.instagram.com/delixef.ibiza/"
              target="_blank"
              rel="noopener noreferrer"
              className="eyebrow text-sand-50/70 hover:text-gold-300 transition-colors"
            >
              @delixef.ibiza →
            </a>
          </div>
        </div>

        {/* Filtros */}
        <div className="flex flex-wrap gap-2 mb-10">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-4 py-1.5 rounded-full text-sm tracking-wide border transition-all duration-200 ${
                active === cat
                  ? 'bg-gold-400 border-gold-400 text-ink'
                  : 'border-sand-50/20 text-sand-50/60 hover:border-gold-400/60 hover:text-sand-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
          {filtered.map((item, i) => (
            <div
              key={item.src}
              className={`break-inside-avoid relative overflow-hidden rounded-lg group transition-all duration-500 ${
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <div className={`relative w-full ${i % 3 === 0 ? 'aspect-[4/5]' : 'aspect-[4/3]'}`}>
                <Image
                  src={item.src}
                  alt={item.label}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Gradiente permanente + nombre siempre visible */}
                <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-ink/70 to-transparent pointer-events-none" />
                <div className="absolute inset-x-0 bottom-0 p-3 flex items-end justify-between">
                  <span className="text-sand-50 text-xs font-semibold tracking-wide leading-snug drop-shadow-sm">
                    {item.label}
                  </span>
                  <span className="eyebrow text-sand-50/60 text-[0.6rem]">{item.category}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
