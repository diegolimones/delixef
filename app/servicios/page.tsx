'use client';

import Container from '@/components/Container';
import Card from '@/components/Card';
import Button from '@/components/Button';
import Link from 'next/link';

const servicios = [
  {
    id: 'desayunos',
    name: 'Desayunos',
    icon: '🥐',
    description: 'Inicia tu día con elegancia y sabor',
    details: [
      'Desayunos tradicionales gourmet',
      'Opciones veganas y sin gluten',
      'Jugos frescos y batidos premium',
      'Café artesanal de especialidad',
      'Horarios flexibles',
    ],
    precio: 'Desde €40 por persona',
    color: 'from-amber-400 to-orange-400',
  },
  {
    id: 'comidas',
    name: 'Comidas',
    icon: '🍽️',
    description: 'El menú perfecto para tu mediodía',
    details: [
      'Menús ejecutivos personalizados',
      'Opciones para grupos',
      'Maridajes de vinos',
      'Ingredientes locales de Ibiza',
      'Servicio profesional',
    ],
    precio: 'Desde €60 por persona',
    color: 'from-green-400 to-emerald-400',
  },
  {
    id: 'cenas',
    name: 'Cenas',
    icon: '✨',
    description: 'Noches inolvidables con excelencia culinaria',
    details: [
      'Cenas románticas para dos',
      'Menús multi-curso',
      'Experiencias temáticas',
      'Presentación artística',
      'Ambiente privado y exclusivo',
    ],
    precio: 'Desde €80 por persona',
    color: 'from-purple-400 to-pink-400',
  },
  {
    id: 'eventos',
    name: 'Eventos Especiales',
    icon: '🎉',
    description: 'Celebraciones memorables en Ibiza',
    details: [
      'Bodas y celebraciones',
      'Eventos corporativos',
      'Cumpleaños exclusivos',
      'Cócteles y catering',
      'Planificación integral',
    ],
    precio: 'Presupuesto personalizado',
    color: 'from-blue-400 to-cyan-400',
  },
];

export default function Servicios() {
  return (
    <>
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-slate-900 to-slate-800 text-white">
        <Container className="text-center">
          <h1 className="font-playfair text-5xl md:text-6xl mb-4">Nuestros Servicios</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Experiencias gastronómicas únicas diseñadas para cada momento especial
          </p>
        </Container>
      </section>

      {/* Services Grid */}
      <section className="py-24 bg-white">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {servicios.map((servicio) => (
              <div key={servicio.id} id={servicio.id} className="scroll-mt-20">
                <Card hover className="h-full">
                  <div className="flex items-start justify-between mb-4">
                    <span className="text-5xl">{servicio.icon}</span>
                    <div className={`bg-gradient-to-br ${servicio.color} text-white px-4 py-2 rounded-full text-sm font-semibold`}>
                      {servicio.precio}
                    </div>
                  </div>

                  <h3 className="font-playfair text-3xl text-gold mb-2">{servicio.name}</h3>
                  <p className="text-gray-600 text-lg mb-6">{servicio.description}</p>

                  <ul className="space-y-3 mb-8">
                    {servicio.details.map((detail, index) => (
                      <li key={index} className="flex items-center gap-3">
                        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-gold text-white text-sm font-semibold flex-shrink-0">
                          ✓
                        </span>
                        <span className="text-gray-700">{detail}</span>
                      </li>
                    ))}
                  </ul>

                  <Link href="/reservar" className="block">
                    <Button
                      size="md"
                      variant="primary"
                      className="w-full"
                    >
                      Reservar {servicio.name}
                    </Button>
                  </Link>
                </Card>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Process Section */}
      <section className="py-24 bg-gray-50">
        <Container>
          <div className="text-center mb-16">
            <h2 className="font-playfair text-4xl md:text-5xl mb-4">Cómo Funciona</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Un proceso simple para crear tu experiencia gastronómica perfecta
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              {
                step: 1,
                title: 'Elige tu Servicio',
                description: 'Selecciona el tipo de experiencia que deseas',
              },
              {
                step: 2,
                title: 'Personaliza tu Menú',
                description: 'Adapta el menú a tus preferencias y restricciones',
              },
              {
                step: 3,
                title: 'Confirma tu Reserva',
                description: 'Recibe confirmación por email',
              },
              {
                step: 4,
                title: 'Disfruta',
                description: 'Vive una experiencia inolvidable',
              },
            ].map((item) => (
              <Card key={item.step} className="text-center">
                <div className="w-12 h-12 bg-gold rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-lg">{item.step}</span>
                </div>
                <h4 className="font-semibold text-lg mb-2">{item.title}</h4>
                <p className="text-gray-600">{item.description}</p>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-gold to-terracotta text-white">
        <Container className="text-center">
          <h2 className="font-playfair text-4xl mb-4">¿Listo para reservar?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
            Contáctanos ahora y diseñaremos la experiencia perfecta para ti
          </p>
          <Link href="/reservar">
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-gold"
            >
              Comenzar Reserva
            </Button>
          </Link>
        </Container>
      </section>
    </>
  );
}
