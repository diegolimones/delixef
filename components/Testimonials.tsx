'use client';

import { useState, useEffect } from 'react';

export interface TestimonialItem {
  name: string;
  context: string;
  text: string;
  stars: number;
}

interface TestimonialsProps {
  items: TestimonialItem[];
}

const PRESS = [
  'Bodas.net',
  'Conde Nast Traveller',
  'Welcome to Ibiza',
  'Diario de Ibiza',
  'Ibiza Style',
];

export default function Testimonials({ items }: TestimonialsProps) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((c) => (c + 1) % items.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [items.length]);

  const prev = () => setCurrent((c) => (c - 1 + items.length) % items.length);
  const next = () => setCurrent((c) => (c + 1) % items.length);

  const item = items[current];

  return (
    <section className="bg-warm-200 py-24 md:py-36">
      <div className="max-w-editorial mx-auto px-6 md:px-10">
        <div className="text-center mb-12">
          <span className="text-xs tracking-widest uppercase text-amber-500 block mb-3">— Testimonios</span>
          <h2 className="font-display font-light text-4xl md:text-5xl text-ink leading-tight">
            Lo que dicen <span className="italic text-gold-500">nuestros clientes</span>
          </h2>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="bg-warm-50 rounded-2xl p-10 border-l-4 border-amber-400 shadow-sm relative">
            <div className="flex gap-1 mb-6">
              {Array.from({ length: item.stars }).map((_, i) => (
                <span key={i} className="text-gold-400 text-xl">★</span>
              ))}
            </div>

            <p className="font-display font-light text-2xl text-ink leading-relaxed mb-8 italic">
              &ldquo;{item.text}&rdquo;
            </p>

            <div>
              <p className="font-medium text-ink">{item.name}</p>
              <p className="text-sm text-ink-soft">{item.context}</p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-6 mt-8">
            <button
              onClick={prev}
              aria-label="anterior"
              className="w-10 h-10 rounded-full border border-gold-200 flex items-center justify-center text-ink-soft hover:border-amber-400 hover:text-amber-500 transition-colors"
            >
              ←
            </button>
            <div className="flex gap-2">
              {items.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    i === current ? 'bg-amber-400 w-6' : 'bg-gold-200'
                  }`}
                  aria-label={`ir al testimonio ${i + 1}`}
                />
              ))}
            </div>
            <button
              onClick={next}
              aria-label="siguiente"
              className="w-10 h-10 rounded-full border border-gold-200 flex items-center justify-center text-ink-soft hover:border-amber-400 hover:text-amber-500 transition-colors"
            >
              →
            </button>
          </div>
        </div>

        <div className="mt-16 pt-12 border-t border-gold-200/40">
          <p className="text-center text-xs tracking-widest uppercase text-ink-mute mb-8">Mencionados en</p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-14">
            {PRESS.map((p) => (
              <span key={p} className="text-ink-mute/60 text-sm font-light tracking-wide">{p}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
