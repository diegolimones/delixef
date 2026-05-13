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
