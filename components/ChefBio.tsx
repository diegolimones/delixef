import Image from 'next/image';
import Link from 'next/link';
import { supabaseServer } from '@/lib/supabase';

const stats = [
  { num: 'I.', label: 'Cocina', value: 'Mediterránea' },
  { num: 'II.', label: 'Base', value: 'Sta. Gertrudis · Ibiza' },
  { num: 'III.', label: 'Eventos', value: '+200 realizados' },
];

const FALLBACK_IMAGE =
  'https://images.unsplash.com/photo-1583394293214-28ded15ee548?w=1200&q=85&auto=format&fit=crop';

export default async function ChefBio() {
  const { data } = await supabaseServer
    .from('configuracion')
    .select('value')
    .eq('key', 'chef_image')
    .single();

  const chefImage = data?.value || FALLBACK_IMAGE;

  return (
    <section className="bg-sand-100 py-14 md:py-20 border-t border-sea-200/40">
      <div className="max-w-editorial mx-auto px-6 md:px-10">
        <div className="grid grid-cols-12 gap-y-8 gap-x-10">

          {/* Imagen */}
          <div className="col-span-12 md:col-span-5">
            <div className="relative aspect-[3/4] md:aspect-[4/5] overflow-hidden rounded-sm">
              <Image
                src={chefImage}
                alt="Pau Baena — Chef Delixef"
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                className="object-cover object-top"
              />
              <div className="absolute bottom-3 left-3 right-3 flex items-baseline justify-between text-sand-50">
                <span className="eyebrow">Pau Baena</span>
                <span className="eyebrow tabular-nums">Chef · Ibiza</span>
              </div>
            </div>
          </div>

          {/* Texto */}
          <div className="col-span-12 md:col-span-6 md:col-start-7 flex flex-col justify-center">
            <span className="eyebrow text-amber-500 block mb-4">— El chef</span>

            <h2 className="font-display font-light text-3xl md:text-4xl text-ink leading-tight mb-5">
              Cocinar es mi forma<br />
              de <span className="italic text-sea-600">conectar contigo</span>
            </h2>

            <p className="text-ink-soft text-base font-light leading-relaxed mb-3">
              Desde que llegué a Ibiza, me enamoré de sus mercados, sus ingredientes
              y la forma en que la gente come aquí — despacio, con calma, disfrutando
              cada bocado.
            </p>
            <p className="text-ink-soft text-base font-light leading-relaxed mb-6">
              Cada menú lo pienso para ti y para tus invitados. No hay dos iguales.
              Solo cocina honesta, producto de temporada y las ganas de que ese
              momento sea inolvidable.
            </p>

            <ul className="divide-y divide-sea-200/60 border-t border-sea-200/60 mb-6">
              {stats.map((s) => (
                <li key={s.label} className="py-3 flex items-baseline justify-between">
                  <div className="flex items-baseline gap-4">
                    <span className="font-display text-xl text-sea-400 font-light">{s.num}</span>
                    <span className="eyebrow text-ink-mute">{s.label}</span>
                  </div>
                  <span className="font-display text-xl text-ink italic">{s.value}</span>
                </li>
              ))}
            </ul>

            <Link
              href="/reservar"
              className="self-start inline-flex items-center gap-2 text-xs tracking-widest uppercase font-semibold text-ink hover:text-amber-500 transition-colors"
            >
              Reservar con Pau →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
