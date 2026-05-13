'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

type Category = 'Todos' | 'Desayunos' | 'Comidas' | 'Cenas' | 'Eventos';

interface MenuItem {
  name: string;
  description: string;
  ingredients: string;
  dietary: string;
  price: number;
  category: Exclude<Category, 'Todos'>;
}

const menuItems: MenuItem[] = [
  // CENAS
  {
    name: 'Cena BBQ premium',
    description: 'Parrilla a la vista con producto de primera. Pulpo a la brasa, costilla madurada 45 días, verduras del huerto y salsas caseras.',
    ingredients: 'Pulpo gallego, costilla angus madurada, verduras de temporada, salsas artesanales',
    dietary: 'Sin gluten',
    price: 85,
    category: 'Cenas',
  },
  {
    name: 'Menú vegetariano del huerto — 5 pases',
    description: 'Cinco pases 100% vegetales con producto del huerto local. Sin renunciar a la complejidad ni al sabor.',
    ingredients: 'Verduras del huerto, legumbres, hierbas frescas, fermentados artesanales, semillas',
    dietary: 'Vegetariano · Vegano y sin gluten bajo solicitud',
    price: 70,
    category: 'Cenas',
  },
  {
    name: 'Cena romántica para dos',
    description: 'Menú íntimo de cuatro pases diseñado para dos personas. Producto de temporada, vela y servicio personalizado.',
    ingredients: 'Producto de temporada, mariscos selectos, carne o pescado al gusto, postre artesanal',
    dietary: 'Adaptable a cualquier restricción · Menú personalizable',
    price: 120,
    category: 'Cenas',
  },
  {
    name: 'Menú degustación — 6 pases',
    description: 'Recorrido por la cocina mediterránea contemporánea. Tres entradas, pescado del día, carne madurada, postre y petit fours.',
    ingredients: 'Producto de mercado del día, elaboraciones de temporada, petit fours artesanales',
    dietary: 'Adaptable a alergias e intolerancias · Avísanos al reservar',
    price: 95,
    category: 'Cenas',
  },
  {
    name: 'Menú del mar — 5 pases',
    description: 'Cinco pases centrados en el producto del puerto: tartar de atún, gamba blanca, pescado a la sal, arroz cremoso, postre cítrico.',
    ingredients: 'Atún rojo, gamba blanca de Ibiza, pescado de roca, arroz, cítricos de la isla',
    dietary: 'Sin gluten · Sin lácteos bajo solicitud',
    price: 90,
    category: 'Cenas',
  },
  // COMIDAS
  {
    name: 'Mediterráneo compartido',
    description: 'Selección de tapas para mesa larga: ensalada payesa, bullit de peix, tumbet, croquetas de jamón, pa amb oli.',
    ingredients: 'Pescados de la lonja, verduras del huerto, jamón ibérico, queso, aceite de oliva virgen',
    dietary: 'Adaptable a vegetariano',
    price: 55,
    category: 'Comidas',
  },
  {
    name: 'Bullit de peix tradicional',
    description: 'Plato emblemático de la isla. Pescado de roca cocinado lentamente con patata y servido con arroz a banda.',
    ingredients: 'Pescado de roca, patata payesa, arroz bomba, alioli, fumet, azafrán',
    dietary: 'Sin gluten',
    price: 65,
    category: 'Comidas',
  },
  {
    name: 'Paella valenciana clásica',
    description: 'La receta original con pollo de corral, conejo, garrofón y judía verde. Socarrat perfecto, cocinada a la leña.',
    ingredients: 'Arroz bomba, pollo de corral, conejo, garrofón, judía verde, tomate, pimentón, azafrán',
    dietary: 'Sin gluten · Sin mariscos',
    price: 52,
    category: 'Comidas',
  },
  {
    name: 'Arroz marinero a la vista',
    description: 'Nuestro plato sello. Arroz bomba ibicenco con sofrito tradicional, cocinado en directo en paellera grande sobre fuego de leña.',
    ingredients: 'Arroz bomba, sepia, gambas rojas, almejas, mejillones, fumet de roca, azafrán',
    dietary: 'Sin gluten',
    price: 60,
    category: 'Comidas',
  },
  {
    name: 'Arroz negro de calamar',
    description: 'Arroz negro caldoso con calamar fresco del puerto, alioli suave de azafrán y picada de hierbas.',
    ingredients: 'Arroz bomba, calamar, tinta natural, ajo negro, perejil, alioli',
    dietary: 'Sin gluten',
    price: 60,
    category: 'Comidas',
  },
  // DESAYUNOS
  {
    name: 'Mesa de desayuno mediterránea',
    description: 'Pan de masa madre, fruta de temporada, embutido ibérico, quesos isleños, café de especialidad y zumos recién exprimidos.',
    ingredients: 'Pan de masa madre, sobrasada, queso payés, miel local, fruta de temporada, café',
    dietary: 'Opción vegetariana y sin gluten disponible',
    price: 40,
    category: 'Desayunos',
  },
  {
    name: 'Brunch hortelano',
    description: 'Tortilla francesa con verduras del huerto, tostadas de aguacate y tomate, salmón curado, granola casera con yogur de oveja.',
    ingredients: 'Huevos camperos, aguacate, tomate raf, salmón ahumado, yogur de oveja, frutos secos',
    dietary: 'Sin gluten bajo solicitud · Opción vegana disponible',
    price: 45,
    category: 'Desayunos',
  },
  {
    name: 'Desayuno ibicenco clásico',
    description: 'Pa amb oli con tomate fresco y aceite virgen extra de la isla, embutidos locales, ensaimada artesanal y zumo de naranja.',
    ingredients: 'Pan payés, tomate, aceite de oliva ibicenco, sobrasada, butifarrón, ensaimada',
    dietary: 'Contiene gluten y lácteos',
    price: 28,
    category: 'Desayunos',
  },
  // EVENTOS
  {
    name: 'Cocktail de bienvenida premium',
    description: 'Selección de canapés calientes y fríos, croquetas de la abuela, jamón ibérico al corte, brochetas y mini paellas.',
    ingredients: 'Producto ibérico, mariscos, verduras de temporada, panes artesanos',
    dietary: 'Opciones vegetarianas y sin gluten incluidas',
    price: 35,
    category: 'Eventos',
  },
  {
    name: 'Estación de paellas',
    description: 'Servicio de tres arroces simultáneos cocinados a la vista: marinera, ciega de verduras y vegetariana.',
    ingredients: 'Arroz bomba, fumet, pescados, verduras, azafrán, alioli casero',
    dietary: 'Sin gluten · Opción vegetariana',
    price: 28,
    category: 'Eventos',
  },
  {
    name: 'Big BBQ ibicenco',
    description: 'Parrilla grande con carnes, pescados y verduras del mercado local. Producto de la isla cocinado al fuego para grupos.',
    ingredients: 'Cordero ibicenco, pescados de la lonja, verduras del huerto, embutidos artesanos',
    dietary: 'Adaptable a vegetariano y sin gluten',
    price: 45,
    category: 'Eventos',
  },
  {
    name: 'Barra de coctelería de autor',
    description: 'Cocktails clásicos y de autor con cítricos isleños, hierbas frescas y destilados premium. Servicio con bartender.',
    ingredients: 'Destilados premium, cítricos locales, hierbas aromáticas, frutas de temporada',
    dietary: 'Opciones sin alcohol disponibles',
    price: 25,
    category: 'Eventos',
  },
  {
    name: 'Mesa dulce y petit fours',
    description: 'Pastelería artesanal, frutas confitadas, helados de elaboración propia y bombonería de temporada.',
    ingredients: 'Mantequilla, frutos secos, frutas, chocolates de origen, vainilla de Madagascar',
    dietary: 'Opciones sin gluten y sin lactosa disponibles',
    price: 18,
    category: 'Eventos',
  },
];

const CATEGORIES: Category[] = ['Todos', 'Desayunos', 'Comidas', 'Cenas', 'Eventos'];

const heroImage =
  'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1600&q=85&auto=format&fit=crop';

export default function Catalogo() {
  const [active, setActive] = useState<Category>('Todos');

  const filtered = active === 'Todos' ? menuItems : menuItems.filter((m) => m.category === active);

  return (
    <>
      {/* HERO */}
      <section className="relative -mt-20 md:-mt-24">
        <div className="relative h-[50vh] min-h-[340px] max-h-[480px] overflow-hidden">
          <div className="absolute inset-0 hero-breathe">
            <Image
              src={heroImage}
              alt="Mesa privada con servicio de chef en Ibiza"
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          </div>
          <div
            aria-hidden="true"
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(180deg, oklch(0.13 0.05 232 / 0.55) 0%, oklch(0.13 0.05 232 / 0.25) 40%, oklch(0.13 0.05 232 / 0.55) 75%, oklch(0.13 0.05 232 / 0.90) 100%)',
            }}
          />

          <div className="absolute top-14 md:top-16 inset-x-0 z-10">
            <div className="max-w-editorial mx-auto px-6 md:px-10">
              <div className="flex items-center justify-between">
                <span className="eyebrow text-sand-50/95">N°03 · Catálogo</span>
                <span className="eyebrow text-sand-50/85 hidden md:inline tabular-nums">{menuItems.length} platos</span>
              </div>
            </div>
          </div>

          <div className="absolute inset-0 flex items-end pb-10 md:pb-14 z-10">
            <div className="max-w-editorial mx-auto px-6 md:px-10 w-full">
              <h1 className="font-display font-light text-4xl md:text-6xl text-sand-50 leading-tight">
                La carta<br />
                <span className="italic text-gold-300">de esta temporada.</span>
              </h1>
            </div>
          </div>
        </div>
      </section>

      {/* FILTROS + LISTA */}
      <section className="bg-sand-50 py-10 md:py-14">
        <div className="max-w-editorial mx-auto px-6 md:px-10">

          {/* Filtros */}
          <div className="flex items-baseline gap-1 flex-wrap mb-10 pb-6 border-b border-sea-200/50">
            <span className="eyebrow text-amber-500 mr-4">— Filtrar</span>
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`px-4 py-1.5 rounded-full text-xs tracking-wide border transition-all duration-200 mr-1 mb-1 ${
                  active === cat
                    ? 'bg-amber-500 border-amber-500 text-white'
                    : 'border-sea-200/60 text-ink-mute hover:border-amber-400/60 hover:text-ink'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Lista de menús */}
          <ul className="divide-y divide-sea-200/50 border-t border-sea-200/50">
            {filtered.map((item, idx) => (
              <li key={item.name} className={`grid grid-cols-12 gap-4 md:gap-8 py-6 md:py-7 group transition-colors -mx-4 px-4 md:-mx-6 md:px-6 ${
                idx % 2 === 0 ? 'bg-sand-50 hover:bg-warm-50' : 'bg-warm-50 hover:bg-sand-100'
              }`}>

                {/* Categoría */}
                <div className="col-span-12 md:col-span-2">
                  <span className="eyebrow text-sea-600">{item.category}</span>
                </div>

                {/* Nombre + descripción + ingredientes */}
                <div className="col-span-12 md:col-span-7">
                  <h3 className="font-display text-xl md:text-2xl text-ink font-light leading-tight group-hover:italic transition-all duration-300">
                    {item.name}
                  </h3>
                  <p className="mt-2 text-sm text-ink-soft font-light leading-relaxed">
                    {item.description}
                  </p>
                  <p className="mt-2 text-xs text-ink-mute font-light italic leading-relaxed">
                    {item.ingredients}
                  </p>
                  <p className="mt-2 text-xs text-amber-600 font-light tracking-wide">
                    {item.dietary}
                  </p>
                </div>

                {/* Precio + CTA */}
                <div className="col-span-12 md:col-span-3 md:text-right flex md:flex-col md:items-end justify-between items-baseline gap-4">
                  <span className="font-display text-2xl md:text-3xl text-ink font-light tabular-nums">
                    {item.price}€
                  </span>
                  <Link
                    href="/reservar"
                    className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-mute hover:text-amber-500 transition-colors"
                  >
                    Reservar →
                  </Link>
                </div>
              </li>
            ))}
          </ul>

          <p className="mt-6 text-xs text-ink-mute font-light text-center">
            Precios por persona. IVA no incluido. Mínimo 4 personas.
          </p>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="bg-sea-900 text-sand-50 py-12 md:py-16 border-t border-sand-50/10">
        <div className="max-w-editorial mx-auto px-6 md:px-10">
          <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-6">
            <div>
              <span className="eyebrow text-foam-400 block mb-3">— ¿No encuentras lo que buscas?</span>
              <h2 className="font-display font-light text-2xl md:text-3xl text-sand-50 leading-tight">
                Cuéntanos tu evento.<br />
                <span className="italic text-gold-300">Lo diseñamos juntos.</span>
              </h2>
            </div>
            <Link
              href="/reservar"
              className="inline-flex items-center justify-center bg-amber-500 hover:bg-amber-400 text-white px-8 py-4 text-xs font-semibold tracking-[0.22em] uppercase transition-colors rounded-full self-start md:self-auto shrink-0"
            >
              Solicitar fecha
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
