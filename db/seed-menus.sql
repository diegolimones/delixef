-- ============================================================
-- Delixef · Seed de menús
-- ============================================================
-- Ejecuta este script en Supabase → SQL Editor para poblar la
-- tabla `menus` con una selección de platos reales de DeliXef.
-- Si ya tienes datos, comenta o ajusta los INSERT que prefieras.
-- ============================================================

-- Limpia menús previos (descomenta si quieres empezar desde cero)
-- TRUNCATE TABLE menus;

-- ----------------------------------------------------------------
-- Desayunos
-- ----------------------------------------------------------------
INSERT INTO menus (name, description, category, price, ingredients, dietary_restrictions, available) VALUES
('Mesa de desayuno mediterránea',
 'Pan de masa madre, fruta de temporada, embutido ibérico, quesos isleños, café de especialidad y zumos recién exprimidos.',
 'desayuno', 40.00,
 'Pan de masa madre, sobrasada, queso payés, miel local, fruta de temporada, café',
 'Opción vegetariana y sin gluten', true),

('Brunch hortelano',
 'Tortilla francesa con verduras del huerto, tostadas de aguacate y tomate, salmón curado, granola casera con yogur de oveja.',
 'desayuno', 45.00,
 'Huevos camperos, aguacate, tomate raf, salmón ahumado, yogur de oveja, frutos secos',
 'Sin gluten bajo solicitud, opción vegana disponible', true);

-- ----------------------------------------------------------------
-- Comidas
-- ----------------------------------------------------------------
INSERT INTO menus (name, description, category, price, ingredients, dietary_restrictions, available) VALUES
('Arroz marinero a la vista',
 'Nuestro plato sello. Arroz bomba ibicenco con sofrito tradicional, cocinado en directo en paellera grande sobre fuego de leña.',
 'comida', 60.00,
 'Arroz bomba, sepia, gambas rojas, almejas, mejillones, fumet de roca, azafrán',
 'Sin gluten', true),

('Arroz negro de calamar',
 'Arroz negro caldoso con calamar fresco del puerto, alioli suave de azafrán y picada de hierbas.',
 'comida', 60.00,
 'Arroz bomba, calamar, tinta natural, ajo negro, perejil, alioli',
 'Sin gluten', true),

('Mediterráneo compartido',
 'Selección de tapas para mesa larga: ensalada payesa, bullit de peix, tumbet, croquetas de jamón, pa amb oli.',
 'comida', 55.00,
 'Pescados de la lonja, verduras del huerto, jamón ibérico, queso, aceite de oliva virgen',
 'Adaptable a vegetariano', true),

('Bullit de peix tradicional',
 'Plato emblemático de la isla. Pescado de roca cocinado lentamente con patata y servido con arroz a banda.',
 'comida', 65.00,
 'Pescado de roca, patata payesa, arroz bomba, alioli, fumet, azafrán',
 'Sin gluten', true);

-- ----------------------------------------------------------------
-- Cenas
-- ----------------------------------------------------------------
INSERT INTO menus (name, description, category, price, ingredients, dietary_restrictions, available) VALUES
('Menú degustación de seis pases',
 'Recorrido por la cocina mediterránea contemporánea. Tres entradas, pescado del día, carne madurada, postre y petit fours.',
 'cena', 80.00,
 'Producto de mercado del día, vinos seleccionados opcionales',
 'Adaptable a alergias e intolerancias', true),

('Menú del mar',
 'Cinco pases centrados en el producto del puerto: tartar de atún, gamba blanca, pescado a la sal, arroz cremoso, postre cítrico.',
 'cena', 90.00,
 'Atún rojo, gamba blanca de Ibiza, pescado de roca, arroz, cítricos',
 'Sin gluten, sin lácteos bajo solicitud', true),

('Cena BBQ premium',
 'Parrilla a la vista con producto de primera. Pulpo brasa, costilla madurada 45 días, verduras del huerto.',
 'cena', 85.00,
 'Pulpo gallego, costilla angus, verduras de temporada, salsas caseras',
 'Sin gluten', true),

('Menú vegetariano del huerto',
 'Cinco pases 100% vegetales, productos del huerto local. Sin renunciar a la complejidad ni al sabor.',
 'cena', 70.00,
 'Verduras del huerto, legumbres, hierbas frescas, fermentados, semillas',
 'Vegetariano. Vegano y sin gluten bajo solicitud', true);

-- ----------------------------------------------------------------
-- Eventos (catering modular)
-- ----------------------------------------------------------------
INSERT INTO menus (name, description, category, price, ingredients, dietary_restrictions, available) VALUES
('Cocktail de bienvenida premium',
 'Selección de canapés calientes y fríos, croquetas de la abuela, jamón ibérico al corte, brochetas, mini paellas.',
 'evento', 35.00,
 'Producto ibérico, mariscos, verduras de temporada, panes artesanos',
 'Opciones vegetarianas y sin gluten', true),

('Estación de paellas',
 'Servicio de tres arroces simultáneos cocinados a la vista del invitado: marinera, ciega y vegetariana.',
 'evento', 28.00,
 'Arroz bomba, fumet, pescados, verduras, azafrán, alioli',
 'Sin gluten, opción vegetariana', true),

('Big BBQ ibicenco',
 'Parrilla grande con carnes, pescados y verduras del mercado. Producto local cocinado al fuego para grupos.',
 'evento', 45.00,
 'Cordero ibicenco, pescados de la lonja, verduras de huerto, embutidos',
 'Adaptable a vegetariano y sin gluten', true),

('Barra de coctelería de autor',
 'Cocktails clásicos y de autor con cítricos isleños, hierbas frescas y destilados premium. Servicio con bartender.',
 'evento', 25.00,
 'Destilados premium, cítricos locales, hierbas aromáticas, frutas de temporada',
 'Opciones sin alcohol disponibles', true),

('Mesa dulce y petit fours',
 'Selección de pastelería artesanal, frutas confitadas, helados de elaboración propia y bombonería.',
 'evento', 18.00,
 'Mantequilla, frutos secos, frutas, chocolates de origen, vainilla de Madagascar',
 'Opciones sin gluten y sin lactosa', true);

-- ============================================================
-- Verificación
-- ============================================================
-- Cuenta cuántos menús hay por categoría tras el insert
SELECT category, COUNT(*) AS total
FROM menus
WHERE available = true
GROUP BY category
ORDER BY category;
