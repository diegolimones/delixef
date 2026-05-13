const pillars = [
  {
    num: 'I.',
    title: 'Cocina, salud y hábitos',
    body: 'La filosofía con la que cocina Pau Baena. Producto fresco, técnica precisa y menús que respetan a quién y cómo se come.',
  },
  {
    num: 'II.',
    title: 'Sin guion fijo',
    body: 'Cada menú se construye sobre la conversación previa: gustos, alergias, ritmo del evento, hora del atardecer en esa villa concreta.',
  },
  {
    num: 'III.',
    title: 'Servicio invisible',
    body: 'Llegamos, montamos, cocinamos y dejamos el espacio como lo encontramos. Tú solo te ocupas de tus invitados.',
  },
  {
    num: 'IV.',
    title: 'De Santa Gertrudis a toda la isla',
    body: 'Operamos desde el centro de Ibiza. Nos desplazamos con el equipo completo a calas, fincas y villas en cualquier punto.',
  },
];

export default function ValueProps() {
  return (
    <section className="bg-ink py-14 md:py-20 border-t border-sand-50/10">
      <div className="max-w-editorial mx-auto px-6 md:px-10">
        <div className="grid grid-cols-12 gap-6 mb-12">
          <div className="col-span-12 md:col-span-3">
            <span className="eyebrow text-foam-400">— Por qué Delixef</span>
          </div>
          <div className="col-span-12 md:col-span-9">
            <h2 className="font-display font-light text-3xl md:text-4xl text-sand-50 leading-tight">
              Cuatro razones.<br />
              <span className="italic text-gold-300">Una forma de entender la mesa.</span>
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 divide-sand-50/10 border-t border-sand-50/10">
          {pillars.map((p, i) => (
            <article
              key={p.num}
              className={`py-10 md:py-12 flex gap-6 md:gap-8 ${
                i % 2 === 0 ? 'md:border-r border-sand-50/10 md:pr-10' : 'md:pl-10'
              } ${i >= 2 ? 'md:border-t border-sand-50/10' : ''}`}
            >
              <span className="font-display text-2xl text-sea-400 font-light shrink-0 tabular-nums w-8">{p.num}</span>
              <div>
                <h3 className="font-display font-light text-xl md:text-2xl text-sand-50 mb-3 leading-snug">
                  {p.title}
                </h3>
                <p className="text-sand-50/65 text-base font-light leading-relaxed">
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
