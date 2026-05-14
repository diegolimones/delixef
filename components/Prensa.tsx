import { supabaseServer } from '@/lib/supabase';

interface PrensaItem {
  name: string;
  url: string | null;
  logo_url: string | null;
  descripcion: string | null;
}

export default async function Prensa() {
  const { data } = await supabaseServer
    .from('prensa')
    .select('name, url, logo_url, descripcion')
    .eq('visible', true)
    .order('orden', { ascending: true });

  const items: PrensaItem[] = data || [];
  if (items.length === 0) return null;

  const hasRichData = items.some((p) => p.descripcion || p.url);

  return (
    <section className="bg-sea-900 text-sand-50 py-12 md:py-16 border-t border-sand-50/10">
      <div className="max-w-editorial mx-auto px-6 md:px-10">

        {/* Cabecera */}
        <div className="grid grid-cols-12 gap-6 mb-10 md:mb-12">
          <div className="col-span-12 md:col-span-3">
            <span className="eyebrow text-foam-400">— En prensa</span>
          </div>
          <div className="col-span-12 md:col-span-7">
            <h2 className="font-display font-light text-2xl md:text-3xl leading-tight">
              Nos han <span className="italic text-gold-300">mencionado</span>
            </h2>
          </div>
        </div>

        {hasRichData ? (
          /* Tarjetas editoriales */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-sand-50/10 border border-sand-50/10">
            {items.map((p) => {
              const Inner = (
                <>
                  {/* Cabecera de tarjeta */}
                  <div className="flex items-start justify-between mb-4">
                    <span className="eyebrow text-foam-400 leading-snug">{p.name}</span>
                    {p.url && (
                      <span className="text-gold-300/60 text-xs mt-0.5">↗</span>
                    )}
                  </div>

                  {/* Titular / descripción */}
                  {p.descripcion ? (
                    <p className="font-display font-light text-lg md:text-xl text-sand-50 italic leading-snug flex-1">
                      &ldquo;{p.descripcion}&rdquo;
                    </p>
                  ) : (
                    <p className="font-display font-light text-lg text-sand-50/40 italic leading-snug flex-1">
                      —
                    </p>
                  )}

                  {/* CTA */}
                  <div className="mt-6 pt-4 border-t border-sand-50/10">
                    {p.url ? (
                      <span className="eyebrow text-gold-300 group-hover:text-gold-200 transition-colors">
                        Leer artículo →
                      </span>
                    ) : (
                      <span className="eyebrow text-sand-50/20">Sin enlace</span>
                    )}
                  </div>
                </>
              );

              return p.url ? (
                <a
                  key={p.name}
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group bg-sea-900 hover:bg-sea-800 p-6 flex flex-col transition-colors duration-200"
                >
                  {Inner}
                </a>
              ) : (
                <div key={p.name} className="bg-sea-900 p-6 flex flex-col">
                  {Inner}
                </div>
              );
            })}
          </div>
        ) : (
          /* Franja de nombres — sin datos ricos */
          <div className="flex flex-wrap items-baseline divide-x divide-sand-50/15">
            {items.map((p) =>
              p.url ? (
                <a
                  key={p.name}
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 first:pl-0 font-display text-xl md:text-2xl text-sand-50/50 hover:text-sand-50 italic font-light transition-colors py-1"
                >
                  {p.name}
                </a>
              ) : (
                <span
                  key={p.name}
                  className="px-6 first:pl-0 font-display text-xl md:text-2xl text-sand-50/50 italic font-light py-1"
                >
                  {p.name}
                </span>
              )
            )}
          </div>
        )}
      </div>
    </section>
  );
}
