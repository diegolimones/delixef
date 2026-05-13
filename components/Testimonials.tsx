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
    <section className="bg-warm-200 py-8 md:py-10">
      <div className="max-w-editorial mx-auto px-6 md:px-10">
        <div className="text-center mb-5">
          <span className="text-xs tracking-widest uppercase text-amber-500 block mb-1">— Testimonios</span>
          <h2 className="font-display font-light text-xl md:text-2xl text-ink leading-tight">
            Lo que dicen <span className="italic text-gold-500">nuestros clientes</span>
          </h2>
        </div>

        <div className="max-w-xl mx-auto">
          <div className="bg-warm-50 rounded-lg p-5 border-l-4 border-amber-400 shadow-sm">
            <div className="flex gap-0.5 mb-3">
              {Array.from({ length: item.stars }).map((_, i) => (
                <span key={i} className="text-gold-400 text-sm">★</span>
              ))}
            </div>

            <p className="font-display font-light text-base text-ink leading-relaxed mb-3 italic">
              &ldquo;{item.text}&rdquo;
            </p>

            <div>
              <p className="font-medium text-ink text-xs">{item.name}</p>
              <p className="text-xs text-ink-soft font-light">{item.context}</p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-4 mt-4">
            <button
              onClick={prev}
              aria-label="anterior"
              className="w-7 h-7 rounded-full border border-gold-200 flex items-center justify-center text-ink-soft hover:border-amber-400 hover:text-amber-500 transition-colors text-xs"
            >
              ←
            </button>
            <div className="flex gap-1.5">
              {items.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`w-1.5 h-1.5 rounded-full transition-all ${
                    i === current ? 'bg-amber-400 w-4' : 'bg-gold-200'
                  }`}
                  aria-label={`ir al testimonio ${i + 1}`}
                />
              ))}
            </div>
            <button
              onClick={next}
              aria-label="siguiente"
              className="w-7 h-7 rounded-full border border-gold-200 flex items-center justify-center text-ink-soft hover:border-amber-400 hover:text-amber-500 transition-colors text-xs"
            >
              →
            </button>
          </div>
        </div>

        <div className="mt-6 pt-5 border-t border-gold-200/40">
          <p className="text-center text-xs tracking-widest uppercase text-ink-mute mb-3">Mencionados en</p>
          <div className="flex flex-wrap justify-center gap-5 md:gap-8">
            {PRESS.map((p) => (
              <span key={p} className="text-ink-mute/60 text-xs font-light tracking-wide">{p}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
