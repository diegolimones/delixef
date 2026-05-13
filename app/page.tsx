import Image from 'next/image';
import Link from 'next/link';
import { services } from '@/lib/services';
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
      {/* HERO — cinematográfico full-bleed */}
      <section className="relative bg-sand-50 -mt-20 md:-mt-24">
        <div className="relative h-[100vh] min-h-[680px] max-h-[1000px] overflow-hidden">
          {/* Imagen con animación breathing */}
          <div className="absolute inset-0 hero-breathe">
            <Image
              src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1600&q=85&auto=format&fit=crop"
              alt="Cala mediterránea con aguas turquesas en Ibiza"
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          </div>

          {/* Overlay gradiente */}
          <div
            aria-hidden="true"
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(180deg, oklch(0.13 0.05 232 / 0.45) 0%, oklch(0.13 0.05 232 / 0.10) 35%, oklch(0.13 0.05 232 / 0.30) 75%, oklch(0.13 0.05 232 / 0.70) 100%)',
            }}
          />

          {/* Olas animadas SVG */}
          <div aria-hidden="true" className="absolute bottom-0 left-0 right-0 h-32 md:h-44 overflow-hidden pointer-events-none">
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

          {/* Marca editorial */}
          <div className="absolute top-24 md:top-28 inset-x-0 z-10">
            <div className="max-w-editorial mx-auto px-6 md:px-10">
              <div className="flex items-center justify-between fade-up fade-up-1">
                <span className="eyebrow text-sand-50/95">N°01 · Edición del Mediterráneo</span>
                <span className="eyebrow text-sand-50/85 hidden md:inline tabular-nums">38°54′N · 1°26′E</span>
              </div>
            </div>
          </div>

          {/* Titular principal */}
          <div className="absolute inset-0 flex items-center z-10">
            <div className="max-w-editorial mx-auto px-6 md:px-10 w-full">
              <h1 className="font-display font-light text-display-xl text-sand-50 leading-[0.88]">
                <span className="block fade-up fade-up-2">Cocina</span>
                <span className="block italic font-normal text-gold-300 fade-up fade-up-3">del mar</span>
                <span className="block fade-up fade-up-4">en privado.</span>
              </h1>
              <div className="mt-8 md:mt-10 max-w-md fade-up fade-up-5">
                <p className="text-base md:text-lg text-sand-50/90 font-light leading-relaxed">
                  Chef privado en Ibiza, dirigido por Pau Baena.<br />
                  Cenas, eventos, bodas y celebraciones con producto local.
                </p>
              </div>
            </div>
          </div>

          {/* Indicador de scroll */}
          <div className="absolute bottom-6 left-0 right-0 z-10">
            <div className="max-w-editorial mx-auto px-6 md:px-10 flex items-end justify-between fade-up fade-up-6">
              <div className="hidden md:flex flex-col items-center">
                <span className="eyebrow text-sand-50/80 mb-3 -rotate-90 origin-bottom translate-y-2">Scroll</span>
                <span className="block w-px h-12 bg-sand-50/30 relative overflow-hidden">
                  <span className="absolute inset-0 bg-sand-50 scroll-pulse"></span>
                </span>
              </div>
              <div className="flex items-baseline gap-6 ml-auto">
                <span className="eyebrow text-sand-50/80">Santa Gertrudis</span>
                <span className="eyebrow text-sand-50/80 tabular-nums">DeliXef · 2026</span>
              </div>
            </div>
          </div>
        </div>

        {/* Lead + CTA + Stats — bajo la imagen */}
        <div className="max-w-editorial mx-auto px-6 md:px-10 pt-16 md:pt-24 pb-20 md:pb-28">
          <div className="grid grid-cols-12 gap-x-6 md:gap-x-10 gap-y-12">
            <div className="col-span-12 md:col-span-7 lg:col-span-6">
              <span className="eyebrow text-amber-500 block mb-6">— Manifiesto</span>
              <p className="font-display text-2xl md:text-3xl text-ink font-light leading-snug">
                <span className="italic text-sea-600">DeliXef</span> diseña la cocina de tus cenas, eventos y celebraciones privadas en Ibiza.
              </p>
              <p className="mt-6 text-base md:text-lg text-ink-soft font-light leading-relaxed max-w-md">
                Un equipo de cocina, barra y sala que llega a tu villa, monta el servicio y se va sin que tengas que mover un plato. Tú solo te ocupas de tus invitados.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row gap-3">
                <Link
                  href="/reservar"
                  className="inline-flex items-center justify-center bg-amber-500 hover:bg-amber-400 text-white px-8 py-4 text-xs font-semibold tracking-[0.22em] uppercase transition-colors rounded-full"
                >
                  Reservar mi experiencia
                </Link>
                <Link
                  href="/servicios"
                  className="inline-flex items-center justify-center px-2 py-4 text-xs font-semibold tracking-[0.22em] uppercase text-ink hover:text-amber-500 transition-colors"
                >
                  Ver servicios →
                </Link>
              </div>
            </div>

            <div className="col-span-12 md:col-span-4 md:col-start-9 md:border-l border-gold-200 md:pl-8">
              <span className="eyebrow text-amber-500 block mb-6">— Sobre la casa</span>
              <ul className="divide-y divide-gold-200/60">
                <li className="py-4 flex items-baseline justify-between">
                  <span className="eyebrow text-ink-mute">Cocina</span>
                  <span className="font-display text-xl text-ink italic">Mediterránea</span>
                </li>
                <li className="py-4 flex items-baseline justify-between">
                  <span className="eyebrow text-ink-mute">Formato</span>
                  <span className="font-display text-xl text-ink">Privado</span>
                </li>
                <li className="py-4 flex items-baseline justify-between">
                  <span className="eyebrow text-ink-mute">Aforo</span>
                  <span className="font-display text-xl text-ink tabular-nums">2 — 200</span>
                </li>
                <li className="py-4 flex items-baseline justify-between">
                  <span className="eyebrow text-ink-mute">Base</span>
                  <span className="font-display text-xl text-ink">Sta. Gertrudis</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <Gallery items={galeria} />

      {/* LISTA EDITORIAL DE SERVICIOS — fondo oscuro */}
      <section className="bg-sea-900 text-sand-50 py-24 md:py-36 relative overflow-hidden border-t border-sand-50/10">
        <svg aria-hidden="true" className="absolute top-0 left-0 right-0 w-full opacity-[0.07] pointer-events-none" viewBox="0 0 1440 120" preserveAspectRatio="none">
          <path d="M0,60 Q360,10 720,60 T1440,60" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <path d="M0,80 Q360,30 720,80 T1440,80" fill="none" stroke="currentColor" strokeWidth="1.5" />
        </svg>

        <div className="relative max-w-editorial mx-auto px-6 md:px-10">
          <div className="grid grid-cols-12 gap-6 mb-16 md:mb-24">
            <div className="col-span-12 md:col-span-3">
              <span className="eyebrow text-foam-400">— La Carta</span>
            </div>
            <div className="col-span-12 md:col-span-9">
              <h2 className="font-display font-light text-display-lg leading-[0.96]">
                Siete formatos.<br />
                <span className="italic text-gold-300">Una misma idea</span> de mesa.
              </h2>
            </div>
          </div>

          <ul className="divide-y divide-sand-50/15 border-y border-sand-50/15">
            {services.map((s) => (
              <li key={s.num}>
                <Link
                  href={`/servicios#${s.id}`}
                  className="group grid grid-cols-12 gap-4 md:gap-6 py-8 md:py-10 items-baseline hover:bg-sand-50/[0.04] transition-colors duration-300 -mx-4 px-4 md:-mx-6 md:px-6"
                >
                  <span className="col-span-2 md:col-span-1 font-display text-2xl md:text-3xl text-gold-400 font-light">{s.num}</span>
                  <div className="col-span-10 md:col-span-4">
                    <h3 className="font-display text-3xl md:text-5xl font-light text-sand-50 leading-none group-hover:italic transition-all duration-300">{s.name}</h3>
                    <div className="eyebrow text-foam-400 mt-2 md:mt-3">{s.subtitle}</div>
                  </div>
                  <p className="col-span-12 md:col-span-5 text-base md:text-lg text-sand-50/75 font-light leading-relaxed">{s.shortDescription}</p>
                  <div className="col-span-12 md:col-span-2 md:text-right">
                    <span className="eyebrow text-sand-50/50 block">Desde</span>
                    <span className="font-display text-xl md:text-2xl text-sand-50 mt-1 inline-block">{s.precio}</span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <ChefBio />
      <ValueProps />
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
