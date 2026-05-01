'use client';

import { useState, useEffect } from 'react';
import Container from '@/components/Container';
import Card from '@/components/Card';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import Button from '@/components/Button';

interface MenuItem {
  id: string;
  name: string;
  description?: string;
  category: 'desayuno' | 'comida' | 'cena' | 'evento';
  price?: number;
  ingredients?: string;
  dietary_restrictions?: string;
  available: boolean;
}

export default function Catalogo() {
  const [menus, setMenus] = useState<MenuItem[]>([]);
  const [filteredMenus, setFilteredMenus] = useState<MenuItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<'todas' | 'desayuno' | 'comida' | 'cena' | 'evento'>(
    'todas'
  );
  const [isLoading, setIsLoading] = useState(true);

  const categories = [
    { id: 'todas', label: 'Todos' },
    { id: 'desayuno', label: 'Desayunos' },
    { id: 'comida', label: 'Comidas' },
    { id: 'cena', label: 'Cenas' },
    { id: 'evento', label: 'Eventos' },
  ];

  const categoryEmojis = {
    desayuno: '🥐',
    comida: '🍽️',
    cena: '✨',
    evento: '🎉',
  };

  const categoryColors = {
    desayuno: 'border-amber-200',
    comida: 'border-green-200',
    cena: 'border-purple-200',
    evento: 'border-blue-200',
  };

  useEffect(() => {
    fetchMenus();
  }, []);

  const fetchMenus = async () => {
    setIsLoading(true);
    try {
      const { data } = await supabase
        .from('menus')
        .select('*')
        .eq('available', true)
        .order('category', { ascending: true });

      setMenus(data || []);
      setFilteredMenus(data || []);
    } catch (error) {
      console.error('Error fetching menus:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCategoryChange = (category: any) => {
    setSelectedCategory(category);

    if (category === 'todas') {
      setFilteredMenus(menus);
    } else {
      setFilteredMenus(menus.filter((menu) => menu.category === category));
    }
  };

  return (
    <>
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-slate-900 to-slate-800 text-white">
        <Container className="text-center">
          <h1 className="font-playfair text-5xl md:text-6xl mb-4">Catálogo de Menús</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Explora nuestra selección de menús diseñados para cada ocasión
          </p>
        </Container>
      </section>

      {/* Catalog Section */}
      <section className="py-24 bg-white">
        <Container>
          {/* Category Filter */}
          <div className="mb-12">
            <div className="flex flex-wrap gap-3 justify-center">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => handleCategoryChange(category.id)}
                  className={`
                    px-6 py-3 rounded-full font-semibold transition
                    ${
                      selectedCategory === category.id
                        ? 'bg-gold text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }
                  `}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>

          {/* Menu Items Grid */}
          {isLoading ? (
            <div className="text-center py-12">
              <p className="text-gray-600">Cargando menús...</p>
            </div>
          ) : filteredMenus.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredMenus.map((menu) => (
                <Card
                  key={menu.id}
                  className={`border-2 ${categoryColors[menu.category]} overflow-hidden flex flex-col`}
                  hover
                >
                  {/* Category Badge */}
                  <div className="bg-gradient-to-r from-gold to-terracotta text-white px-4 py-2">
                    <div className="flex items-center justify-between">
                      <span className="text-2xl">{categoryEmojis[menu.category]}</span>
                      <span className="text-sm font-semibold uppercase">
                        {menu.category === 'desayuno'
                          ? 'Desayuno'
                          : menu.category === 'comida'
                            ? 'Comida'
                            : menu.category === 'cena'
                              ? 'Cena'
                              : 'Evento'}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 flex-1 flex flex-col">
                    {/* Title and Price */}
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <h3 className="font-playfair text-2xl text-gray-900">{menu.name}</h3>
                      {menu.price && (
                        <span className="text-2xl font-bold text-gold whitespace-nowrap">
                          €{menu.price.toFixed(2)}
                        </span>
                      )}
                    </div>

                    {/* Description */}
                    {menu.description && (
                      <p className="text-gray-600 text-sm mb-4">{menu.description}</p>
                    )}

                    {/* Ingredients */}
                    {menu.ingredients && (
                      <div className="mb-4 pb-4 border-b border-gray-200">
                        <p className="text-xs font-semibold text-gray-600 uppercase mb-2">
                          Ingredientes
                        </p>
                        <p className="text-sm text-gray-700">{menu.ingredients}</p>
                      </div>
                    )}

                    {/* Dietary Restrictions */}
                    {menu.dietary_restrictions && (
                      <div className="mb-4">
                        <p className="text-xs font-semibold text-gray-600 uppercase mb-2">
                          Información Dietética
                        </p>
                        <p className="text-sm text-gray-700">{menu.dietary_restrictions}</p>
                      </div>
                    )}

                    {/* CTA Button */}
                    <div className="mt-auto pt-6">
                      <Link href="/reservar" className="block">
                        <Button size="md" variant="primary" className="w-full">
                          Reservar ahora
                        </Button>
                      </Link>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="text-center py-12">
              <p className="text-gray-600 text-lg">No hay menús disponibles en esta categoría</p>
            </Card>
          )}
        </Container>
      </section>

      {/* Custom Menu Section */}
      <section className="py-24 bg-gray-50">
        <Container>
          <Card className="bg-white">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="font-playfair text-4xl font-bold mb-4">Menú Personalizado</h2>
                <p className="text-gray-600 mb-6">
                  ¿No encuentras lo que buscas? Podemos crear un menú completamente personalizado
                  según tus preferencias y restricciones dietéticas.
                </p>
                <p className="text-gray-600 mb-8">
                  Contáctanos para discutir tus ideas y crear la experiencia gastronómica perfecta
                  para tu evento.
                </p>
                <Link href="/contacto">
                  <Button variant="primary" size="md">
                    Solicitar Menú Personalizado
                  </Button>
                </Link>
              </div>
              <div className="bg-gradient-to-br from-gold to-terracotta text-white rounded-lg p-8 text-center">
                <div className="text-6xl mb-4">🍽️</div>
                <h3 className="font-playfair text-3xl font-bold mb-4">Experiencia a tu Medida</h3>
                <p>
                  Cada menú es diseñado especialmente para satisfacer tus gustos y necesidades
                </p>
              </div>
            </div>
          </Card>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-gold to-terracotta text-white">
        <Container className="text-center">
          <h2 className="font-playfair text-4xl mb-4">¿Listo para probar nuestros menús?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
            Reserva tu experiencia gastronómica hoy mismo
          </p>
          <Link href="/reservar">
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-gold"
            >
              Reservar Ahora
            </Button>
          </Link>
        </Container>
      </section>
    </>
  );
}
