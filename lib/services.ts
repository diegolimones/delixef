export interface Service {
  id: string;
  num: string;
  name: string;
  subtitle: string;
  shortDescription: string;
  description: string;
  details: string[];
  precio: string;
  image: string;
}

export const services: Service[] = [
  {
    id: 'chefs-privados',
    num: '01',
    name: 'Chefs privados',
    subtitle: 'En tu villa, sin reloj',
    shortDescription:
      'Una cena privada con narrativa. Cuatro o seis pases, vinos elegidos y servicio en mesa.',
    description:
      'Un chef en tu villa o finca, con menú a medida. Cenas íntimas, comidas familiares o servicios de varios días: producto del mercado, técnica precisa, atención sin reparto.',
    details: [
      'Menú degustación de cuatro o seis pases',
      'Maridaje opcional con vinos seleccionados',
      'Compra de producto del día incluida',
      'Iluminación y montaje de mesa si aplica',
      'Equipo discreto: te ocupas solo de tus invitados',
    ],
    precio: '80€',
    image:
      'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=85&auto=format&fit=crop',
  },
  {
    id: 'big-bbq',
    num: '02',
    name: 'Big BBQ',
    subtitle: 'Parrilla a la vista',
    shortDescription:
      'Parrilla en directo, brasas vivas y producto local. Una BBQ que se hace ritual.',
    description:
      'Parrilla a la vista con brasas vivas. Carnes, pescados y vegetales del mercado, cocinados delante del invitado. Casa de comidas al aire libre, hecha ritual.',
    details: [
      'Parrilla profesional montada en tu espacio',
      'Producto local: carnes, pescados, verduras de huerto',
      'Salsas, panes y guarniciones caseras',
      'Equipo de parrilleros y servicio',
      'Formato compartir o emplatado, tú eliges',
    ],
    precio: 'Consulta',
    image:
      'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=1200&q=85&auto=format&fit=crop',
  },
  {
    id: 'arroces-paellas',
    num: '03',
    name: 'Arroces & Paellas',
    subtitle: 'Sello de la casa',
    shortDescription:
      'Arroces y paellas mediterráneas a la vista del invitado. El sello de DeliXef.',
    description:
      'Arroces y paellas cocinados delante del invitado: marinera, bogavante, ciega, ibicenca. El sello distintivo de la casa, como complemento o servicio independiente.',
    details: [
      'Paellas y arroces caldosos cocinados en directo',
      'Variedades a elegir: marinera, bogavante, ciega, etc.',
      'Cantidades calculadas con precisión por comensal',
      'Posibilidad de contratar como servicio aislado',
      'Espectáculo gastronómico para grupos grandes',
    ],
    precio: 'Consulta',
    image:
      'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=1200&q=85&auto=format&fit=crop',
  },
  {
    id: 'gastronomic-events',
    num: '04',
    name: 'Gastronomic Events',
    subtitle: 'Mesa con narrativa',
    shortDescription:
      'Cenas con narrativa, presentaciones de marca y showcooking de alto nivel.',
    description:
      'Eventos donde la gastronomía es el centro: cenas temáticas, presentaciones de marca, showcooking, maridajes verticales. Diseñamos el guion completo del evento.',
    details: [
      'Diseño del menú alrededor de un concepto o producto',
      'Showcooking y narrativa con el chef en sala',
      'Maridaje cuidado con bodegas seleccionadas',
      'Coordinación con prensa, marca y proveedores',
      'Documentación visual del evento si se desea',
    ],
    precio: 'Consulta',
    image:
      'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=1200&q=85&auto=format&fit=crop',
  },
  {
    id: 'casual-events',
    num: '05',
    name: 'Casual Events',
    subtitle: 'Sin protocolo',
    shortDescription:
      'Reuniones informales, retiros, after-works y celebraciones sin protocolo.',
    description:
      'Eventos donde la cocina es excelente pero el formato es relajado. Retiros corporativos, networking, after-works, celebraciones familiares. Sin sala formal, con buena música y buena mesa.',
    details: [
      'Formato bufé, estaciones o compartir en mesa',
      'Barra de cócteles ligera o vinos a granel',
      'Servicio adaptado al ritmo del grupo',
      'Producto local de calidad, presentación honesta',
      'Logística sencilla, sin protocolo',
    ],
    precio: 'Consulta',
    image:
      'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=1200&q=85&auto=format&fit=crop',
  },
  {
    id: 'partys',
    num: '06',
    name: 'Partys',
    subtitle: 'Celebración a medida',
    shortDescription:
      'Cumpleaños, aniversarios y fiestas privadas con cocina y barra propias.',
    description:
      'Cumpleaños, aniversarios, fiestas en villa, despedidas. Cocina, barra de coctelería y servicio adaptados al tono de la celebración: del aperitivo elegante al beach party hasta el amanecer.',
    details: [
      'Cocktail de bienvenida y barra de cócteles',
      'Estaciones gastronómicas y picoteo gourmet',
      'Equipo de bartenders y servicio',
      'Adaptación al espacio: villa, terraza, cala',
      'Coordinación con DJ, decoración y proveedores',
    ],
    precio: 'Consulta',
    image:
      'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=1200&q=85&auto=format&fit=crop',
  },
  {
    id: 'weddings',
    num: '07',
    name: 'Weddings',
    subtitle: 'Frente al mar',
    shortDescription:
      'La cocina de tu boda en Ibiza, en villa, finca o cala. De 50 a 200 invitados.',
    description:
      'Diseñamos la experiencia gastronómica completa de tu boda en Ibiza. Cocina mediterránea, servicio en mesa, barras de cócteles y arroces a la vista. De 50 a 200 invitados.',
    details: [
      'Menú degustación o servicio en mesa',
      'Cocktail de bienvenida con barra premium',
      'Arroces y paellas a la vista del invitado',
      'Equipo completo: cocina, barra, sala y producción',
      'Coordinación con wedding planner y espacio',
      'Catas previas y reuniones de planificación',
    ],
    precio: '120€',
    image:
      'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=1200&q=85&auto=format&fit=crop',
  },
];
