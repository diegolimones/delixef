import Image from 'next/image';
import Link from 'next/link';

const stats = [
  { num: 'I.', label: 'Cocina', value: 'Mediterránea' },
  { num: 'II.', label: 'Base', value: 'Sta. Gertrudis · Ibiza' },
  { num: 'III.', label: 'Eventos', value: '+200 realizados' },
];

export default function ChefBio() {
  return (
    <section className="bg-sand-100 py-24 md:py-36 border-t border-sea-200/40">
      <div className="max-w-editorial mx-auto px-6 md:px-10">
        <div className="grid grid-cols-12 gap-y-12 gap-x-10">

          {/* Imagen */}
          <div className="col-span-12 md:col-span-5">
            <div className="relative aspect-[4/5] overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1583394293214-28ded15ee548?w=1200&q=85&auto=format&fit=crop"
                alt="Pau Baena — Chef Delixef"
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                className="object-cover"
              />
              <div className="absolute bottom-3 left-3 right-3 flex items-baseline justify-between text-sand-50">
                <span className="eyebrow">Pau Baena</span>
                <span className="eyebrow tabular-nums">Chef · Ibiza</span>
              </div>
            </div>
          </div>

          {/* Texto */}
          <div className="col-span-12 md:col-span-6 md:col-start-7 flex flex-col justify-center">
            <span className="eyebrow text-amber-500 block mb-8">— El chef</span>

            <h2 className="font-display font-light text-4xl md:text-5xl text-ink leading-tight mb-8">
              Cocinar es mi forma<br />
              de <span className="italic text-sea-600">conectar contigo</span>
            </h2>

            <p className="text-ink-soft text-lg font-light leading-relaxed mb-5">
              Desde que llegué a Ibiza, me enamoré de sus mercados, sus ingredientes
              y la forma en que la gente come aquí — despacio, con calma, disfrutando
              cada bocado.
            </p>
            <p className="text-ink-soft text-lg font-light leading-relaxed mb-10">
              Cada menú lo pienso para ti y para tus invitados. No hay dos iguales.
              Solo cocina honesta, producto de temporada y las ganas de que ese
              momento sea inolvidable.
            </p>

            {/* Stats editoriales */}
            <ul className="divide-y divide-sea-200/60 border-t border-sea-200/60 mb-10">
              {stats.map((s) => (
                <li key={s.label} className="py-4 flex items-baseline justify-between">
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
