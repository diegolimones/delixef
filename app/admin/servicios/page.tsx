'use client';

import { useAdminAuth } from '@/lib/hooks';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

interface Servicio {
  id: string;
  num: string;
  name: string;
  subtitle: string;
  short_description: string;
  description: string;
  details: string[];
  precio: string;
  image: string;
  available: boolean;
}

const emptyForm = {
  num: '',
  name: '',
  subtitle: '',
  short_description: '',
  description: '',
  details: '',
  precio: '',
  image: '',
};

export default function AdminServicios() {
  const { isAuthenticated, isLoading } = useAdminAuth();
  const [servicios, setServicios] = useState<Servicio[]>([]);
  const [formData, setFormData] = useState(emptyForm);
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [isEditing, setIsEditing] = useState<string | null>(null);

  useEffect(() => {
    if (isAuthenticated) fetchServicios();
  }, [isAuthenticated]);

  const fetchServicios = async () => {
    setIsLoadingData(true);
    try {
      const { data } = await supabase
        .from('servicios')
        .select('*')
        .order('num', { ascending: true });
      setServicios(data || []);
    } catch (err) {
      console.error('Error fetching servicios:', err);
    } finally {
      setIsLoadingData(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError('');

    if (!formData.name) {
      setSubmitError('El nombre del servicio es requerido');
      return;
    }

    const payload = {
      num: formData.num,
      name: formData.name,
      subtitle: formData.subtitle,
      short_description: formData.short_description,
      description: formData.description,
      details: formData.details
        .split('\n')
        .map((d) => d.trim())
        .filter(Boolean),
      precio: formData.precio,
      image: formData.image,
      available: true,
    };

    try {
      if (isEditing) {
        const { error } = await supabase
          .from('servicios')
          .update(payload)
          .eq('id', isEditing);
        if (error) throw error;
        setServicios(servicios.map((s) => (s.id === isEditing ? { ...s, ...payload } : s)));
      } else {
        const { data, error } = await supabase
          .from('servicios')
          .insert([payload])
          .select()
          .single();
        if (error) throw error;
        if (data) setServicios([...servicios, data]);
      }
      resetForm();
    } catch (err: any) {
      setSubmitError(err?.message || 'Error al guardar el servicio');
    }
  };

  const resetForm = () => {
    setFormData(emptyForm);
    setIsEditing(null);
  };

  const handleEdit = (s: Servicio) => {
    setFormData({
      num: s.num,
      name: s.name,
      subtitle: s.subtitle,
      short_description: s.short_description,
      description: s.description,
      details: (s.details || []).join('\n'),
      precio: s.precio,
      image: s.image,
    });
    setIsEditing(s.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id: string) => {
    if (!confirm('¿Eliminar este servicio?')) return;
    try {
      await supabase.from('servicios').delete().eq('id', id);
      setServicios(servicios.filter((s) => s.id !== id));
    } catch (err) {
      console.error('Error deleting servicio:', err);
    }
  };

  const handleToggleAvailable = async (id: string, available: boolean) => {
    try {
      await supabase.from('servicios').update({ available: !available }).eq('id', id);
      setServicios(servicios.map((s) => (s.id === id ? { ...s, available: !available } : s)));
    } catch (err) {
      console.error('Error toggling servicio:', err);
    }
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

  return (
    <div className="min-h-screen bg-sand-50">
      <div className="max-w-6xl mx-auto px-6 md:px-12 py-12 md:py-16">

        {/* Header */}
        <div className="mb-12 pb-6 border-b border-sea-200/60">
          <span className="eyebrow text-coral-600">— N°05 · Servicios</span>
          <h1 className="font-display font-light text-display-md text-ink leading-tight mt-3">
            Gestión de <span className="italic text-sea-600">servicios</span>.
          </h1>
          <p className="mt-3 text-ink-mute font-light">
            Crea y edita los servicios que aparecen en la web pública
          </p>
        </div>

        {/* Formulario */}
        <div className="mb-16">
          <span className="eyebrow text-coral-600 block mb-4">
            — {isEditing ? 'Editar' : 'Añadir'}
          </span>
          <h2 className="font-display text-2xl md:text-3xl font-light text-ink mb-8">
            {isEditing ? 'Editar servicio' : 'Nuevo servicio'}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-8 max-w-3xl">
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
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Ej: Chefs privados"
                  className={inputClass}
                />
              </div>

              <div>
                <label className="eyebrow text-ink-mute block mb-2">Subtítulo</label>
                <input
                  type="text"
                  name="subtitle"
                  value={formData.subtitle}
                  onChange={handleInputChange}
                  placeholder="Ej: En tu villa, sin reloj"
                  className={inputClass}
                />
              </div>

              <div>
                <label className="eyebrow text-ink-mute block mb-2">Número (01, 02…)</label>
                <input
                  type="text"
                  name="num"
                  value={formData.num}
                  onChange={handleInputChange}
                  placeholder="01"
                  className={inputClass}
                />
              </div>

              <div>
                <label className="eyebrow text-ink-mute block mb-2">Precio</label>
                <input
                  type="text"
                  name="precio"
                  value={formData.precio}
                  onChange={handleInputChange}
                  placeholder="Desde 80€ · o Consulta"
                  className={inputClass}
                />
              </div>
            </div>

            <div>
              <label className="eyebrow text-ink-mute block mb-2">Descripción breve</label>
              <input
                type="text"
                name="short_description"
                value={formData.short_description}
                onChange={handleInputChange}
                placeholder="Una línea que resume el servicio"
                className={inputClass}
              />
            </div>

            <div>
              <label className="eyebrow text-ink-mute block mb-2">Descripción completa</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Texto largo para la página de servicios…"
                rows={3}
                className={inputClass}
              />
            </div>

            <div>
              <label className="eyebrow text-ink-mute block mb-2">
                Detalles del servicio{' '}
                <span className="normal-case tracking-normal font-light text-ink-mute">
                  (uno por línea)
                </span>
              </label>
              <textarea
                name="details"
                value={formData.details}
                onChange={handleInputChange}
                placeholder={"Menú degustación de cuatro o seis pases\nMaridaje opcional con vinos seleccionados\n…"}
                rows={4}
                className={inputClass}
              />
            </div>

            <div>
              <label className="eyebrow text-ink-mute block mb-2">URL de imagen</label>
              <input
                type="url"
                name="image"
                value={formData.image}
                onChange={handleInputChange}
                placeholder="https://images.unsplash.com/…"
                className={inputClass}
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                type="submit"
                className="inline-flex items-center justify-center bg-ink text-sand-50 px-8 py-4 rounded-full text-xs font-semibold tracking-[0.22em] uppercase hover:bg-coral-600 transition-colors"
              >
                {isEditing ? 'Actualizar servicio' : 'Crear servicio'}
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
          <span className="eyebrow text-coral-600 block mb-4">— Catálogo</span>
          <h2 className="font-display text-2xl md:text-3xl font-light text-ink mb-8">
            Servicios ({servicios.length})
          </h2>

          {isLoadingData ? (
            <div className="py-20 text-center text-ink-mute font-light">Cargando…</div>
          ) : servicios.length > 0 ? (
            <ul className="divide-y divide-sea-200/60 border-t border-b border-sea-200/60">
              {servicios.map((s) => (
                <li
                  key={s.id}
                  className="grid grid-cols-12 gap-4 py-6 items-baseline hover:bg-sand-100 transition-colors -mx-6 px-6"
                >
                  <div className="col-span-1">
                    <span className="font-display text-sm text-sea-400 font-light tabular-nums">
                      {s.num}
                    </span>
                  </div>

                  <div className="col-span-11 md:col-span-5">
                    <h3 className="font-display text-xl text-ink font-light">{s.name}</h3>
                    {s.subtitle && (
                      <p className="eyebrow text-ink-mute mt-1">{s.subtitle}</p>
                    )}
                    {s.short_description && (
                      <p className="text-sm text-ink-soft font-light mt-2 line-clamp-2">
                        {s.short_description}
                      </p>
                    )}
                  </div>

                  <div className="col-span-6 md:col-span-2">
                    <span className="font-display text-lg text-ink font-light">{s.precio}</span>
                  </div>

                  <div className="col-span-6 md:col-span-4 flex flex-col sm:flex-row gap-3 sm:items-baseline sm:justify-end text-xs font-semibold tracking-[0.18em] uppercase">
                    <button
                      onClick={() => handleToggleAvailable(s.id, s.available)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[0.65rem] font-semibold tracking-[0.18em] uppercase transition-colors ${
                        s.available
                          ? 'bg-sea-100 text-sea-800 hover:bg-coral-50 hover:text-coral-700'
                          : 'bg-ink/[0.06] text-ink-mute hover:bg-ink/10 hover:text-ink'
                      }`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${s.available ? 'bg-sea-600' : 'bg-ink-mute'}`} />
                      {s.available ? 'Activo' : 'Inactivo'}
                    </button>
                    <button
                      onClick={() => handleEdit(s)}
                      className="text-ink hover:text-coral-600 transition-colors"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(s.id)}
                      className="text-coral-600 hover:text-coral-700 transition-colors"
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
                Aún no hay servicios.
              </p>
              <p className="mt-3 text-ink-mute font-light max-w-md mx-auto">
                Usa el formulario de arriba para añadir tu primer servicio. Necesitarás
                crear la tabla <code className="font-mono text-sm">servicios</code> en Supabase.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
