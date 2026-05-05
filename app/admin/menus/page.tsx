'use client';

import { useAdminAuth } from '@/lib/hooks';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

interface Menu {
  id: string;
  name: string;
  description: string | null;
  category: 'desayuno' | 'comida' | 'cena' | 'evento';
  price: number | null;
  ingredients: string | null;
  dietary_restrictions: string | null;
  available: boolean;
}

const categoryLabels: Record<string, string> = {
  desayuno: 'Desayuno',
  comida: 'Comida',
  cena: 'Cena',
  evento: 'Evento',
};

export default function AdminMenus() {
  const { isAuthenticated, isLoading } = useAdminAuth();
  const [menus, setMenus] = useState<Menu[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: 'comida' as 'desayuno' | 'comida' | 'cena' | 'evento',
    price: '',
    ingredients: '',
    dietary_restrictions: '',
  });
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [isEditing, setIsEditing] = useState<string | null>(null);

  useEffect(() => {
    if (isAuthenticated) {
      fetchMenus();
    }
  }, [isAuthenticated]);

  const fetchMenus = async () => {
    setIsLoadingData(true);
    try {
      const { data } = await supabase
        .from('menus')
        .select('*')
        .order('category', { ascending: true });

      setMenus(data || []);
    } catch (error) {
      console.error('Error fetching menus:', error);
    } finally {
      setIsLoadingData(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError('');

    if (!formData.name) {
      setSubmitError('El nombre del menú es requerido');
      return;
    }

    try {
      const menuData = {
        name: formData.name,
        description: formData.description || null,
        category: formData.category,
        price: formData.price ? parseFloat(formData.price) : null,
        ingredients: formData.ingredients || null,
        dietary_restrictions: formData.dietary_restrictions || null,
        available: true,
      };

      if (isEditing) {
        await supabase.from('menus').update(menuData).eq('id', isEditing);
        setMenus(menus.map((m) => (m.id === isEditing ? { ...m, ...menuData } : m)));
      } else {
        const { data } = await supabase.from('menus').insert([menuData]).select().single();
        if (data) {
          setMenus([...menus, data]);
        }
      }

      resetForm();
    } catch (error) {
      setSubmitError('Error al guardar el menú');
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      category: 'comida',
      price: '',
      ingredients: '',
      dietary_restrictions: '',
    });
    setIsEditing(null);
  };

  const handleEdit = (menu: Menu) => {
    setFormData({
      name: menu.name,
      description: menu.description || '',
      category: menu.category,
      price: menu.price?.toString() || '',
      ingredients: menu.ingredients || '',
      dietary_restrictions: menu.dietary_restrictions || '',
    });
    setIsEditing(menu.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id: string) => {
    if (!confirm('¿Eliminar este menú?')) return;
    try {
      await supabase.from('menus').delete().eq('id', id);
      setMenus(menus.filter((m) => m.id !== id));
    } catch (error) {
      console.error('Error deleting menu:', error);
    }
  };

  const handleToggleAvailable = async (id: string, available: boolean) => {
    try {
      await supabase.from('menus').update({ available: !available }).eq('id', id);
      setMenus(menus.map((m) => (m.id === id ? { ...m, available: !available } : m)));
    } catch (error) {
      console.error('Error updating menu:', error);
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

  const categories = [
    { id: 'desayuno', label: 'Desayuno' },
    { id: 'comida', label: 'Comida' },
    { id: 'cena', label: 'Cena' },
    { id: 'evento', label: 'Evento' },
  ];

  const inputClass =
    'w-full px-0 py-3 border-0 border-b border-sea-200 bg-transparent text-ink placeholder:text-ink-mute focus:outline-none focus:border-ink transition-colors font-light';

  return (
    <div className="min-h-screen bg-sand-50">
      <div className="max-w-6xl mx-auto px-6 md:px-12 py-12 md:py-16">
        {/* Header */}
        <div className="mb-12 pb-6 border-b border-sea-200/60">
          <span className="eyebrow text-coral-600">— N°04 · Menús</span>
          <h1 className="font-display font-light text-display-md text-ink leading-tight mt-3">
            Gestión de <span className="italic text-sea-600">menús</span>.
          </h1>
          <p className="mt-3 text-ink-mute font-light">
            Crea y administra el catálogo de platos
          </p>
        </div>

        {/* Form */}
        <div className="mb-16">
          <span className="eyebrow text-coral-600 block mb-4">
            — {isEditing ? 'Editar' : 'Añadir'}
          </span>
          <h2 className="font-display text-2xl md:text-3xl font-light text-ink mb-8">
            {isEditing ? 'Editar menú' : 'Nuevo menú'}
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
                  Nombre del menú <span className="text-coral-600">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Ej: Arroz marinero"
                  className={inputClass}
                />
              </div>

              <div>
                <label className="eyebrow text-ink-mute block mb-2">Categoría</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className={inputClass}
                >
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="eyebrow text-ink-mute block mb-2">Precio (€)</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  placeholder="45.00"
                  step="0.01"
                  className={inputClass}
                />
              </div>
            </div>

            <div>
              <label className="eyebrow text-ink-mute block mb-2">Descripción</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Describe brevemente el plato..."
                rows={2}
                className={inputClass}
              />
            </div>

            <div>
              <label className="eyebrow text-ink-mute block mb-2">Ingredientes</label>
              <textarea
                name="ingredients"
                value={formData.ingredients}
                onChange={handleInputChange}
                placeholder="Arroz bomba, sepia, gambas, almejas..."
                rows={2}
                className={inputClass}
              />
            </div>

            <div>
              <label className="eyebrow text-ink-mute block mb-2">
                Restricciones dietéticas
              </label>
              <textarea
                name="dietary_restrictions"
                value={formData.dietary_restrictions}
                onChange={handleInputChange}
                placeholder="Sin gluten, opción vegetariana, etc."
                rows={2}
                className={inputClass}
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                type="submit"
                className="inline-flex items-center justify-center bg-ink text-sand-50 px-8 py-4 text-xs font-semibold tracking-[0.22em] uppercase hover:bg-coral-600 transition-colors"
              >
                {isEditing ? 'Actualizar menú' : 'Crear menú'}
              </button>
              {isEditing && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="inline-flex items-center justify-center px-6 py-4 text-xs font-semibold tracking-[0.22em] uppercase text-ink hover:text-coral-600 transition-colors border border-ink"
                >
                  Cancelar
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Listing */}
        <div>
          <span className="eyebrow text-coral-600 block mb-4">— Catálogo</span>
          <h2 className="font-display text-2xl md:text-3xl font-light text-ink mb-8">
            Menús ({menus.length})
          </h2>

          {isLoadingData ? (
            <div className="py-20 text-center text-ink-mute font-light">Cargando…</div>
          ) : menus.length > 0 ? (
            <ul className="divide-y divide-sea-200/60 border-t border-b border-sea-200/60">
              {menus.map((menu) => (
                <li
                  key={menu.id}
                  className="grid grid-cols-12 gap-4 py-6 items-baseline hover:bg-sand-100 transition-colors -mx-6 px-6"
                >
                  <div className="col-span-12 md:col-span-2">
                    <span className="eyebrow text-coral-600">
                      {categoryLabels[menu.category]}
                    </span>
                  </div>

                  <div className="col-span-12 md:col-span-5">
                    <h3 className="font-display text-xl text-ink font-light">{menu.name}</h3>
                    {menu.description && (
                      <p className="text-sm text-ink-soft font-light mt-2">
                        {menu.description}
                      </p>
                    )}
                    {menu.ingredients && (
                      <p className="text-xs text-ink-mute italic font-light mt-2">
                        {menu.ingredients}
                      </p>
                    )}
                  </div>

                  <div className="col-span-6 md:col-span-2">
                    {menu.price && (
                      <span className="font-display text-2xl text-ink font-light tabular-nums">
                        {menu.price.toFixed(0)}€
                      </span>
                    )}
                  </div>

                  <div className="col-span-6 md:col-span-3 flex flex-col sm:flex-row gap-3 sm:items-baseline sm:justify-end text-xs font-semibold tracking-[0.18em] uppercase">
                    <button
                      onClick={() => handleToggleAvailable(menu.id, menu.available)}
                      className={`inline-flex items-center gap-2 transition-colors ${
                        menu.available
                          ? 'text-sea-800 hover:text-coral-600'
                          : 'text-ink-mute hover:text-ink'
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          menu.available ? 'bg-sea-800' : 'bg-ink-mute'
                        }`}
                      ></span>
                      {menu.available ? 'On' : 'Off'}
                    </button>
                    <button
                      onClick={() => handleEdit(menu)}
                      className="text-ink hover:text-coral-600 transition-colors"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(menu.id)}
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
                Aún no has creado menús.
              </p>
              <p className="mt-3 text-ink-mute font-light max-w-md mx-auto">
                Usa el formulario de arriba para añadir tu primer menú al catálogo.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
