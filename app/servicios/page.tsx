import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { supabaseServer } from '@/lib/supabase';

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

export default async function Servicios() {
  const { data } = await supabaseServer
    .from('servicios')
    .select('num, name, subtitle, short_description, description, details, precio, image')
    .eq('available', true)
    .order('num', { ascending: true });

  const servicios = (data || []) as Array<{
    num: string;
    name: string;
    subtitle: string;
    short_description: string;
    description: string;
    details: string[];
    precio: string;
    image: string;
  }>;

  return (
    <>
      {/* HERO */}
      <section className="relative -mt-20 md:-mt-24">
        <div className="relative h-[55vh] min-h-[380px] max-h-[560px] overflow-hidden">
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
                'linear-gradient(180deg, oklch(0.13 0.05 232 / 0.50) 0%, oklch(0.13 0.05 232 / 0.20) 35%, oklch(0.13 0.05 232 / 0.50) 75%, oklch(0.13 0.05 232 / 0.85) 100%)',
            }}
          />

          <div className="absolute top-14 md:top-16 inset-x-0 z-10">
            <div className="max-w-editorial mx-auto px-6 md:px-10">
              <div className="flex items-center justify-between fade-up fade-up-1">
                <span className="eyebrow text-sand-50/95">N°02 · Servicios</span>
                <span className="eyebrow text-sand-50/85 hidden md:inline tabular-nums">07 formatos</span>
              </div>
            </div>
          </div>

          <div className="absolute inset-0 flex items-end pb-10 md:pb-14 z-10">
            <div className="max-w-editorial mx-auto px-6 md:px-10 w-full">
              <h1 className="font-display font-light text-4xl md:text-6xl text-sand-50 leading-tight">
                <span className="block fade-up fade-up-2">Servicios</span>
                <span className="block italic font-normal text-gold-300 fade-up fade-up-3">a medida</span>
              </h1>
              <div className="mt-3 max-w-md fade-up fade-up-5">
                <p className="text-sm md:text-base text-sand-50/85 font-light leading-relaxed">
                  Mediterránea, de producto, sin guion fijo. De Santa Gertrudis a toda la isla.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICIOS — alternating layout */}
      {servicios.map((s, i) => {
        const reversed = i % 2 === 1;
        return (
          <section
            key={s.num}
            id={s.num}
            className={`scroll-mt-24 py-10 md:py-14 border-t border-sea-200/40 ${
              i % 2 === 0 ? 'bg-sand-50' : 'bg-sand-100'
            }`}
          >
            <div className="max-w-editorial mx-auto px-6 md:px-10">
              <div className="grid grid-cols-12 gap-y-8 gap-x-8 items-start">

                {/* Imagen */}
                <div className={`col-span-12 md:col-span-5 ${reversed ? 'md:order-2' : ''}`}>
                  <div className="relative aspect-[3/2] overflow-hidden rounded-lg">
                    <Image
                      src={s.image}
                      alt={`${s.name} — ${s.subtitle}`}
                      fill
                      sizes="(max-width: 768px) 100vw, 40vw"
                      className="object-cover transition-transform duration-700 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/60 to-transparent" />
                    <div className="absolute bottom-3 left-4 right-4 flex items-baseline justify-between text-sand-50">
                      <span className="eyebrow">{s.subtitle}</span>
                      <span className="eyebrow tabular-nums">N°{s.num}</span>
                    </div>
                  </div>
                </div>

                {/* Contenido */}
                <div className={`col-span-12 md:col-span-6 ${reversed ? 'md:order-1' : 'md:col-start-7'}`}>
                  <div className="flex items-baseline gap-3 mb-3">
                    <span className="font-display text-lg text-amber-500 font-light">N°{s.num}</span>
                    <span className="eyebrow text-sea-600">{s.subtitle}</span>
                  </div>

                  <h2 className="font-display font-light text-2xl md:text-3xl text-ink leading-tight mb-4">
                    {s.name}
                  </h2>

                  <p className="text-sm md:text-base text-ink-soft font-light leading-relaxed">
                    {s.description}
                  </p>

                  <ul className="mt-6 divide-y divide-sea-200/50 border-y border-sea-200/50">
                    {s.details.map((d, idx) => (
                      <li key={idx} className="py-2.5 flex items-baseline gap-3">
                        <span className="font-display text-xs text-amber-500 font-light tabular-nums shrink-0">
                          {String(idx + 1).padStart(2, '0')}
                        </span>
                        <span className="text-ink font-light text-sm">{d}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 flex items-baseline justify-between gap-4">
                    <div>
                      <span className="eyebrow text-ink-mute block">Precio</span>
                      <span className="font-display text-2xl text-ink mt-1 inline-block">{s.precio}</span>
                    </div>
                    <Link
                      href="/reservar"
                      className="inline-flex items-center gap-2 text-xs font-semibold text-ink hover:text-amber-500 transition-colors uppercase tracking-[0.18em]"
                    >
                      Reservar <span className="w-8 h-px bg-current inline-block" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>
        );
      })}

      {/* PROCESO */}
      <section className="bg-sea-900 text-sand-50 py-12 md:py-16 border-t border-sand-50/10">
        <div className="max-w-editorial mx-auto px-6 md:px-10">
          <div className="grid grid-cols-12 gap-6 mb-10">
            <div className="col-span-12 md:col-span-3">
              <span className="eyebrow text-foam-400">— Proceso</span>
            </div>
            <div className="col-span-12 md:col-span-9">
              <h2 className="font-display font-light text-2xl md:text-3xl leading-tight">
                De la solicitud <span className="italic text-gold-300">a la mesa</span>.
              </h2>
            </div>
          </div>

          <ul className="grid grid-cols-1 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-sand-50/15">
            {proceso.map((p, i) => (
              <li key={p.label} className={`py-6 md:py-0 ${i === 0 ? 'md:pr-6' : i === 3 ? 'md:pl-6' : 'md:px-6'}`}>
                <span className="font-display text-xl text-gold-400 font-light">{p.label}</span>
                <h3 className="mt-3 font-display text-lg text-sand-50 font-light">{p.title}</h3>
                <p className="mt-2 text-sand-50/70 font-light leading-relaxed text-sm">{p.body}</p>
              </li>
            ))}
          </ul>

          <div className="mt-10 pt-8 border-t border-sand-50/15 flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-4">
            <p className="font-display text-xl md:text-2xl font-light">
              ¿Hablamos de tu evento?
            </p>
            <Link
              href="/reservar"
              className="inline-flex items-center justify-center bg-amber-500 hover:bg-amber-400 text-white px-6 py-3 text-xs font-semibold tracking-[0.22em] uppercase transition-colors rounded-full self-start sm:self-auto"
            >
              Solicitar fecha
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
