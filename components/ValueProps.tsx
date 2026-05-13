import Image from 'next/image';

const pillars = [
  {
    title: 'Menús 100%\npersonalizados',
    body: 'Adaptamos cada menú a tus gustos, restricciones y el tipo de evento. Nada es genérico.',
    image: 'https://images.unsplash.com/photo-1543340904-0890f9fe5df2?w=800&q=85&auto=format&fit=crop',
    label: 'A tu medida',
    gradient: 'from-amber-900/80 via-amber-800/50 to-transparent',
  },
  {
    title: 'Servicio\ncompleto',
    body: 'De la compra a la limpieza. Tú solo disfrutas. Nosotros nos encargamos de todo lo demás.',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=85&auto=format&fit=crop',
    label: 'Sin estrés',
    gradient: 'from-sea-900/80 via-sea-800/50 to-transparent',
  },
  {
    title: 'Producto local\nde temporada',
    body: 'Mercados locales de Ibiza, ingredientes de temporada, kilómetro 0. El sabor lo nota.',
    image: 'https://images.unsplash.com/photo-1464306208223-e0b4495b5776?w=800&q=85&auto=format&fit=crop',
    label: 'Km 0 · Ibiza',
    gradient: 'from-ink/80 via-ink/50 to-transparent',
  },
];

export default function ValueProps() {
  return (
    <section className="bg-warm-50 py-24 md:py-36">
      <div className="max-w-editorial mx-auto px-6 md:px-10">
        <div className="mb-14">
          <span className="text-xs tracking-widest uppercase text-amber-500 block mb-3">— Por qué Delixef</span>
          <h2 className="font-display font-light text-4xl md:text-5xl text-ink leading-tight">
            ¿Por qué <span className="italic text-gold-500">elegirnos?</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {pillars.map((p) => (
            <article
              key={p.title}
              className="relative overflow-hidden rounded-2xl group aspect-[3/4] md:aspect-auto md:min-h-[420px]"
            >
              {/* Imagen de fondo */}
              <Image
                src={p.image}
                alt={p.title.replace('\n', ' ')}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* Gradiente */}
              <div className={`absolute inset-0 bg-gradient-to-t ${p.gradient}`} />

              {/* Contenido */}
              <div className="absolute inset-0 flex flex-col justify-end p-8">
                <span className="text-xs tracking-widest uppercase text-sand-50/60 mb-4">{p.label}</span>
                <h3 className="font-display font-light text-3xl text-sand-50 leading-tight mb-4 whitespace-pre-line">
                  {p.title}
                </h3>
                <p className="text-sand-50/80 font-light leading-relaxed text-sm max-w-xs opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                  {p.body}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
