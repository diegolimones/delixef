# Delixef Landing Page Redesign — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rediseñar la landing page de Delixef con paleta cálida (dorado + terracota + crema), sensación "cálida y cercana", con galería masonry, sección del chef, propuesta de valor, testimonios en carousel y CTA emocional.

**Architecture:** Rediseño iterativo — primero paleta + tokens de diseño, luego componentes nuevos (Gallery, ChefBio, ValueProps, Testimonials), finalmente ensamblaje en page.tsx. Los componentes existentes (Header, Footer) se modifican in-place para mantener compatibilidad con el resto del sitio.

**Tech Stack:** Next.js 16, React 19, Tailwind CSS 4.2 (CSS variables via @theme), TypeScript, React Testing Library, Jest, next/image.

---

## File Map

| Archivo | Acción | Responsabilidad |
|---------|--------|-----------------|
| `styles/globals.css` | Modificar | Agregar tokens de color: gold, amber, warm |
| `tailwind.config.ts` | Modificar | Registrar nuevos colores gold y amber |
| `components/Header.tsx` | Modificar | Navbar transparente que opaca al scroll |
| `components/Gallery.tsx` | Crear | Grid masonry con filtros por categoría |
| `components/ChefBio.tsx` | Crear | Sección sobre el chef con foto y 3 datos |
| `components/ValueProps.tsx` | Crear | 3 pilares de propuesta de valor |
| `components/Testimonials.tsx` | Crear | Carousel de testimonios |
| `components/Footer.tsx` | Modificar | Footer minimalista cálido oscuro |
| `app/page.tsx` | Modificar | Ensambla hero + todos los componentes |
| `__tests__/Gallery.test.tsx` | Crear | Tests de filtros y render |
| `__tests__/Testimonials.test.tsx` | Crear | Tests de carousel |
| `__tests__/ValueProps.test.tsx` | Crear | Test de render de pilares |
| `__tests__/ChefBio.test.tsx` | Crear | Test de render |

---

## Task 1: Agregar tokens de color cálidos en globals.css

**Files:**
- Modify: `styles/globals.css`

- [ ] **Step 1: Agregar variables de color gold y amber al bloque @theme**

Abrir `styles/globals.css` y dentro del bloque `@theme { ... }`, agregar justo después de los colores `--color-sea-*` existentes:

```css
  /* Gold — dorado cálido para headers y acentos elegantes */
  --color-gold-50: oklch(0.97 0.02 80);
  --color-gold-100: oklch(0.93 0.05 80);
  --color-gold-200: oklch(0.86 0.09 78);
  --color-gold-300: oklch(0.77 0.13 76);
  --color-gold-400: oklch(0.68 0.16 74);
  --color-gold-500: oklch(0.60 0.17 72);
  --color-gold-600: oklch(0.52 0.15 70);
  --color-gold-700: oklch(0.44 0.12 68);
  --color-gold-800: oklch(0.35 0.09 66);
  --color-gold-900: oklch(0.26 0.06 64);

  /* Amber — terracota cálido para CTAs y énfasis */
  --color-amber-50: oklch(0.97 0.02 55);
  --color-amber-100: oklch(0.93 0.05 52);
  --color-amber-200: oklch(0.86 0.10 50);
  --color-amber-300: oklch(0.76 0.15 48);
  --color-amber-400: oklch(0.66 0.18 46);
  --color-amber-500: oklch(0.57 0.19 44);
  --color-amber-600: oklch(0.49 0.17 42);
  --color-amber-700: oklch(0.41 0.14 40);
  --color-amber-800: oklch(0.33 0.10 38);
  --color-amber-900: oklch(0.25 0.07 36);

  /* Warm — fondo crema cálido para secciones */
  --color-warm-50: oklch(0.985 0.008 85);
  --color-warm-100: oklch(0.96 0.015 83);
  --color-warm-200: oklch(0.92 0.025 81);
```

- [ ] **Step 2: Verificar que el servidor de desarrollo no lanza errores de CSS**

```bash
npm run dev
```

Navegar a `http://localhost:3000` y verificar que carga sin errores en consola.

- [ ] **Step 3: Commit**

```bash
git add styles/globals.css
git commit -m "style: add gold, amber and warm color tokens"
```

---

## Task 2: Registrar nuevos colores en tailwind.config.ts

**Files:**
- Modify: `tailwind.config.ts`

- [ ] **Step 1: Agregar colores gold, amber y warm al theme**

En `tailwind.config.ts`, dentro de `theme.extend.colors`, agregar:

```ts
        gold: {
          50: 'oklch(0.97 0.02 80)',
          100: 'oklch(0.93 0.05 80)',
          200: 'oklch(0.86 0.09 78)',
          300: 'oklch(0.77 0.13 76)',
          400: 'oklch(0.68 0.16 74)',
          500: 'oklch(0.60 0.17 72)',
          600: 'oklch(0.52 0.15 70)',
          700: 'oklch(0.44 0.12 68)',
          800: 'oklch(0.35 0.09 68)',
          900: 'oklch(0.26 0.06 64)',
        },
        amber: {
          50: 'oklch(0.97 0.02 55)',
          100: 'oklch(0.93 0.05 52)',
          200: 'oklch(0.86 0.10 50)',
          300: 'oklch(0.76 0.15 48)',
          400: 'oklch(0.66 0.18 46)',
          500: 'oklch(0.57 0.19 44)',
          600: 'oklch(0.49 0.17 42)',
          700: 'oklch(0.41 0.14 40)',
          800: 'oklch(0.33 0.10 38)',
          900: 'oklch(0.25 0.07 36)',
        },
        warm: {
          50: 'oklch(0.985 0.008 85)',
          100: 'oklch(0.96 0.015 83)',
          200: 'oklch(0.92 0.025 81)',
        },
```

- [ ] **Step 2: Verificar build sin errores de TypeScript**

```bash
npx tsc --noEmit
```

Expected: sin errores.

- [ ] **Step 3: Commit**

```bash
git add tailwind.config.ts
git commit -m "style: register gold, amber, warm colors in tailwind"
```

---

## Task 3: Rediseñar Header con navbar transparente al scroll

**Files:**
- Modify: `components/Header.tsx`

- [ ] **Step 1: Leer el archivo actual**

```bash
cat components/Header.tsx
```

- [ ] **Step 2: Reemplazar el contenido completo del Header**

Escribir `components/Header.tsx`:

```tsx
'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-warm-50/95 backdrop-blur-sm shadow-sm border-b border-gold-200/40'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-editorial mx-auto px-6 md:px-10 h-16 md:h-20 flex items-center justify-between">
        <Link
          href="/"
          className={`font-display text-xl font-light tracking-wide transition-colors duration-300 ${
            scrolled ? 'text-ink' : 'text-sand-50'
          }`}
        >
          Delixef
        </Link>

        <nav className="flex items-center gap-8">
          <Link
            href="/servicios"
            className={`text-sm tracking-widest uppercase transition-colors duration-300 hover:text-amber-500 ${
              scrolled ? 'text-ink-soft' : 'text-sand-100'
            }`}
          >
            Servicios
          </Link>
          <Link
            href="/reservar"
            className={`text-sm px-5 py-2.5 rounded-full border transition-all duration-300 ${
              scrolled
                ? 'border-amber-500 text-amber-600 hover:bg-amber-500 hover:text-white'
                : 'border-sand-100/60 text-sand-50 hover:border-sand-50 hover:bg-sand-50/10'
            }`}
          >
            Reservar
          </Link>
        </nav>
      </div>
    </header>
  );
}
```

- [ ] **Step 3: Verificar que el sitio carga y el header funciona**

```bash
npm run dev
```

Navegar a `http://localhost:3000` y hacer scroll para verificar la transición transparente → crema.

- [ ] **Step 4: Commit**

```bash
git add components/Header.tsx
git commit -m "feat: transparent header with warm scroll transition"
```

---

## Task 4: Crear componente Gallery con grid masonry y filtros

**Files:**
- Create: `components/Gallery.tsx`
- Create: `__tests__/Gallery.test.tsx`

- [ ] **Step 1: Escribir el test primero**

Crear `__tests__/Gallery.test.tsx`:

```tsx
import { render, screen, fireEvent } from '@testing-library/react';
import Gallery from '../components/Gallery';

const mockItems = [
  { src: 'https://images.unsplash.com/photo-1?w=800', label: 'Paella valenciana', category: 'Arroces' },
  { src: 'https://images.unsplash.com/photo-2?w=800', label: 'Boda en villa', category: 'Bodas' },
  { src: 'https://images.unsplash.com/photo-3?w=800', label: 'Cena privada', category: 'Eventos' },
];

describe('Gallery', () => {
  it('renders all items by default', () => {
    render(<Gallery items={mockItems} />);
    expect(screen.getByAltText('Paella valenciana')).toBeInTheDocument();
    expect(screen.getByAltText('Boda en villa')).toBeInTheDocument();
    expect(screen.getByAltText('Cena privada')).toBeInTheDocument();
  });

  it('filters items by category', () => {
    render(<Gallery items={mockItems} />);
    fireEvent.click(screen.getByRole('button', { name: 'Bodas' }));
    expect(screen.getByAltText('Boda en villa')).toBeInTheDocument();
    expect(screen.queryByAltText('Paella valenciana')).not.toBeInTheDocument();
  });

  it('shows all items when Todos is clicked', () => {
    render(<Gallery items={mockItems} />);
    fireEvent.click(screen.getByRole('button', { name: 'Bodas' }));
    fireEvent.click(screen.getByRole('button', { name: 'Todos' }));
    expect(screen.getByAltText('Paella valenciana')).toBeInTheDocument();
    expect(screen.getByAltText('Boda en villa')).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Correr el test y verificar que falla**

```bash
npx jest __tests__/Gallery.test.tsx --no-coverage
```

Expected: FAIL — `Cannot find module '../components/Gallery'`

- [ ] **Step 3: Crear el componente Gallery**

Crear `components/Gallery.tsx`:

```tsx
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

        {/* Filtros */}
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

        {/* Grid masonry simulado con CSS columns */}
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
```

- [ ] **Step 4: Correr los tests y verificar que pasan**

```bash
npx jest __tests__/Gallery.test.tsx --no-coverage
```

Expected: PASS (3 tests)

- [ ] **Step 5: Commit**

```bash
git add components/Gallery.tsx __tests__/Gallery.test.tsx
git commit -m "feat: add Gallery component with masonry grid and category filters"
```

---

## Task 5: Crear componente ChefBio

**Files:**
- Create: `components/ChefBio.tsx`
- Create: `__tests__/ChefBio.test.tsx`

- [ ] **Step 1: Escribir el test**

Crear `__tests__/ChefBio.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react';
import ChefBio from '../components/ChefBio';

describe('ChefBio', () => {
  it('renders chef name', () => {
    render(<ChefBio />);
    expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument();
  });

  it('renders the 3 stat items', () => {
    render(<ChefBio />);
    expect(screen.getByText(/Ibiza/i)).toBeInTheDocument();
    expect(screen.getByText(/Mediterránea/i)).toBeInTheDocument();
    expect(screen.getByText(/eventos/i)).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Correr el test y verificar que falla**

```bash
npx jest __tests__/ChefBio.test.tsx --no-coverage
```

Expected: FAIL — `Cannot find module '../components/ChefBio'`

- [ ] **Step 3: Crear el componente ChefBio**

Crear `components/ChefBio.tsx`:

```tsx
import Image from 'next/image';

const stats = [
  { icon: '🍴', label: 'Desde 2018 en Ibiza' },
  { icon: '🌊', label: 'Cocina Mediterránea' },
  { icon: '⭐', label: '+200 eventos realizados' },
];

export default function ChefBio() {
  return (
    <section className="bg-warm-100 py-24 md:py-36">
      <div className="max-w-editorial mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
          {/* Imagen */}
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl shadow-xl">
            <Image
              src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=900&q=85&auto=format&fit=crop"
              alt="Chef Delixef en la cocina"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
              priority={false}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/30 to-transparent" />
          </div>

          {/* Texto */}
          <div>
            <span className="text-xs tracking-widest uppercase text-amber-500 block mb-4">— El chef</span>
            <h2 className="font-display font-light text-4xl md:text-5xl text-ink leading-tight mb-6">
              Cocinar es mi forma de<br />
              <span className="italic text-gold-500">conectar contigo</span>
            </h2>
            <p className="text-ink-soft text-lg font-light leading-relaxed mb-4">
              Desde que llegué a Ibiza hace años, me enamoré de sus mercados, sus
              ingredientes y la forma en que la gente come aquí — despacio, con calma,
              disfrutando cada bocado.
            </p>
            <p className="text-ink-soft text-lg font-light leading-relaxed mb-10">
              Cada menú que diseño lo pienso para ti y para tus invitados. No hay dos
              iguales. Solo cocina honesta, ingredientes de temporada y las ganas de
              que ese momento sea inolvidable.
            </p>

            {/* Stats */}
            <ul className="space-y-4 border-t border-gold-200 pt-8">
              {stats.map((s) => (
                <li key={s.label} className="flex items-center gap-4">
                  <span className="text-2xl">{s.icon}</span>
                  <span className="text-ink-soft font-light">{s.label}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Correr los tests**

```bash
npx jest __tests__/ChefBio.test.tsx --no-coverage
```

Expected: PASS (2 tests)

- [ ] **Step 5: Commit**

```bash
git add components/ChefBio.tsx __tests__/ChefBio.test.tsx
git commit -m "feat: add ChefBio component with personal bio and stats"
```

---

## Task 6: Crear componente ValueProps

**Files:**
- Create: `components/ValueProps.tsx`
- Create: `__tests__/ValueProps.test.tsx`

- [ ] **Step 1: Escribir el test**

Crear `__tests__/ValueProps.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react';
import ValueProps from '../components/ValueProps';

describe('ValueProps', () => {
  it('renders 3 value proposition cards', () => {
    render(<ValueProps />);
    const cards = screen.getAllByRole('article');
    expect(cards).toHaveLength(3);
  });

  it('renders the section heading', () => {
    render(<ValueProps />);
    expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Correr el test y verificar que falla**

```bash
npx jest __tests__/ValueProps.test.tsx --no-coverage
```

Expected: FAIL — `Cannot find module '../components/ValueProps'`

- [ ] **Step 3: Crear el componente ValueProps**

Crear `components/ValueProps.tsx`:

```tsx
const pillars = [
  {
    icon: '🍽️',
    title: 'Menús 100% personalizados',
    body: 'Adaptamos cada menú a tus gustos, restricciones y el tipo de evento. Nada es genérico.',
  },
  {
    icon: '📋',
    title: 'Servicio completo',
    body: 'De la compra a la limpieza. Tú solo disfrutas. Nosotros nos encargamos de todo lo demás.',
  },
  {
    icon: '🌿',
    title: 'Producto local de temporada',
    body: 'Mercados locales de Ibiza, ingredientes de temporada, kilómetro 0. El sabor lo nota.',
  },
];

export default function ValueProps() {
  return (
    <section className="bg-sea-50/30 py-24 md:py-36">
      <div className="max-w-editorial mx-auto px-6 md:px-10">
        <div className="text-center mb-14">
          <span className="text-xs tracking-widest uppercase text-sea-500 block mb-3">— Por qué Delixef</span>
          <h2 className="font-display font-light text-4xl md:text-5xl text-ink leading-tight">
            ¿Por qué elegirnos?
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {pillars.map((p) => (
            <article
              key={p.title}
              className="bg-warm-50 rounded-2xl p-8 border border-gold-200/50 hover:border-gold-400/70 hover:shadow-lg transition-all duration-300"
            >
              <span className="text-4xl block mb-5">{p.icon}</span>
              <h3 className="font-display text-xl text-ink mb-3">{p.title}</h3>
              <p className="text-ink-soft font-light leading-relaxed">{p.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Correr los tests**

```bash
npx jest __tests__/ValueProps.test.tsx --no-coverage
```

Expected: PASS (2 tests)

- [ ] **Step 5: Commit**

```bash
git add components/ValueProps.tsx __tests__/ValueProps.test.tsx
git commit -m "feat: add ValueProps component with 3 service pillars"
```

---

## Task 7: Crear componente Testimonials con carousel

**Files:**
- Create: `components/Testimonials.tsx`
- Create: `__tests__/Testimonials.test.tsx`

- [ ] **Step 1: Escribir el test**

Crear `__tests__/Testimonials.test.tsx`:

```tsx
import { render, screen, fireEvent } from '@testing-library/react';
import Testimonials from '../components/Testimonials';

const mockTestimonials = [
  { name: 'Sarah & Tom', context: 'Boda en Villa, Ibiza 2024', text: 'Los invitados aún hablan de ello', stars: 5 },
  { name: 'María García', context: 'Cena privada, 2024', text: 'Una experiencia increíble', stars: 5 },
];

describe('Testimonials', () => {
  it('renders the first testimonial by default', () => {
    render(<Testimonials items={mockTestimonials} />);
    expect(screen.getByText('Los invitados aún hablan de ello')).toBeInTheDocument();
  });

  it('navigates to next testimonial on arrow click', () => {
    render(<Testimonials items={mockTestimonials} />);
    fireEvent.click(screen.getByRole('button', { name: /siguiente/i }));
    expect(screen.getByText('Una experiencia increíble')).toBeInTheDocument();
  });

  it('renders star rating', () => {
    render(<Testimonials items={mockTestimonials} />);
    expect(screen.getAllByText('★')).toHaveLength(5);
  });
});
```

- [ ] **Step 2: Correr el test y verificar que falla**

```bash
npx jest __tests__/Testimonials.test.tsx --no-coverage
```

Expected: FAIL — `Cannot find module '../components/Testimonials'`

- [ ] **Step 3: Crear el componente Testimonials**

Crear `components/Testimonials.tsx`:

```tsx
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
            {/* Stars */}
            <div className="flex gap-1 mb-6">
              {Array.from({ length: item.stars }).map((_, i) => (
                <span key={i} className="text-gold-400 text-xl">★</span>
              ))}
            </div>

            {/* Quote */}
            <p className="font-display font-light text-2xl text-ink leading-relaxed mb-8 italic">
              &ldquo;{item.text}&rdquo;
            </p>

            {/* Author */}
            <div>
              <p className="font-medium text-ink">{item.name}</p>
              <p className="text-sm text-ink-soft">{item.context}</p>
            </div>
          </div>

          {/* Controls */}
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

        {/* Prensa */}
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
```

- [ ] **Step 4: Correr los tests**

```bash
npx jest __tests__/Testimonials.test.tsx --no-coverage
```

Expected: PASS (3 tests)

- [ ] **Step 5: Commit**

```bash
git add components/Testimonials.tsx __tests__/Testimonials.test.tsx
git commit -m "feat: add Testimonials carousel with press logos"
```

---

## Task 8: Rediseñar Footer

**Files:**
- Modify: `components/Footer.tsx`

- [ ] **Step 1: Leer el footer actual**

```bash
cat components/Footer.tsx
```

- [ ] **Step 2: Reemplazar el Footer**

Escribir `components/Footer.tsx`:

```tsx
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-ink py-16 px-6 md:px-10">
      <div className="max-w-editorial mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
          {/* Brand */}
          <div>
            <p className="font-display text-2xl font-light text-sand-50 mb-3">Delixef</p>
            <p className="text-sm text-ink-mute font-light leading-relaxed">
              Chef privado en Ibiza.<br />
              Experiencias gastronómicas únicas para momentos que no se olvidan.
            </p>
          </div>

          {/* Links */}
          <div>
            <p className="text-xs tracking-widest uppercase text-gold-500 mb-4">Explorar</p>
            <ul className="space-y-2">
              {[
                { href: '/servicios', label: 'Servicios' },
                { href: '/reservar', label: 'Reservar' },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-ink-mute hover:text-sand-100 transition-colors font-light">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-xs tracking-widest uppercase text-gold-500 mb-4">Contacto</p>
            <ul className="space-y-2">
              <li>
                <a href="https://instagram.com/delixef.ibiza" target="_blank" rel="noopener noreferrer"
                  className="text-sm text-ink-mute hover:text-sand-100 transition-colors font-light">
                  @delixef.ibiza
                </a>
              </li>
              <li>
                <a href="mailto:hola@delixef.com"
                  className="text-sm text-ink-mute hover:text-sand-100 transition-colors font-light">
                  hola@delixef.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-ink-mute/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-ink-mute/50 font-light">© 2025 Delixef. Todos los derechos reservados.</p>
          <p className="text-xs text-ink-mute/50 font-light">Ibiza, España</p>
        </div>
      </div>
    </footer>
  );
}
```

- [ ] **Step 3: Verificar en el navegador que el footer se ve correcto**

```bash
npm run dev
```

Ir a `http://localhost:3000` y verificar el footer al final de la página.

- [ ] **Step 4: Commit**

```bash
git add components/Footer.tsx
git commit -m "feat: redesign footer with warm dark theme and minimal layout"
```

---

## Task 9: Ensamblar la nueva landing en app/page.tsx

**Files:**
- Modify: `app/page.tsx`

- [ ] **Step 1: Leer el page.tsx actual completo para entender qué reutilizar**

```bash
cat app/page.tsx
```

- [ ] **Step 2: Reemplazar app/page.tsx con el nuevo ensamblaje**

Escribir `app/page.tsx`:

```tsx
import Image from 'next/image';
import Link from 'next/link';
import Gallery, { GalleryItem } from '../components/Gallery';
import ChefBio from '../components/ChefBio';
import ValueProps from '../components/ValueProps';
import Testimonials, { TestimonialItem } from '../components/Testimonials';

const galeria: GalleryItem[] = [
  { src: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=900&q=85&auto=format&fit=crop', label: 'Paella valenciana', category: 'Arroces' },
  { src: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=900&q=85&auto=format&fit=crop', label: 'Cena íntima', category: 'Eventos' },
  { src: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=900&q=85&auto=format&fit=crop', label: 'Boda en villa', category: 'Bodas' },
  { src: 'https://images.unsplash.com/photo-1555244162-803834f70033?w=900&q=85&auto=format&fit=crop', label: 'Catering eventos', category: 'Catering' },
  { src: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=900&q=85&auto=format&fit=crop', label: 'Barra libre', category: 'Bodas' },
  { src: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=900&q=85&auto=format&fit=crop', label: 'Arroz negro', category: 'Arroces' },
];

const testimonios: TestimonialItem[] = [
  {
    name: 'Sarah & Tom',
    context: 'Boda en Villa, Ibiza 2024',
    text: 'Contratar a Delixef fue lo mejor que hicimos para nuestra boda. Los invitados aún hablan de ello. La paella fue espectacular.',
    stars: 5,
  },
  {
    name: 'Carlos Martínez',
    context: 'Cena de aniversario privada, 2024',
    text: 'Una experiencia que no olvidaremos. El menú fue perfecto, el servicio impecable y la atención al detalle increíble.',
    stars: 5,
  },
  {
    name: 'The Johnson Family',
    context: 'Alquiler vacacional, verano 2024',
    text: 'Tres semanas con Delixef cocinando para nosotros. Cada día una sorpresa. El mejor recuerdo de nuestras vacaciones.',
    stars: 5,
  },
];

export default function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Imagen de fondo */}
        <Image
          src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1920&q=90&auto=format&fit=crop"
          alt="Mesa al atardecer en Ibiza"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        {/* Overlay cálido */}
        <div className="absolute inset-0 bg-gradient-to-b from-ink/60 via-ink/40 to-ink/70" />
        <div className="absolute inset-0 bg-amber-900/20" />

        {/* Contenido */}
        <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
          <h1 className="font-display font-light text-5xl md:text-7xl text-sand-50 leading-[1.05] mb-6 animate-fade-in">
            Tu chef privado<br />
            <span className="italic text-gold-300">en Ibiza</span>
          </h1>
          <p className="text-sand-100/80 text-lg md:text-xl font-light leading-relaxed mb-10 max-w-xl mx-auto">
            Experiencias gastronómicas únicas para momentos que no se olvidan
          </p>
          <Link
            href="/reservar"
            className="inline-block bg-amber-500 hover:bg-amber-400 text-white px-10 py-4 rounded-full text-sm tracking-widest uppercase transition-all duration-300 hover:scale-105 hover:shadow-xl"
          >
            Reservar mi experiencia →
          </Link>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
          <div className="w-px h-8 bg-sand-50/40" />
          <span className="text-xs tracking-widest uppercase text-sand-50/40">Scroll</span>
        </div>
      </section>

      {/* GALERÍA */}
      <Gallery items={galeria} />

      {/* CHEF BIO */}
      <ChefBio />

      {/* VALUE PROPS */}
      <ValueProps />

      {/* TESTIMONIOS */}
      <Testimonials items={testimonios} />

      {/* CTA FINAL */}
      <section className="relative py-32 md:py-48 overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1559339352-11d035aa65de?w=1920&q=85&auto=format&fit=crop"
          alt="Mesa preparada al atardecer"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-amber-900/80 to-ink/70" />

        <div className="relative z-10 text-center px-6 max-w-2xl mx-auto">
          <h2 className="font-display font-light text-4xl md:text-6xl text-sand-50 leading-tight mb-6">
            ¿Listo para tu<br />
            <span className="italic text-gold-300">experiencia?</span>
          </h2>
          <p className="text-sand-100/70 text-lg font-light mb-10">
            Cuéntanos qué tienes en mente y creamos algo especial para ti
          </p>
          <Link
            href="/reservar"
            className="inline-block border-2 border-sand-50 text-sand-50 hover:bg-sand-50 hover:text-ink px-10 py-4 rounded-full text-sm tracking-widest uppercase transition-all duration-300"
          >
            Reservar mi experiencia →
          </Link>
        </div>
      </section>
    </>
  );
}
```

- [ ] **Step 3: Verificar que la página carga sin errores**

```bash
npm run dev
```

Navegar a `http://localhost:3000` y verificar todas las secciones: Hero, Galería, ChefBio, ValueProps, Testimonials, CTA.

- [ ] **Step 4: Verificar build de producción**

```bash
npm run build
```

Expected: Build exitoso sin errores de TypeScript.

- [ ] **Step 5: Commit**

```bash
git add app/page.tsx
git commit -m "feat: assemble new landing page with all redesigned sections"
```

---

## Task 10: Correr todos los tests y verificar integridad

**Files:**
- No new files

- [ ] **Step 1: Correr el suite completo de tests**

```bash
npx jest --no-coverage
```

Expected: todos los tests pasan (Gallery, ChefBio, ValueProps, Testimonials + tests preexistentes).

- [ ] **Step 2: Verificar TypeScript sin errores**

```bash
npx tsc --noEmit
```

Expected: sin errores.

- [ ] **Step 3: Verificar responsive en mobile**

Abrir `http://localhost:3000` en DevTools con viewport 375px (iPhone) y verificar:
- Hero: texto legible, CTA visible
- Galería: columna única, imágenes se cargan
- ChefBio: imagen arriba, texto abajo
- ValueProps: cards en columna
- Testimonials: carousel funciona
- Footer: columna única

- [ ] **Step 4: Commit final**

```bash
git add -A
git commit -m "test: verify all landing redesign tests pass"
```

---

## Self-Review

**Spec coverage:**
- ✅ Hero con video/imagen, overlay, tagline, CTA → Task 9
- ✅ Navbar transparente al scroll → Task 3
- ✅ Galería masonry con filtros → Task 4
- ✅ Sección chef, foto, texto personal, 3 stats → Task 5
- ✅ Propuesta de valor 3 pilares → Task 6
- ✅ Testimonios con carousel y prensa → Task 7
- ✅ CTA final con imagen de fondo → Task 9
- ✅ Footer minimalista oscuro → Task 8
- ✅ Paleta gold + amber + warm → Task 1 + Task 2
- ✅ Animaciones staggered y fade-in → Tasks 4, 9

**Placeholder scan:** Ninguno. Todo el código está completo.

**Type consistency:** `GalleryItem` y `TestimonialItem` definidos en sus componentes e importados en `page.tsx` con los mismos nombres.
