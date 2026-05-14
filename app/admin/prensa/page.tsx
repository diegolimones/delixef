'use client';

import { useAdminAuth } from '@/lib/hooks';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

interface Prensa {
  id: string;
  name: string;
  url: string | null;
  logo_url: string | null;
  descripcion: string | null;
  orden: number;
  visible: boolean;
}

const emptyForm = { name: '', url: '', logo_url: '', descripcion: '', orden: 0 };

export default function AdminPrensa() {
  const { isAuthenticated, isLoading } = useAdminAuth();
  const [items, setItems] = useState<Prensa[]>([]);
  const [formData, setFormData] = useState(emptyForm);
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [isEditing, setIsEditing] = useState<string | null>(null);

  useEffect(() => {
    if (isAuthenticated) fetchItems();
  }, [isAuthenticated]);

  const fetchItems = async () => {
    setIsLoadingData(true);
    const { data } = await supabase
      .from('prensa')
      .select('*')
      .order('orden', { ascending: true });
    setItems(data || []);
    setIsLoadingData(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError('');
    if (!formData.name) { setSubmitError('El nombre de la publicación es obligatorio'); return; }
    const payload = {
      name: formData.name,
      url: formData.url || null,
      logo_url: formData.logo_url || null,
      descripcion: formData.descripcion || null,
      orden: formData.orden || items.length + 1,
      visible: true,
    };
    if (isEditing) {
      const { error } = await supabase.from('prensa').update(payload).eq('id', isEditing);
      if (error) { setSubmitError(error.message); return; }
      setItems(items.map((p) => (p.id === isEditing ? { ...p, ...payload } : p)));
    } else {
      const { data, error } = await supabase.from('prensa').insert([payload]).select().single();
      if (error) { setSubmitError(error.message); return; }
      if (data) setItems([...items, data].sort((a, b) => a.orden - b.orden));
    }
    resetForm();
  };

  const resetForm = () => { setFormData(emptyForm); setIsEditing(null); setSubmitError(''); };

  const handleEdit = (p: Prensa) => {
    setFormData({
      name: p.name,
      url: p.url || '',
      logo_url: p.logo_url || '',
      descripcion: p.descripcion || '',
      orden: p.orden,
    });
    setIsEditing(p.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id: string) => {
    if (!confirm('¿Eliminar esta mención?')) return;
    await supabase.from('prensa').delete().eq('id', id);
    setItems(items.filter((p) => p.id !== id));
  };

  const handleToggleVisible = async (id: string, visible: boolean) => {
    await supabase.from('prensa').update({ visible: !visible }).eq('id', id);
    setItems(items.map((p) => (p.id === id ? { ...p, visible: !visible } : p)));
  };

  const moveOrder = async (id: string, direction: 'up' | 'down') => {
    const idx = items.findIndex((p) => p.id === id);
    const swapIdx = direction === 'up' ? idx - 1 : idx + 1;
    if (swapIdx < 0 || swapIdx >= items.length) return;

    const a = items[idx];
    const b = items[swapIdx];
    await supabase.from('prensa').update({ orden: b.orden }).eq('id', a.id);
    await supabase.from('prensa').update({ orden: a.orden }).eq('id', b.id);

    const updated = [...items];
    updated[idx] = { ...a, orden: b.orden };
    updated[swapIdx] = { ...b, orden: a.orden };
    setItems(updated.sort((x, y) => x.orden - y.orden));
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

  const visible = items.filter((p) => p.visible).length;

  return (
    <div className="min-h-screen bg-sand-50">
      <div className="max-w-6xl mx-auto px-6 md:px-12 py-12 md:py-16">

        {/* Header */}
        <div className="mb-12 pb-6 border-b border-sea-200/60">
          <span className="eyebrow text-coral-600">— N°08 · Prensa</span>
          <h1 className="font-display font-light text-display-md text-ink leading-tight mt-3">
            Menciones en <span className="italic text-sea-600">prensa</span>.
          </h1>
          <p className="mt-3 text-ink-mute font-light">
            {items.length} publicación{items.length !== 1 ? 'es' : ''} · {visible} visible{visible !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Formulario */}
        <div className="mb-16">
          <span className="eyebrow text-coral-600 block mb-4">— {isEditing ? 'Editar' : 'Añadir'}</span>
          <h2 className="font-display text-2xl md:text-3xl font-light text-ink mb-8">
            {isEditing ? 'Editar mención' : 'Nueva mención de prensa'}
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
                  Publicación <span className="text-coral-600">*</span>
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Conde Nast Traveller"
                  className={inputClass}
                />
              </div>
              <div>
                <label className="eyebrow text-ink-mute block mb-2">Orden</label>
                <input
                  type="number"
                  min="1"
                  value={formData.orden || ''}
                  onChange={(e) => setFormData({ ...formData, orden: parseInt(e.target.value) || 0 })}
                  placeholder={String(items.length + 1)}
                  className={inputClass}
                />
              </div>
            </div>

            <div>
              <label className="eyebrow text-ink-mute block mb-2">URL del artículo</label>
              <input
                type="url"
                value={formData.url}
                onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                placeholder="https://www.condenasttraveller.com/…"
                className={inputClass}
              />
            </div>

            <div>
              <label className="eyebrow text-ink-mute block mb-2">URL del logo</label>
              <input
                type="url"
                value={formData.logo_url}
                onChange={(e) => setFormData({ ...formData, logo_url: e.target.value })}
                placeholder="https://… (desde el gestor de imágenes)"
                className={inputClass}
              />
            </div>

            <div>
              <label className="eyebrow text-ink-mute block mb-2">Descripción / titular</label>
              <input
                type="text"
                value={formData.descripcion}
                onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                placeholder="«El mejor chef privado de Ibiza» — Verano 2024"
                className={inputClass}
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                type="submit"
                className="inline-flex items-center justify-center bg-ink text-sand-50 px-8 py-4 rounded-full text-xs font-semibold tracking-[0.22em] uppercase hover:bg-coral-600 transition-colors"
              >
                {isEditing ? 'Actualizar' : 'Añadir publicación'}
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

        {/* Vista previa del bloque web */}
        {items.filter((p) => p.visible).length > 0 && (
          <div className="mb-16 p-8 bg-warm-200 rounded-xl">
            <p className="eyebrow text-ink-mute mb-5 text-center">Vista previa — bloque "Mencionados en"</p>
            <div className="flex flex-wrap justify-center gap-6">
              {items
                .filter((p) => p.visible)
                .map((p) => (
                  <span key={p.id} className="text-ink-mute/70 text-sm font-light tracking-wide">
                    {p.name}
                  </span>
                ))}
            </div>
          </div>
        )}

        {/* Listado */}
        <div>
          <span className="eyebrow text-coral-600 block mb-4">— Listado</span>
          <h2 className="font-display text-2xl md:text-3xl font-light text-ink mb-8">
            Publicaciones ({items.length})
          </h2>

          {isLoadingData ? (
            <div className="py-20 text-center text-ink-mute font-light">Cargando…</div>
          ) : items.length > 0 ? (
            <ul className="divide-y divide-sea-200/60 border-t border-sea-200/60">
              {items.map((p, idx) => (
                <li
                  key={p.id}
                  className="grid grid-cols-12 gap-4 py-6 items-center hover:bg-sand-100 transition-colors -mx-6 px-6"
                >
                  {/* Orden */}
                  <div className="col-span-1 flex flex-col gap-1 items-center">
                    <button
                      onClick={() => moveOrder(p.id, 'up')}
                      disabled={idx === 0}
                      className="text-ink-mute/40 hover:text-ink disabled:opacity-20 text-xs leading-none"
                    >
                      ▲
                    </button>
                    <span className="font-display text-sm text-sea-400 tabular-nums">{p.orden}</span>
                    <button
                      onClick={() => moveOrder(p.id, 'down')}
                      disabled={idx === items.length - 1}
                      className="text-ink-mute/40 hover:text-ink disabled:opacity-20 text-xs leading-none"
                    >
                      ▼
                    </button>
                  </div>

                  {/* Nombre + descripción */}
                  <div className="col-span-11 md:col-span-5">
                    <p className="font-display text-xl text-ink font-light">
                      {p.url ? (
                        <a
                          href={p.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-amber-600 transition-colors"
                        >
                          {p.name} ↗
                        </a>
                      ) : (
                        p.name
                      )}
                    </p>
                    {p.descripcion && (
                      <p className="text-sm text-ink-soft font-light italic mt-1">{p.descripcion}</p>
                    )}
                  </div>

                  {/* Logo URL */}
                  <div className="hidden md:block col-span-3">
                    {p.logo_url ? (
                      <span className="eyebrow text-sea-700 truncate block">Logo ✓</span>
                    ) : (
                      <span className="eyebrow text-ink-mute/40">Sin logo</span>
                    )}
                  </div>

                  {/* Acciones */}
                  <div className="col-span-12 md:col-span-3 flex flex-wrap gap-2 md:justify-end">
                    <button
                      onClick={() => handleToggleVisible(p.id, p.visible)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[0.65rem] font-semibold tracking-[0.18em] uppercase transition-colors ${
                        p.visible
                          ? 'bg-sea-100 text-sea-800 hover:bg-coral-50 hover:text-coral-700'
                          : 'bg-ink/[0.06] text-ink-mute hover:bg-ink/10 hover:text-ink'
                      }`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${p.visible ? 'bg-sea-600' : 'bg-ink-mute'}`} />
                      {p.visible ? 'Visible' : 'Oculto'}
                    </button>
                    <button
                      onClick={() => handleEdit(p)}
                      className="inline-flex items-center px-3 py-1 rounded-full text-[0.65rem] font-semibold tracking-[0.18em] uppercase text-ink hover:text-amber-600 transition-colors border border-sea-200"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(p.id)}
                      className="inline-flex items-center px-3 py-1 rounded-full text-[0.65rem] font-semibold tracking-[0.18em] uppercase text-coral-600 hover:text-coral-700 transition-colors border border-coral-200"
                    >
                      Eliminar
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="border-y border-sea-200/60 py-20 text-center">
              <p className="font-display text-2xl text-ink-soft font-light">
                Aún no hay menciones de prensa.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
