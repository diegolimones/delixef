import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Delixef — Private Chef Ibiza · Cocina Mediterránea Privada',
  description: 'DeliXef Private Events. Chef privado en Ibiza para cenas, eventos, bodas y celebraciones. Cocina mediterránea con producto local, dirigida por Pau Baena. Desde Santa Gertrudis para toda la isla.',
  openGraph: {
    title: 'Delixef — Private Chef Ibiza',
    description: 'Cocina mediterránea privada en Ibiza. Cenas, eventos, bodas y celebraciones.',
    type: 'website',
  },
};

const servicios = [
  {
    num: '01',
    name: 'Cenas en villa',
    subtitle: 'Bajo las estrellas',
    description:
      'Una cena privada con narrativa: cuatro o seis pases, vinos elegidos y servicio en mesa. Una sola mesa por noche, atención sin reparto.',
    desde: '80€',
  },
  {
    num: '02',
    name: 'Eventos privados',
    subtitle: 'Una ocasión especial',
    description:
      'Cumpleaños, retiros corporativos, presentaciones y celebraciones íntimas en villa. Servicio completo de cocina, barra y sala adaptado al espacio y al número.',
    desde: 'Consulta',
  },
  {
    num: '03',
    name: 'Bodas',
    subtitle: 'Frente al mar',
    description:
      'Diseñamos la experiencia gastronómica completa de tu boda en villa, finca o cala. De 50 a 200 invitados, cocina mediterránea, barras y arroces a la vista.',
    desde: '120€',
  },
  {
    num: '04',
    name: 'Arroces & barras',
    subtitle: 'Sello de la casa',
    description:
      'Arroces y paellas mediterráneas a la vista del invitado. Barras de cócteles con coctelería de autor para complementar el evento o como servicio independiente.',
    desde: 'Consulta',
  },
];

const principios = [
  {
    label: 'I.',
    title: 'Cocina, salud y hábitos',
    body: 'La filosofía con la que cocina Pau Baena. Producto fresco, técnica precisa y menús que respetan a quién y cómo se come.',
  },
  {
    label: 'II.',
    title: 'Sin guion fijo',
    body: 'Cada menú se construye sobre la conversación previa: gustos, alergias, ritmo del evento, hora del atardecer en esa villa concreta.',
  },
  {
    label: 'III.',
    title: 'Servicio invisible',
    body: 'Llegamos, montamos, cocinamos y dejamos el espacio como lo encontramos. Tú solo te ocupas de tus invitados.',
  },
  {
    label: 'IV.',
    title: 'De Santa Gertrudis a toda la isla',
    body: 'Operamos desde el centro de Ibiza. Nos desplazamos con el equipo completo a calas, fincas y villas en cualquier punto.',
  },
];

// Mediterranean / Ibiza imagery from Unsplash (CC0)
const heroImage =
  'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1600&q=85&auto=format&fit=crop';
const sideImage =
  'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1200&q=85&auto=format&fit=crop';
const ctaImage =
  'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=1600&q=85&auto=format&fit=crop';
const chefImage =
  'https://images.unsplash.com/photo-1583394293214-28ded15ee548?w=1200&q=85&auto=format&fit=crop';

// Testimonios — placeholders, sustituir por reales
const testimonios = [
  {
    quote:
      'Pau y su equipo entraron en la villa, montaron la cena para 30 invitados y al final de la noche ni nos dimos cuenta de que recogieron. La comida fue excepcional, pero el servicio es lo que más recordamos.',
    author: 'Marta & James',
    context: 'Cena privada · Villa en Cala Vadella',
  },
  {
    quote:
      'Buscábamos algo distinto a un catering tradicional para nuestra boda. Los arroces a la vista de los invitados fueron el momento de la noche. Trato personal y atención al detalle de principio a fin.',
    author: 'Lucía & Andrés',
    context: 'Boda · 110 invitados · Finca en Sant Joan',
  },
  {
    quote:
      'Organizamos un retiro corporativo de tres días y DeliXef nos resolvió las tres comidas diarias con menús distintos cada día. Producto local, técnica seria y mucha discreción.',
    author: 'Equipo de marca de moda',
    context: 'Retiro · 24 personas · Es Cubells',
  },
];

// Menciones / prensa — placeholders, sustituir por reales
const prensa = [
  { name: 'Bodas.net', context: 'Top catering Ibiza' },
  { name: 'Conde Nast Traveller', context: 'Mention 2024' },
  { name: 'Welcome to Ibiza', context: 'Featured chef' },
  { name: 'Diario de Ibiza', context: 'Gastronomía local' },
  { name: 'Ibiza Style', context: 'Editorial 2025' },
];

// Inspired by @delixef.ibiza Instagram content (paellas, barras, bodas)
const galeria = [
  {
    src: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=900&q=85&auto=format&fit=crop',
    label: 'Arroces a la vista',
    caption: 'Sello de la casa',
  },
  {
    src: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=900&q=85&auto=format&fit=crop',
    label: 'Barras de coctelería',
    caption: 'Servicio de bar',
  },
  {
    src: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=900&q=85&auto=format&fit=crop',
    label: 'Mesas frente al mar',
    caption: 'Boda en cala',
  },
  {
    src: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=900&q=85&auto=format&fit=crop',
    label: 'Producto local',
    caption: 'Mercado del puerto',
  },
];

export default function Home() {
  return (
    <>
      {/* HERO — cinematic full-bleed with animated waves */}
      <section className="relative bg-sand-50 -mt-20 md:-mt-24">
        {/* Cinematic image with breathing scale */}
        <div className="relative h-[100vh] min-h-[680px] max-h-[1000px] overflow-hidden">
          <div className="absolute inset-0 hero-breathe">
            <Image
              src={heroImage}
              alt="Cala mediterránea con aguas turquesas en Ibiza"
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          </div>

          {/* Gradient overlay — readable text without losing image */}
          <div
            aria-hidden="true"
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(180deg, oklch(0.13 0.05 232 / 0.45) 0%, oklch(0.13 0.05 232 / 0.10) 35%, oklch(0.13 0.05 232 / 0.30) 75%, oklch(0.13 0.05 232 / 0.70) 100%)',
            }}
          />

          {/* Animated waves at the bottom */}
          <div
            aria-hidden="true"
            className="absolute bottom-0 left-0 right-0 h-32 md:h-44 overflow-hidden pointer-events-none"
          >
            <svg
              className="absolute bottom-0 left-0 wave-animate-slow text-sand-50/20"
              style={{ width: '200%', height: '100%' }}
              viewBox="0 0 2880 160"
              preserveAspectRatio="none"
            >
              <path
                d="M0,80 Q360,30 720,80 T1440,80 T2160,80 T2880,80 L2880,160 L0,160 Z"
                fill="currentColor"
              />
            </svg>
            <svg
              className="absolute bottom-0 left-0 wave-animate text-sand-50/30"
              style={{ width: '200%', height: '100%' }}
              viewBox="0 0 2880 160"
              preserveAspectRatio="none"
            >
              <path
                d="M0,110 Q360,70 720,110 T1440,110 T2160,110 T2880,110 L2880,160 L0,160 Z"
                fill="currentColor"
              />
            </svg>
            <svg
              className="absolute bottom-0 left-0 wave-animate-reverse text-sand-50"
              style={{ width: '200%', height: '100%' }}
              viewBox="0 0 2880 160"
              preserveAspectRatio="none"
            >
              <path
                d="M0,140 Q360,115 720,140 T1440,140 T2160,140 T2880,140 L2880,160 L0,160 Z"
                fill="currentColor"
              />
            </svg>
          </div>

          {/* Edition mark — under the header */}
          <div className="absolute top-24 md:top-28 inset-x-0 z-10">
            <div className="max-w-editorial mx-auto px-6 md:px-10">
              <div className="flex items-center justify-between fade-up fade-up-1">
                <span className="eyebrow text-sand-50/95">
                  N°01 · Edición del Mediterráneo
                </span>
                <span className="eyebrow text-sand-50/85 hidden md:inline tabular-nums">
                  38°54′N · 1°26′E
                </span>
              </div>
            </div>
          </div>

          {/* Headline — over the image */}
          <div className="absolute inset-0 flex items-center z-10">
            <div className="max-w-editorial mx-auto px-6 md:px-10 w-full">
              <h1 className="font-display font-light text-display-xl text-sand-50 leading-[0.88]">
                <span className="block fade-up fade-up-2">Cocina</span>
                <span className="block italic font-normal text-coral-400 fade-up fade-up-3">
                  del mar
                </span>
                <span className="block fade-up fade-up-4">en privado.</span>
              </h1>

              <div className="mt-8 md:mt-10 max-w-md fade-up fade-up-5">
                <p className="text-base md:text-lg text-sand-50/90 font-light leading-relaxed">
                  Chef privado en Ibiza, dirigido por Pau Baena.
                  <br />
                  Cenas, eventos, bodas y celebraciones con producto local.
                </p>
              </div>
            </div>
          </div>

          {/* Bottom-left caption + scroll indicator */}
          <div className="absolute bottom-6 left-0 right-0 z-10">
            <div className="max-w-editorial mx-auto px-6 md:px-10 flex items-end justify-between fade-up fade-up-6">
              <div className="hidden md:flex flex-col items-center">
                <span className="eyebrow text-sand-50/80 mb-3 -rotate-90 origin-bottom translate-y-2">
                  Scroll
                </span>
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

        {/* Lead paragraph + CTA + Stats — below image, in sand */}
        <div className="max-w-editorial mx-auto px-6 md:px-10 pt-16 md:pt-24 pb-20 md:pb-28">
          <div className="grid grid-cols-12 gap-x-6 md:gap-x-10 gap-y-12">
            {/* Lead */}
            <div className="col-span-12 md:col-span-7 lg:col-span-6">
              <span className="eyebrow text-coral-600 block mb-6">— Manifiesto</span>
              <p className="font-display text-2xl md:text-3xl text-ink font-light leading-snug">
                <span className="italic text-sea-600">DeliXef</span> diseña la cocina de tus cenas, eventos y celebraciones privadas en Ibiza.
              </p>
              <p className="mt-6 text-base md:text-lg text-ink-soft font-light leading-relaxed max-w-md">
                Un equipo de cocina, barra y sala que llega a tu villa, monta el servicio y se va sin que tengas que mover un plato. Tú solo te ocupas de tus invitados.
              </p>

              <div className="mt-10 flex flex-col sm:flex-row gap-3">
                <Link
                  href="/reservar"
                  className="inline-flex items-center justify-center bg-ink text-sand-50 px-8 py-4 text-xs font-semibold tracking-[0.22em] uppercase hover:bg-coral-600 transition-colors"
                >
                  Solicitar presupuesto
                </Link>
                <Link
                  href="/servicios"
                  className="inline-flex items-center justify-center px-2 py-4 text-xs font-semibold tracking-[0.22em] uppercase text-ink hover:text-coral-600 transition-colors"
                >
                  Ver servicios →
                </Link>
              </div>
            </div>

            {/* Stats — vertical column on the right */}
            <div className="col-span-12 md:col-span-4 md:col-start-9 md:border-l border-sea-200/60 md:pl-8">
              <span className="eyebrow text-coral-600 block mb-6">— Sobre la casa</span>
              <ul className="divide-y divide-sea-200/60">
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

      {/* SERVICIOS — dark sea section with editorial list */}
      <section className="bg-sea-900 text-sand-50 py-24 md:py-36 relative overflow-hidden">
        {/* Decorative SVG waves */}
        <svg
          aria-hidden="true"
          className="absolute top-0 left-0 right-0 w-full opacity-[0.07] pointer-events-none"
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,60 Q360,10 720,60 T1440,60"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <path
            d="M0,80 Q360,30 720,80 T1440,80"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          />
        </svg>

        <div className="relative max-w-editorial mx-auto px-6 md:px-10">
          {/* Section header */}
          <div className="grid grid-cols-12 gap-6 mb-16 md:mb-24">
            <div className="col-span-12 md:col-span-3">
              <span className="eyebrow text-foam-400">— La Carta</span>
            </div>
            <div className="col-span-12 md:col-span-9">
              <h2 className="font-display font-light text-display-lg leading-[0.96]">
                Cuatro formatos.
                <br />
                <span className="italic text-coral-400">Una misma idea</span> de mesa.
              </h2>
            </div>
          </div>

          {/* Editorial list */}
          <ul className="divide-y divide-sand-50/15 border-y border-sand-50/15">
            {servicios.map((s) => (
              <li key={s.num}>
                <Link
                  href={`/servicios#${s.name.toLowerCase()}`}
                  className="group grid grid-cols-12 gap-4 md:gap-6 py-8 md:py-10 items-baseline hover:bg-sand-50/[0.04] transition-colors duration-300 -mx-4 px-4 md:-mx-6 md:px-6"
                >
                  <span className="col-span-2 md:col-span-1 font-display text-2xl md:text-3xl text-coral-400 font-light">
                    {s.num}
                  </span>
                  <div className="col-span-10 md:col-span-4">
                    <h3 className="font-display text-3xl md:text-5xl font-light text-sand-50 leading-none group-hover:italic transition-all duration-300">
                      {s.name}
                    </h3>
                    <div className="eyebrow text-foam-400 mt-2 md:mt-3">{s.subtitle}</div>
                  </div>
                  <p className="col-span-12 md:col-span-5 text-base md:text-lg text-sand-50/85 font-light leading-relaxed">
                    {s.description}
                  </p>
                  <div className="col-span-12 md:col-span-2 md:text-right">
                    <span className="eyebrow text-sand-50/60 block">Desde</span>
                    <span className="font-display text-xl md:text-2xl text-sand-50 mt-1 inline-block">
                      {s.desde}
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* EL CHEF — Pau Baena */}
      <section className="bg-sand-100 py-24 md:py-36 border-t border-sea-200/40">
        <div className="max-w-editorial mx-auto px-6 md:px-10">
          <div className="grid grid-cols-12 gap-y-12 gap-x-10">
            {/* Image */}
            <div className="col-span-12 md:col-span-5">
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src={chefImage}
                  alt="Pau Baena, chef y director gastronómico de DeliXef"
                  fill
                  sizes="(max-width: 768px) 100vw, 40vw"
                  className="object-cover"
                />
                <div className="absolute bottom-3 left-3 right-3 flex items-baseline justify-between text-sand-50">
                  <span className="eyebrow">Pau Baena Vidal</span>
                  <span className="eyebrow tabular-nums">Director gastronómico</span>
                </div>
              </div>
            </div>

            {/* Bio */}
            <div className="col-span-12 md:col-span-6 md:col-start-7">
              <span className="eyebrow text-coral-600 block mb-6">— El Chef</span>
              <h2 className="font-display font-light text-display-md text-ink leading-[1.04]">
                <span className="italic text-sea-600">Cocina,</span> salud
                <br />
                <span className="italic text-sea-600">y</span> hábitos.
              </h2>

              <p className="mt-8 text-lg text-ink-soft font-light leading-relaxed">
                Pau Baena dirige DeliXef desde Santa Gertrudis. Su forma de cocinar parte de tres ideas que repite como mantra:
                <span className="italic text-ink"> cocina, salud y hábitos.</span> Producto fresco, técnica precisa y menús diseñados para que la gastronomía no sea solo un fin, sino una manera de cuidar a quien se sienta a tu mesa.
              </p>

              <div className="mt-10 grid grid-cols-2 gap-6 pt-8 border-t border-sea-200/60">
                <div>
                  <span className="eyebrow text-ink-mute block mb-2">Trayectoria</span>
                  <span className="font-display text-xl text-ink">+10 años</span>
                </div>
                <div>
                  <span className="eyebrow text-ink-mute block mb-2">Eventos al año</span>
                  <span className="font-display text-xl text-ink">100+</span>
                </div>
              </div>

              <div className="mt-10">
                <a
                  href="https://www.instagram.com/chef.baena/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 text-sm font-semibold text-ink hover:text-coral-600 transition-colors uppercase tracking-[0.2em]"
                >
                  Sigue al chef en Instagram
                  <span className="w-10 h-px bg-current"></span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* GALERÍA — Instagram inspired */}
      <section className="bg-sand-50 py-20 md:py-28 border-t border-sea-200/40">
        <div className="max-w-editorial mx-auto px-6 md:px-10">
          {/* Header */}
          <div className="grid grid-cols-12 gap-6 mb-12 md:mb-16">
            <div className="col-span-12 md:col-span-3">
              <span className="eyebrow text-coral-600">— Diario</span>
            </div>
            <div className="col-span-12 md:col-span-7">
              <h2 className="font-display font-light text-display-md text-ink leading-[1.04]">
                Lo que <span className="italic text-sea-600">cocinamos</span> esta temporada.
              </h2>
            </div>
            <div className="col-span-12 md:col-span-2 md:text-right">
              <a
                href="https://www.instagram.com/delixef.ibiza/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-sm font-semibold text-ink hover:text-coral-600 transition-colors uppercase tracking-[0.2em]"
              >
                @delixef.ibiza →
              </a>
            </div>
          </div>

          {/* Editorial gallery — uniform aspect */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {galeria.map((g, i) => (
              <a
                key={i}
                href="https://www.instagram.com/delixef.ibiza/"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative overflow-hidden aspect-square"
              >
                <Image
                  src={g.src}
                  alt={g.label}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-ink/0 group-hover:bg-ink/30 transition-colors duration-300"
                />
                <div className="absolute bottom-3 left-3 right-3 text-sand-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="eyebrow block">{g.caption}</span>
                  <span className="font-display text-lg mt-1 block">{g.label}</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* PRINCIPIOS — manifesto with side image */}
      <section className="bg-sand-50 py-24 md:py-36">
        <div className="max-w-editorial mx-auto px-6 md:px-10">
          <div className="grid grid-cols-12 gap-y-16 gap-x-8">
            {/* Left — image + manifesto title */}
            <div className="col-span-12 md:col-span-5 lg:col-span-4">
              <div className="md:sticky md:top-32 space-y-10">
                {/* Side image */}
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Image
                    src={sideImage}
                    alt="Embarcación tradicional ibicenca en aguas mediterráneas"
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                  />
                  <div className="absolute bottom-3 left-3 right-3 flex items-baseline justify-between text-sand-50">
                    <span className="eyebrow">Llaüt — Sant Antoni</span>
                    <span className="eyebrow tabular-nums">N° 02</span>
                  </div>
                </div>

                <div>
                  <span className="eyebrow text-coral-600 block mb-6">— Principios</span>
                  <h2 className="font-display font-light text-display-md text-ink leading-[1.04]">
                    La forma en que <span className="italic text-sea-600">trabajamos</span>.
                  </h2>
                  <p className="mt-6 text-ink-soft font-light leading-relaxed max-w-sm">
                    Cuatro reglas que no negociamos. Todo lo demás —menú, hora, lugar— sí.
                  </p>
                </div>
              </div>
            </div>

            {/* Right — numbered list */}
            <div className="col-span-12 md:col-span-7 md:col-start-6 lg:col-span-7 lg:col-start-6">
              <ul className="space-y-12 md:space-y-14">
                {principios.map((p) => (
                  <li key={p.label} className="grid grid-cols-12 gap-4 items-baseline">
                    <span className="col-span-2 font-display text-3xl text-coral-600 font-light">
                      {p.label}
                    </span>
                    <div className="col-span-10">
                      <h3 className="font-display text-2xl md:text-3xl font-normal text-ink mb-3">
                        {p.title}
                      </h3>
                      <p className="text-base md:text-lg text-ink-soft font-light leading-relaxed">
                        {p.body}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIOS — editorial quotes */}
      <section className="bg-sand-100 border-t border-sea-200/40 py-24 md:py-36">
        <div className="max-w-editorial mx-auto px-6 md:px-10">
          <div className="grid grid-cols-12 gap-y-12 gap-x-8 mb-16 md:mb-20">
            <div className="col-span-12 md:col-span-3">
              <span className="eyebrow text-coral-600">— Voces</span>
            </div>
            <div className="col-span-12 md:col-span-9">
              <h2 className="font-display font-light text-display-lg text-ink leading-[0.96]">
                Lo que dicen
                <br />
                <span className="italic text-sea-600">de la mesa</span>.
              </h2>
            </div>
          </div>

          <ul className="grid grid-cols-1 md:grid-cols-3 gap-y-12 md:gap-x-10">
            {testimonios.map((t, i) => (
              <li
                key={i}
                className={`relative ${
                  i > 0 ? 'md:pl-10 md:border-l border-sea-200/60' : ''
                }`}
              >
                {/* Decorative open quote */}
                <span
                  aria-hidden="true"
                  className="absolute -top-6 md:-top-8 left-0 font-display font-light text-7xl md:text-8xl text-coral-400 leading-none select-none"
                >
                  «
                </span>

                <p className="font-display text-xl md:text-2xl text-ink font-light leading-snug pt-8 md:pt-10">
                  {t.quote}
                </p>

                <div className="mt-8 pt-6 border-t border-sea-200/60">
                  <div className="font-display text-lg text-ink italic">{t.author}</div>
                  <div className="eyebrow text-ink-mute mt-2">{t.context}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* PRENSA & MENCIONES — editorial masthead */}
      <section className="bg-sand-50 border-t border-sea-200/40 py-20 md:py-28">
        <div className="max-w-editorial mx-auto px-6 md:px-10">
          <div className="grid grid-cols-12 gap-y-10 gap-x-8 items-baseline">
            <div className="col-span-12 md:col-span-3">
              <span className="eyebrow text-coral-600 block mb-4">— Prensa</span>
              <h2 className="font-display font-light text-display-md text-ink leading-tight">
                Donde nos <span className="italic text-sea-600">han</span> hablado.
              </h2>
              <p className="mt-4 text-ink-soft font-light leading-relaxed max-w-xs">
                Apariciones en medios y guías especializadas en gastronomía y eventos en Ibiza.
              </p>
            </div>

            <div className="col-span-12 md:col-span-9">
              <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 divide-x divide-y md:divide-y-0 divide-sea-200/60 border-t border-b md:border-y border-sea-200/60">
                {prensa.map((p, i) => (
                  <li
                    key={i}
                    className="py-8 px-4 md:px-6 text-center group hover:bg-sand-100 transition-colors"
                  >
                    <div className="font-display text-lg md:text-xl text-ink font-light leading-tight transition-all duration-300 group-hover:italic">
                      {p.name}
                    </div>
                    <div className="eyebrow text-ink-mute mt-3">{p.context}</div>
                  </li>
                ))}
              </ul>

              <div className="mt-8 text-right">
                <a
                  href="mailto:info@delixef.com?subject=Prensa%20%2F%20Colaboraci%C3%B3n"
                  className="inline-flex items-center gap-3 text-sm font-semibold text-ink hover:text-coral-600 transition-colors uppercase tracking-[0.18em]"
                >
                  Contacto de prensa
                  <span className="w-10 h-px bg-current"></span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA — full bleed image with overlay */}
      <section className="relative overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <Image
            src={ctaImage}
            alt="Vista del mar Mediterráneo al atardecer en Ibiza"
            fill
            sizes="100vw"
            className="object-cover"
          />
          {/* Dark overlay */}
          <div
            aria-hidden="true"
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(180deg, oklch(0.13 0.05 232 / 0.85) 0%, oklch(0.13 0.05 232 / 0.78) 50%, oklch(0.13 0.05 232 / 0.92) 100%)',
            }}
          />
        </div>

        <div className="relative max-w-editorial mx-auto px-6 md:px-10 py-28 md:py-40 text-sand-50">
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 md:col-span-2">
              <span className="eyebrow text-coral-400">— Reservas</span>
            </div>
            <div className="col-span-12 md:col-span-10">
              <h2 className="font-display font-light text-display-lg leading-[0.96]">
                ¿Tienes una fecha
                <br />
                <span className="italic text-coral-400">y una mesa</span> en mente?
              </h2>
              <p className="mt-8 max-w-xl text-lg text-sand-50/85 font-light leading-relaxed">
                Cuéntanos qué celebras, cuántos sois y dónde. Te respondemos en menos de 24 horas con una propuesta de menú y presupuesto cerrado, sin compromiso.
              </p>
              <div className="mt-12 flex flex-col sm:flex-row gap-3">
                <Link
                  href="/reservar"
                  className="inline-flex items-center justify-center bg-coral-500 text-sand-50 px-8 py-4 text-xs font-semibold tracking-[0.22em] uppercase hover:bg-coral-600 transition-colors"
                >
                  Solicitar fecha
                </Link>
                <Link
                  href="/contacto"
                  className="inline-flex items-center justify-center px-2 py-4 text-xs font-semibold tracking-[0.22em] uppercase text-sand-50 hover:text-coral-400 transition-colors"
                >
                  Hablar con el chef →
                </Link>
              </div>
            </div>
          </div>

          {/* Decorative italic */}
          <div
            aria-hidden="true"
            className="hidden lg:block absolute -bottom-8 -right-4 font-display font-light italic text-[18rem] leading-none text-coral-400/[0.08] select-none pointer-events-none"
          >
            mar
          </div>
        </div>
      </section>
    </>
  );
}
