import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Servicios | Delixef — Chef Privado en Ibiza',
  description: 'Cenas privadas, eventos, bodas, arroces y barras de cócteles. DeliXef Private Events Ibiza. Servicio en toda la isla.',
  openGraph: {
    title: 'Servicios | Delixef',
    description: 'Chef privado, cenas, eventos y bodas en Ibiza',
    type: 'website',
  },
};

const heroImage =
  'https://images.unsplash.com/photo-1519741497674-611481863552?w=1600&q=85&auto=format&fit=crop';

const servicios = [
  {
    id: 'cenas',
    num: '01',
    name: 'Cenas en villa',
    subtitle: 'Bajo las estrellas',
    image:
      'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=85&auto=format&fit=crop',
    description:
      'Una cena privada con narrativa. Cuatro o seis pases, vinos elegidos, servicio en mesa. Una sola mesa por noche, atención sin reparto.',
    details: [
      'Menú degustación de cuatro o seis pases',
      'Maridaje cuidado, vinos seleccionados',
      'Iluminación y montaje de mesa incluidos',
      'Sobremesa con petit fours y digestivos',
      'Equipo discreto, te ocupas solo de tus invitados',
    ],
    precio: '80€',
  },
  {
    id: 'eventos',
    num: '02',
    name: 'Eventos privados',
    subtitle: 'Una ocasión especial',
    image:
      'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=1200&q=85&auto=format&fit=crop',
    description:
      'Cumpleaños, retiros corporativos, presentaciones de marca y celebraciones íntimas. Servicio adaptado al espacio y al número, desde una mesa hasta cien comensales.',
    details: [
      'Diseño integral del menú y la experiencia',
      'Servicio de cocina, barra y sala',
      'Estaciones gastronómicas y showcooking',
      'Branding y atrezzo del evento si aplica',
      'Coordinación con espacio y proveedores',
    ],
    precio: 'Consulta',
  },
  {
    id: 'bodas',
    num: '03',
    name: 'Bodas',
    subtitle: 'Frente al mar',
    image:
      'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=1200&q=85&auto=format&fit=crop',
    description:
      'Diseñamos la experiencia gastronómica completa de tu boda en Ibiza. Cocina mediterránea, servicio en mesa, barras de cócteles y arroces a la vista. De 50 a 200 invitados, en villa, finca o cala.',
    details: [
      'Menú degustación o servicio en mesa',
      'Cocktail de bienvenida con barra premium',
      'Arroces y paellas a la vista del invitado',
      'Equipo completo: cocina, barra, sala y producción',
      'Coordinación con wedding planner y espacio',
      'Catas previas y reuniones de planificación',
    ],
    precio: '120€',
  },
  {
    id: 'arroces-barras',
    num: '04',
    name: 'Arroces & barras',
    subtitle: 'Sello de la casa',
    image:
      'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=1200&q=85&auto=format&fit=crop',
    description:
      'Sello distintivo de DeliXef. Arroces y paellas mediterráneas a la vista del invitado y barras de coctelería de autor. Como complemento de un evento o como servicio independiente.',
    details: [
      'Paellas y arroces caldosos cocinados en directo',
      'Barra de coctelería con bartenders',
      'Selección de vinos, cervezas artesanas y sin alcohol',
      'Catering modular para grupos grandes',
      'Posibilidad de contratar como servicio aislado',
    ],
    precio: 'Consulta',
  },
];

const proceso = [
  {
    label: 'I.',
    title: 'Eliges fecha',
    body: 'Solicitas una fecha desde la web o por correo. Te confirmamos disponibilidad ese mismo día.',
  },
  {
    label: 'II.',
    title: 'Conversación',
    body: 'Una llamada o reunión para entender el evento, la villa, la mesa y los gustos.',
  },
  {
    label: 'III.',
    title: 'Propuesta',
    body: 'Te enviamos menú y presupuesto cerrado. Sin sorpresas en la factura.',
  },
  {
    label: 'IV.',
    title: 'Servicio',
    body: 'Llegamos, montamos, cocinamos y dejamos el espacio como lo encontramos.',
  },
];

export default function Servicios() {
  return (
    <>
      {/* HERO — cinematic */}
      <section className="relative -mt-20 md:-mt-24">
        <div className="relative h-[78vh] min-h-[560px] max-h-[820px] overflow-hidden">
          <div className="absolute inset-0 hero-breathe">
            <Image
              src={heroImage}
              alt="Mesa de boda elegante frente al mar Mediterráneo"
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

          {/* Edition mark */}
          <div className="absolute top-24 md:top-28 inset-x-0 z-10">
            <div className="max-w-editorial mx-auto px-6 md:px-10">
              <div className="flex items-center justify-between fade-up fade-up-1">
                <span className="eyebrow text-sand-50/95">N°02 · Servicios</span>
                <span className="eyebrow text-sand-50/85 hidden md:inline tabular-nums">
                  04 formatos
                </span>
              </div>
            </div>
          </div>

          {/* Headline */}
          <div className="absolute inset-0 flex items-center z-10">
            <div className="max-w-editorial mx-auto px-6 md:px-10 w-full">
              <h1 className="font-display font-light text-display-xl text-sand-50 leading-[0.88]">
                <span className="block fade-up fade-up-2">Servicios</span>
                <span className="block italic font-normal text-coral-400 fade-up fade-up-3">
                  a medida
                </span>
              </h1>

              <div className="mt-8 md:mt-10 max-w-md fade-up fade-up-5">
                <p className="text-base md:text-lg text-sand-50/90 font-light leading-relaxed">
                  Cuatro formatos de servicio, una misma idea de cocina. Mediterránea, de producto, sin guion fijo. De Santa Gertrudis a toda la isla.
                </p>
              </div>
            </div>
          </div>

          {/* Bottom caption */}
          <div className="absolute bottom-6 left-0 right-0 z-10">
            <div className="max-w-editorial mx-auto px-6 md:px-10 flex items-end justify-end fade-up fade-up-6">
              <div className="flex items-baseline gap-6">
                <span className="eyebrow text-sand-50/80">DeliXef</span>
                <span className="eyebrow text-sand-50/80 tabular-nums">Ibiza · 2026</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Servicios — full editorial sections, alternating with image */}
      {servicios.map((s, i) => {
        const reversed = i % 2 === 1;
        return (
          <section
            key={s.id}
            id={s.id}
            className={`scroll-mt-24 py-20 md:py-28 border-t border-sea-200/50 ${
              i % 2 === 0 ? 'bg-sand-50' : 'bg-sand-100'
            }`}
          >
            <div className="max-w-editorial mx-auto px-6 md:px-10">
              <div className="grid grid-cols-12 gap-y-10 gap-x-8 items-start">
                {/* Image */}
                <div
                  className={`col-span-12 md:col-span-5 ${
                    reversed ? 'md:order-2' : ''
                  }`}
                >
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <Image
                      src={s.image}
                      alt={`${s.name} — ${s.subtitle}`}
                      fill
                      sizes="(max-width: 768px) 100vw, 40vw"
                      className="object-cover transition-transform duration-700 hover:scale-105"
                    />
                    <div className="absolute bottom-3 left-3 right-3 flex items-baseline justify-between text-sand-50">
                      <span className="eyebrow">{s.subtitle}</span>
                      <span className="eyebrow tabular-nums">N° {s.num}</span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className={`col-span-12 md:col-span-6 ${reversed ? 'md:order-1' : 'md:col-start-7'}`}>
                  <span className="font-display text-2xl text-coral-600 font-light block mb-6">
                    N° {s.num}
                  </span>
                  <h2 className="font-display font-light text-display-lg text-ink leading-[0.95]">
                    {s.name}
                  </h2>
                  <div className="eyebrow text-sea-600 mt-4">{s.subtitle}</div>

                  <p className="mt-8 text-lg md:text-xl text-ink-soft font-light leading-relaxed">
                    {s.description}
                  </p>

                  <ul className="mt-10 divide-y divide-sea-200/60 border-y border-sea-200/60">
                    {s.details.map((d, idx) => (
                      <li key={idx} className="py-4 flex items-baseline gap-4">
                        <span className="font-display text-sm text-coral-600 font-light tabular-nums">
                          {String(idx + 1).padStart(2, '0')}
                        </span>
                        <span className="text-ink font-light">{d}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-10 flex items-baseline justify-between gap-6">
                    <div>
                      <span className="eyebrow text-ink-mute block">Desde</span>
                      <span className="font-display text-3xl md:text-4xl text-ink mt-1 inline-block">
                        {s.precio}
                      </span>
                      {s.precio !== 'Consulta' && (
                        <span className="text-ink-mute font-light ml-2">/ persona</span>
                      )}
                    </div>
                    <Link
                      href="/reservar"
                      className="inline-flex items-center gap-3 text-sm font-semibold text-ink hover:text-coral-600 transition-colors uppercase tracking-[0.18em]"
                    >
                      Reservar
                      <span className="w-10 h-px bg-current"></span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>
        );
      })}

      {/* Proceso — dark sea section */}
      <section className="bg-sea-900 text-sand-50 py-24 md:py-36 relative overflow-hidden">
        {/* Decorative SVG waves at top */}
        <svg
          aria-hidden="true"
          className="absolute top-0 left-0 right-0 w-full opacity-[0.07] pointer-events-none"
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
        >
          <path d="M0,60 Q360,10 720,60 T1440,60" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <path d="M0,80 Q360,30 720,80 T1440,80" fill="none" stroke="currentColor" strokeWidth="1.5" />
        </svg>

        <div className="relative max-w-editorial mx-auto px-6 md:px-10">
          <div className="grid grid-cols-12 gap-y-12 gap-x-8 mb-16">
            <div className="col-span-12 md:col-span-3">
              <span className="eyebrow text-foam-400">— Proceso</span>
            </div>
            <div className="col-span-12 md:col-span-9">
              <h2 className="font-display font-light text-display-lg leading-[0.96]">
                De la solicitud
                <br />
                <span className="italic text-coral-400">a la mesa</span>.
              </h2>
            </div>
          </div>

          <ul className="grid grid-cols-1 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-sand-50/15">
            {proceso.map((p, i) => (
              <li key={p.label} className={`py-8 md:py-0 ${i === 0 ? 'md:pr-8' : i === 3 ? 'md:pl-8' : 'md:px-8'}`}>
                <span className="font-display text-3xl text-coral-400 font-light">{p.label}</span>
                <h3 className="mt-4 font-display text-2xl text-sand-50">{p.title}</h3>
                <p className="mt-3 text-sand-50/80 font-light leading-relaxed">{p.body}</p>
              </li>
            ))}
          </ul>

          <div className="mt-20 pt-10 border-t border-sand-50/15 flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-6">
            <p className="font-display text-2xl md:text-3xl font-light max-w-xl">
              ¿Hablamos de tu evento?
            </p>
            <Link
              href="/reservar"
              className="inline-flex items-center justify-center bg-coral-500 text-sand-50 px-8 py-4 text-xs font-semibold tracking-[0.22em] uppercase hover:bg-coral-600 transition-colors self-start sm:self-auto"
            >
              Solicitar fecha
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
