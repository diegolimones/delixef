-- ============================================================
-- Delixef · Setup completo — tablas + seed
-- Ejecuta en Supabase → SQL Editor
-- ============================================================

-- ----------------------------------------------------------------
-- Tabla: admin_users
-- ----------------------------------------------------------------
CREATE TABLE IF NOT EXISTS admin_users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  full_name TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Usuario admin por defecto (cambia la contraseña en producción)
INSERT INTO admin_users (email, password_hash, full_name)
VALUES ('admin@delixef.com', 'admin123', 'Pau Baena')
ON CONFLICT (email) DO NOTHING;

-- ----------------------------------------------------------------
-- Tabla: menus
-- ----------------------------------------------------------------
CREATE TABLE IF NOT EXISTS menus (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL CHECK (category IN ('desayuno', 'comida', 'cena', 'evento')),
  price NUMERIC(8,2),
  image_url TEXT,
  ingredients TEXT,
  dietary_restrictions TEXT,
  available BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ----------------------------------------------------------------
-- Seed: Desayunos
-- ----------------------------------------------------------------
INSERT INTO menus (name, description, category, price, ingredients, dietary_restrictions, available) VALUES
(
  'Mesa de desayuno mediterránea',
  'Pan de masa madre, fruta de temporada, embutido ibérico, quesos isleños, café de especialidad y zumos recién exprimidos.',
  'desayuno', 40.00,
  'Pan de masa madre, sobrasada, queso payés, miel local, fruta de temporada, café',
  'Opción vegetariana y sin gluten disponible',
  true
),
(
  'Brunch hortelano',
  'Tortilla francesa con verduras del huerto, tostadas de aguacate y tomate, salmón curado, granola casera con yogur de oveja.',
  'desayuno', 45.00,
  'Huevos camperos, aguacate, tomate raf, salmón ahumado, yogur de oveja, frutos secos',
  'Sin gluten bajo solicitud · Opción vegana disponible',
  true
),
(
  'Desayuno ibicenco clásico',
  'Pa amb oli con tomate fresco y aceite virgen extra de la isla, embutidos locales, ensaimada artesanal y zumo de naranja.',
  'desayuno', 28.00,
  'Pan payés, tomate, aceite de oliva ibicenco, sobrasada, butifarrón, ensaimada',
  'Sin opciones veganas · Contiene gluten y lácteos',
  true
);

-- ----------------------------------------------------------------
-- Seed: Comidas
-- ----------------------------------------------------------------
INSERT INTO menus (name, description, category, price, ingredients, dietary_restrictions, available) VALUES
(
  'Arroz marinero a la vista',
  'Nuestro plato sello. Arroz bomba ibicenco con sofrito tradicional, cocinado en directo en paellera grande sobre fuego de leña.',
  'comida', 60.00,
  'Arroz bomba, sepia, gambas rojas, almejas, mejillones, fumet de roca, azafrán',
  'Sin gluten',
  true
),
(
  'Arroz negro de calamar',
  'Arroz negro caldoso con calamar fresco del puerto, alioli suave de azafrán y picada de hierbas.',
  'comida', 60.00,
  'Arroz bomba, calamar, tinta natural, ajo negro, perejil, alioli',
  'Sin gluten',
  true
),
(
  'Mediterráneo compartido',
  'Selección de tapas para mesa larga: ensalada payesa, bullit de peix, tumbet, croquetas de jamón, pa amb oli.',
  'comida', 55.00,
  'Pescados de la lonja, verduras del huerto, jamón ibérico, queso, aceite de oliva virgen',
  'Adaptable a vegetariano',
  true
),
(
  'Bullit de peix tradicional',
  'Plato emblemático de la isla. Pescado de roca cocinado lentamente con patata y servido con arroz a banda.',
  'comida', 65.00,
  'Pescado de roca, patata payesa, arroz bomba, alioli, fumet, azafrán',
  'Sin gluten',
  true
),
(
  'Paella valenciana clásica',
  'La receta original con pollo de corral, conejo, garrofón y judía verde. Socarrat perfecto, cocinada a la leña.',
  'comida', 52.00,
  'Arroz bomba, pollo de corral, conejo, garrofón, judía verde, tomate, pimentón, azafrán',
  'Sin gluten · Sin mariscos',
  true
);

-- ----------------------------------------------------------------
-- Seed: Cenas
-- ----------------------------------------------------------------
INSERT INTO menus (name, description, category, price, ingredients, dietary_restrictions, available) VALUES
(
  'Menú degustación — 6 pases',
  'Recorrido por la cocina mediterránea contemporánea. Tres entradas, pescado del día, carne madurada, postre y petit fours.',
  'cena', 95.00,
  'Producto de mercado del día, elaboraciones de temporada, petit fours artesanales',
  'Adaptable a alergias e intolerancias · Avísanos al reservar',
  true
),
(
  'Menú del mar — 5 pases',
  'Cinco pases centrados en el producto del puerto: tartar de atún, gamba blanca, pescado a la sal, arroz cremoso, postre cítrico.',
  'cena', 90.00,
  'Atún rojo, gamba blanca de Ibiza, pescado de roca, arroz, cítricos de la isla',
  'Sin gluten · Sin lácteos bajo solicitud',
  true
),
(
  'Cena BBQ premium',
  'Parrilla a la vista con producto de primera. Pulpo a la brasa, costilla madurada 45 días, verduras del huerto y salsas caseras.',
  'cena', 85.00,
  'Pulpo gallego, costilla angus madurada, verduras de temporada, salsas artesanales',
  'Sin gluten',
  true
),
(
  'Menú vegetariano del huerto — 5 pases',
  'Cinco pases 100% vegetales con producto del huerto local. Sin renunciar a la complejidad ni al sabor.',
  'cena', 70.00,
  'Verduras del huerto, legumbres, hierbas frescas, fermentados artesanales, semillas',
  'Vegetariano · Vegano y sin gluten bajo solicitud',
  true
),
(
  'Cena romántica para dos',
  'Menú íntimo de cuatro pases diseñado para dos personas. Producto de temporada, vela y servicio personalizado.',
  'cena', 120.00,
  'Producto de temporada, mariscos selectos, carne o pescado al gusto, postre artesanal',
  'Adaptable a cualquier restricción · Menú personalizable',
  true
);

-- ----------------------------------------------------------------
-- Seed: Eventos (catering modular)
-- ----------------------------------------------------------------
INSERT INTO menus (name, description, category, price, ingredients, dietary_restrictions, available) VALUES
(
  'Cocktail de bienvenida premium',
  'Selección de canapés calientes y fríos, croquetas de la abuela, jamón ibérico al corte, brochetas y mini paellas.',
  'evento', 35.00,
  'Producto ibérico, mariscos, verduras de temporada, panes artesanos',
  'Opciones vegetarianas y sin gluten incluidas',
  true
),
(
  'Estación de paellas',
  'Servicio de tres arroces simultáneos cocinados a la vista: marinera, ciega de verduras y vegetariana.',
  'evento', 28.00,
  'Arroz bomba, fumet, pescados, verduras, azafrán, alioli casero',
  'Sin gluten · Opción vegetariana',
  true
),
(
  'Big BBQ ibicenco',
  'Parrilla grande con carnes, pescados y verduras del mercado local. Producto de la isla cocinado al fuego para grupos.',
  'evento', 45.00,
  'Cordero ibicenco, pescados de la lonja, verduras del huerto, embutidos artesanos',
  'Adaptable a vegetariano y sin gluten',
  true
),
(
  'Barra de coctelería de autor',
  'Cocktails clásicos y de autor con cítricos isleños, hierbas frescas y destilados premium. Servicio con bartender.',
  'evento', 25.00,
  'Destilados premium, cítricos locales, hierbas aromáticas, frutas de temporada',
  'Opciones sin alcohol disponibles',
  true
),
(
  'Mesa dulce y petit fours',
  'Pastelería artesanal, frutas confitadas, helados de elaboración propia y bombonería de temporada.',
  'evento', 18.00,
  'Mantequilla, frutos secos, frutas, chocolates de origen, vainilla de Madagascar',
  'Opciones sin gluten y sin lactosa disponibles',
  true
);

-- ----------------------------------------------------------------
-- Verificación
-- ----------------------------------------------------------------
SELECT category, COUNT(*) AS total
FROM menus
WHERE available = true
GROUP BY category
ORDER BY category;
