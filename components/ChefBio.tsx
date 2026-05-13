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
