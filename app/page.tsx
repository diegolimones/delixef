'use client';

import Link from 'next/link';
import Card from '@/components/Card';
import Container from '@/components/Container';
import Button from '@/components/Button';

const servicios = [
  {
    id: 'desayunos',
    name: 'Desayunos',
    description: 'Inicia el día con desayunos gourmet personalizados. Desde opciones clásicas hasta creaciones innovadoras.',
    icon: '🥐',
  },
  {
    id: 'comidas',
    name: 'Comidas',
    description: 'Menús del mediodía cuidadosamente preparados con ingredientes frescos y técnicas culinarias de clase mundial.',
    icon: '🍽️',
  },
  {
    id: 'cenas',
    name: 'Cenas',
    description: 'Experiencias nocturnas memorables. Cenas románticas, familiares o con amigos en un ambiente exclusivo.',
    icon: '✨',
  },
  {
    id: 'eventos',
    name: 'Eventos Especiales',
    description: 'Celebraciones, bodas, cumpleaños y eventos corporativos con catering gastronómico de lujo.',
    icon: '🎉',
  },
];

const caracteristicas = [
  {
    title: 'Menús Personalizados',
    description: 'Cada menú se adapta a tus preferencias y restricciones dietéticas',
  },
  {
    title: 'Ingredientes Frescos',
    description: 'Utilizamos productos locales de la mejor calidad de Ibiza',
  },
  {
    title: 'Experiencia Premium',
    description: 'Servicio impecable y atención al detalle en cada evento',
  },
  {
    title: 'Sincronización Calendario',
    description: 'Gestión completa de tus reservas y disponibilidad',
  },
];

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="hero py-32 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-10 w-40 h-40 bg-gold rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 left-10 w-40 h-40 bg-terracotta rounded-full blur-3xl"></div>
        </div>

        <Container className="relative z-10 text-center">
          <div className="mb-4">
            <span className="inline-block text-gold text-sm font-semibold tracking-wider uppercase">
              Bienvenido a
            </span>
          </div>
          <h1 className="font-playfair text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Delixef
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-4">Chef Privado en Ibiza</p>
          <p className="text-lg max-w-3xl mx-auto mb-10 text-gray-400 leading-relaxed">
            Experiencias gastronómicas exclusivas diseñadas para satisfacer tus sentidos. Desayunos, comidas, cenas y eventos personalizados con lujo minimalista y calidez gastronómica.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/reservar">
              <Button size="lg" variant="primary">
                Reservar Ahora
              </Button>
            </Link>
            <Link href="/servicios">
              <Button size="lg" variant="outline">
                Ver Servicios
              </Button>
            </Link>
          </div>
        </Container>
      </section>

      {/* Servicios Section */}
      <section className="py-24 bg-white">
        <Container>
          <div className="text-center mb-16">
            <h2 className="font-playfair text-4xl md:text-5xl mb-4">Nuestros Servicios</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Cada experiencia es única, cuidadosamente diseñada para tus necesidades específicas
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {servicios.map((servicio) => (
              <Card key={servicio.id} hover>
                <div className="text-4xl mb-4">{servicio.icon}</div>
                <h3 className="font-playfair text-2xl text-gold mb-3">{servicio.name}</h3>
                <p className="text-gray-600 mb-4">{servicio.description}</p>
                <Link href={`/servicios#${servicio.id}`} className="text-gold hover:text-terracotta transition font-semibold">
                  Conocer más →
                </Link>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Características Section */}
      <section className="py-24 bg-gray-50">
        <Container>
          <div className="text-center mb-16">
            <h2 className="font-playfair text-4xl md:text-5xl mb-4">¿Por qué elegirnos?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Combinamos la excelencia culinaria con un servicio personalizado
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {caracteristicas.map((caracteristica, index) => (
              <Card key={index} className="bg-white">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-gold rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-lg">{index + 1}</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {caracteristica.title}
                    </h3>
                    <p className="text-gray-600">{caracteristica.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-gold to-terracotta text-white">
        <Container className="text-center">
          <h2 className="font-playfair text-4xl mb-4">¿Listo para una experiencia excepcional?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
            Contáctanos hoy y reserva tu experiencia gastronómica personalizada
          </p>
          <Link href="/reservar">
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-gold"
            >
              Reservar Experiencia
            </Button>
          </Link>
        </Container>
      </section>
    </>
  );
}
