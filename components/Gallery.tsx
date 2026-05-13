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

const CATEGORIES = ['Todos', 'Arroces', 'Bodas', 'Eventos', 'Catering'];

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
    <section ref={ref} className="bg-warm-50 py-24 md:py-36">
      <div className="max-w-editorial mx-auto px-6 md:px-10">
        <div className="mb-12 md:mb-16">
          <span className="text-xs tracking-widest uppercase text-amber-500 block mb-3">— Galería</span>
          <h2 className="font-display font-light text-4xl md:text-5xl text-ink leading-tight">
            Nuestro trabajo <span className="italic text-gold-500">habla</span> por sí solo
          </h2>
        </div>

        <div className="flex flex-wrap gap-2 mb-10">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-4 py-1.5 rounded-full text-sm tracking-wide border transition-all duration-200 ${
                active === cat
                  ? 'bg-amber-500 border-amber-500 text-white'
                  : 'border-gold-200 text-ink-soft hover:border-amber-400 hover:text-amber-600'
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
                <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/40 transition-all duration-300 flex items-end p-4">
                  <span className="text-white text-sm font-medium opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                    {item.label}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
