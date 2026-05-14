'use client';

import { useAdminAuth } from '@/lib/hooks';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

interface Testimonio {
  id: string;
  name: string;
  context: string;
  text: string;
  stars: number;
  visible: boolean;
  created_at: string;
}

const emptyForm = { name: '', context: '', text: '', stars: 5 };

const StarPicker = ({ value, onChange }: { value: number; onChange: (n: number) => void }) => (
  <div className="flex gap-1">
    {[1, 2, 3, 4, 5].map((n) => (
      <button
        key={n}
        type="button"
        onClick={() => onChange(n)}
        className={`text-xl transition-colors ${n <= value ? 'text-amber-400' : 'text-ink-mute/30 hover:text-amber-300'}`}
      >
        ★
      </button>
    ))}
  </div>
);

export default function AdminTestimonios() {
  const { isAuthenticated, isLoading } = useAdminAuth();
  const [items, setItems] = useState<Testimonio[]>([]);
  const [formData, setFormData] = useState(emptyForm);
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    if (isAuthenticated) fetchItems();
  }, [isAuthenticated]);

  const fetchItems = async () => {
    setIsLoadingData(true);
    const { data } = await supabase
      .from('testimonios')
      .select('*')
      .order('created_at', { ascending: false });
    setItems(data || []);
    setIsLoadingData(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError('');
    if (!formData.name || !formData.text) {
      setSubmitError('Nombre y testimonio son obligatorios');
      return;
    }
    const payload = { ...formData, visible: true };
    if (isEditing) {
      const { error } = await supabase.from('testimonios').update(payload).eq('id', isEditing);
      if (error) { setSubmitError(error.message); return; }
      setItems(items.map((t) => (t.id === isEditing ? { ...t, ...payload } : t)));
    } else {
      const { data, error } = await supabase.from('testimonios').insert([payload]).select().single();
      if (error) { setSubmitError(error.message); return; }
      if (data) setItems([data, ...items]);
    }
    resetForm();
  };

  const resetForm = () => { setFormData(emptyForm); setIsEditing(null); setSubmitError(''); };

  const handleEdit = (t: Testimonio) => {
    setFormData({ name: t.name, context: t.context, text: t.text, stars: t.stars });
    setIsEditing(t.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id: string) => {
    if (!confirm('¿Eliminar este testimonio?')) return;
    await supabase.from('testimonios').delete().eq('id', id);
    setItems(items.filter((t) => t.id !== id));
  };

  const handleToggleVisible = async (id: string, visible: boolean) => {
    await supabase.from('testimonios').update({ visible: !visible }).eq('id', id);
    setItems(items.map((t) => (t.id === id ? { ...t, visible: !visible } : t)));
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-sand-50">
        <div className="font-display text-xl text-ink-mute font-light">Cargando…</div>
      </div>
    );
  }
  if (!isAuthenticated) return null;

  const inputClass =
    'w-full px-0 py-3 border-0 border-b border-sea-200 bg-transparent text-ink placeholder:text-ink-mute focus:outline-none focus:border-ink transition-colors font-light';

  const visible = items.filter((t) => t.visible).length;

  return (
    <div className="min-h-screen bg-sand-50">
      <div className="max-w-6xl mx-auto px-6 md:px-12 py-12 md:py-16">

        {/* Header */}
        <div className="mb-12 pb-6 border-b border-sea-200/60">
          <span className="eyebrow text-coral-600">— N°07 · Testimonios</span>
          <h1 className="font-display font-light text-display-md text-ink leading-tight mt-3">
            Opiniones de <span className="italic text-sea-600">clientes</span>.
          </h1>
          <p className="mt-3 text-ink-mute font-light">
            {items.length} testimonio{items.length !== 1 ? 's' : ''} · {visible} visible{visible !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Formulario */}
        <div className="mb-16">
          <span className="eyebrow text-coral-600 block mb-4">— {isEditing ? 'Editar' : 'Añadir'}</span>
          <h2 className="font-display text-2xl md:text-3xl font-light text-ink mb-8">
            {isEditing ? 'Editar testimonio' : 'Nuevo testimonio'}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-8 max-w-2xl">
            {submitError && (
              <div className="border border-coral-500/50 bg-coral-500/10 px-4 py-3">
                <p className="text-sm text-coral-600 font-light">{submitError}</p>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className="eyebrow text-ink-mute block mb-2">
                  Nombre <span className="text-coral-600">*</span>
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Sarah & Tom"
                  className={inputClass}
                />
              </div>
              <div>
                <label className="eyebrow text-ink-mute block mb-2">Contexto</label>
                <input
                  type="text"
                  value={formData.context}
                  onChange={(e) => setFormData({ ...formData, context: e.target.value })}
                  placeholder="Boda en Villa, Ibiza 2024"
                  className={inputClass}
                />
              </div>
            </div>

            <div>
              <label className="eyebrow text-ink-mute block mb-2">
                Testimonio <span className="text-coral-600">*</span>
              </label>
              <textarea
                value={formData.text}
                onChange={(e) => setFormData({ ...formData, text: e.target.value })}
                placeholder="Contratar a Delixef fue lo mejor que hicimos…"
                rows={3}
                className={inputClass}
              />
            </div>

            <div>
              <label className="eyebrow text-ink-mute block mb-3">Valoración</label>
              <StarPicker value={formData.stars} onChange={(n) => setFormData({ ...formData, stars: n })} />
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                type="submit"
                className="inline-flex items-center justify-center bg-ink text-sand-50 px-8 py-4 rounded-full text-xs font-semibold tracking-[0.22em] uppercase hover:bg-coral-600 transition-colors"
              >
                {isEditing ? 'Actualizar' : 'Publicar testimonio'}
              </button>
              {isEditing && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="inline-flex items-center justify-center px-6 py-4 rounded-full text-xs font-semibold tracking-[0.22em] uppercase text-ink hover:text-coral-600 transition-colors border border-ink"
                >
                  Cancelar
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Listado */}
        <div>
          <span className="eyebrow text-coral-600 block mb-4">— Listado</span>
          <h2 className="font-display text-2xl md:text-3xl font-light text-ink mb-8">
            Todos los testimonios ({items.length})
          </h2>

          {isLoadingData ? (
            <div className="py-20 text-center text-ink-mute font-light">Cargando…</div>
          ) : items.length > 0 ? (
            <ul className="divide-y divide-sea-200/60 border-t border-sea-200/60">
              {items.map((t) => {
                const isExpanded = expandedId === t.id;
                return (
                  <li key={t.id}>
                    <button
                      onClick={() => setExpandedId(isExpanded ? null : t.id)}
                      className="w-full grid grid-cols-12 gap-4 py-6 items-baseline text-left hover:bg-sand-100 transition-colors -mx-6 px-6"
                    >
                      <div className="col-span-12 md:col-span-4">
                        <p className="font-display text-xl text-ink italic">{t.name}</p>
                        <p className="text-xs text-ink-mute font-light mt-1">{t.context}</p>
                      </div>
                      <div className="col-span-8 md:col-span-5 text-sm text-ink-soft font-light line-clamp-1 italic">
                        &ldquo;{t.text}&rdquo;
                      </div>
                      <div className="col-span-3 md:col-span-2 flex items-center gap-0.5">
                        {Array.from({ length: t.stars }).map((_, i) => (
                          <span key={i} className="text-amber-400 text-xs">★</span>
                        ))}
                      </div>
                      <div className="col-span-1 text-right text-ink-mute font-light">
                        {isExpanded ? '−' : '+'}
                      </div>
                    </button>

                    {isExpanded && (
                      <div className="bg-sand-100 border-t border-sea-200/60 px-6 py-8 -mx-6">
                        <p className="font-display text-lg text-ink font-light italic leading-relaxed mb-8">
                          &ldquo;{t.text}&rdquo;
                        </p>
                        <div className="flex flex-wrap gap-3 pt-6 border-t border-sea-200/60">
                          <button
                            onClick={() => handleToggleVisible(t.id, t.visible)}
                            className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold tracking-[0.18em] uppercase transition-colors ${
                              t.visible
                                ? 'bg-sea-100 text-sea-800 hover:bg-coral-50 hover:text-coral-700'
                                : 'bg-ink/[0.06] text-ink-mute hover:bg-ink/10 hover:text-ink'
                            }`}
                          >
                            <span className={`w-1.5 h-1.5 rounded-full ${t.visible ? 'bg-sea-600' : 'bg-ink-mute'}`} />
                            {t.visible ? 'Visible' : 'Oculto'}
                          </button>
                          <button
                            onClick={() => handleEdit(t)}
                            className="inline-flex items-center justify-center px-4 py-2 rounded-full text-xs font-semibold tracking-[0.18em] uppercase text-ink hover:text-amber-600 transition-colors border border-sea-200"
                          >
                            Editar
                          </button>
                          <button
                            onClick={() => handleDelete(t.id)}
                            className="inline-flex items-center justify-center px-4 py-2 rounded-full text-xs font-semibold tracking-[0.18em] uppercase text-coral-600 hover:text-coral-700 transition-colors border border-coral-200"
                          >
                            Eliminar
                          </button>
                        </div>
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          ) : (
            <div className="border-y border-sea-200/60 py-20 text-center">
              <p className="font-display text-2xl text-ink-soft font-light">
                Aún no hay testimonios.
              </p>
              <p className="mt-3 text-ink-mute font-light">
                Añade el primero con el formulario de arriba.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
