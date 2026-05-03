'use client';

import { useAdminAuth } from '@/lib/hooks';
import Container from '@/components/Container';
import Card from '@/components/Card';
import Button from '@/components/Button';
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
    setFormData({
      ...formData,
      [name]: value,
    });
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
        const { data } = await supabase
          .from('menus')
          .insert([menuData])
          .select()
          .single();

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
  };

  const handleDelete = async (id: string) => {
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
    return <div className="flex items-center justify-center min-h-screen">Cargando...</div>;
  }

  if (!isAuthenticated) {
    return null;
  }

  const categories = [
    { id: 'desayuno', label: 'Desayuno' },
    { id: 'comida', label: 'Comida' },
    { id: 'cena', label: 'Cena' },
    { id: 'evento', label: 'Evento' },
  ];

  return (
    <div className="p-4 md:p-8">
      <Container>
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-playfair text-4xl font-bold mb-2">Gestión de Menús</h1>
          <p className="text-gray-600">Crea y gestiona los menús disponibles</p>
        </div>

        {/* Formulario */}
        <Card className="mb-8">
          <h2 className="text-2xl font-semibold mb-6">
            {isEditing ? 'Editar Menú' : 'Crear Nuevo Menú'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {submitError && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-800 text-sm">
                {submitError}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Nombre del Menú *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Ej: Desayuno Continental"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gold"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Categoría
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gold"
                >
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Precio (€)
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  placeholder="45.00"
                  step="0.01"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gold"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Descripción
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Describe el menú..."
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gold"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Ingredientes
              </label>
              <textarea
                name="ingredients"
                value={formData.ingredients}
                onChange={handleInputChange}
                placeholder="Lista de ingredientes..."
                rows={2}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gold"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Restricciones Dietéticas
              </label>
              <textarea
                name="dietary_restrictions"
                value={formData.dietary_restrictions}
                onChange={handleInputChange}
                placeholder="Ej: Sin gluten, Vegetariano, etc."
                rows={2}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gold"
              />
            </div>

            <div className="flex gap-3">
              <Button type="submit" variant="primary" size="md">
                {isEditing ? 'Actualizar Menú' : 'Crear Menú'}
              </Button>
              {isEditing && (
                <Button
                  type="button"
                  variant="outline"
                  size="md"
                  onClick={resetForm}
                >
                  Cancelar
                </Button>
              )}
            </div>
          </form>
        </Card>

        {/* Lista de Menús */}
        {isLoadingData ? (
          <div className="text-center py-8">Cargando...</div>
        ) : menus.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {menus.map((menu) => (
              <Card key={menu.id} className="flex flex-col">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-semibold text-lg text-gray-900">{menu.name}</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      {categories.find((c) => c.id === menu.category)?.label}
                    </p>
                  </div>
                  {menu.price && (
                    <span className="text-lg font-bold text-gold">€{menu.price.toFixed(2)}</span>
                  )}
                </div>

                {menu.description && (
                  <p className="text-gray-600 text-sm mb-3">{menu.description}</p>
                )}

                {menu.ingredients && (
                  <div className="mb-3 pb-3 border-b border-gray-200">
                    <p className="text-xs text-gray-600 font-semibold">Ingredientes</p>
                    <p className="text-sm text-gray-700">{menu.ingredients}</p>
                  </div>
                )}

                <div className="flex gap-2 mt-auto pt-4">
                  <button
                    onClick={() => handleToggleAvailable(menu.id, menu.available)}
                    className={`px-3 py-1 rounded text-xs font-semibold ${
                      menu.available
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {menu.available ? 'Disponible' : 'No disponible'}
                  </button>
                  <button
                    onClick={() => handleEdit(menu)}
                    className="px-3 py-1 bg-blue-100 text-blue-800 rounded text-xs font-semibold hover:bg-blue-200"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(menu.id)}
                    className="px-3 py-1 bg-red-100 text-red-800 rounded text-xs font-semibold hover:bg-red-200"
                  >
                    Eliminar
                  </button>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="text-center py-12">
            <p className="text-gray-600 text-lg">No hay menús creados</p>
          </Card>
        )}
      </Container>
    </div>
  );
}
