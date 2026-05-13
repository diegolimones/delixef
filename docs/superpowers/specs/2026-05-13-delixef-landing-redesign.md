# Delixef Landing Page Redesign

**Date:** 2026-05-13  
**Scope:** Landing page (/) — Enfoque A: Rediseño Iterativo  
**Status:** Aprobado por el cliente

---

## Objetivo

Rediseñar la landing page de Delixef (Chef Privado en Ibiza) para transmitir una experiencia **cálida y cercana** que conecte emocionalmente con el visitante y lo convierta en cliente. El diseño mantendrá la identidad turquesa mediterránea pero con una base cálida dominante (dorados, ocre, terracota).

---

## Audiencia

Turistas y residentes en Ibiza con poder adquisitivo que buscan contratar un chef privado para eventos, bodas, cenas privadas o experiencias gastronómicas únicas.

---

## Paleta de Colores

| Rol | Color | Hex |
|-----|-------|-----|
| Fondo principal | Blanco crema | `#FBF8F3` |
| Acento dorado | Dorado cálido | `#D4AF7D` |
| CTA / énfasis | Terracota | `#C87137` |
| Texto | Gris cálido | `#6B5B4E` |
| Acento secundario | Turquesa mediterráneo | `#2A9D8F` |

El turquesa se usa como acento (separadores, hover states, sección propuesta de valor) — no como color dominante.

---

## Tipografía

- **Headers (H1, H2, H3):** Playfair Display (serif elegante) — en dorado cálido
- **Body:** Poppins (moderno, legible) — en gris cálido
- **CTAs:** Poppins Bold — en terracota o crema según fondo

---

## Estructura de la Landing (de arriba a abajo)

### 1. Navbar
- Logo Delixef a la izquierda
- Links: Servicios, Reservar (a la derecha)
- **Transparente** sobre el Hero, se vuelve crema al hacer scroll
- Sin elementos innecesarios

### 2. Hero Section
- Fondo: video loop o foto de alta calidad (paella, mesa al atardecer)
- Overlay dorado al 20% de opacidad para calidez
- Tagline principal: `"Tu chef privado en Ibiza"` — Playfair Display, blanco crema, grande
- Subtítulo: `"Experiencias gastronómicas únicas para momentos que no se olvidan"` — Poppins, más pequeño
- **Un solo CTA:** botón `"Reservar mi experiencia →"` en terracota
- Animación de entrada: texto y CTA aparecen con fade-in suave al cargar
- Flecha scroll suave al fondo

### 3. Galería de Trabajos
- Título: `"Nuestro trabajo habla por sí solo"`
- Grid Masonry (tamaños variables: algunas imágenes grandes, otras pequeñas)
- Categorías filtrables: Bodas | Eventos | Catering | Menús
- Hover effect: imagen escala al 105% + label aparece con overlay oscuro
- Animación staggered al entrar en viewport (aparecen una a una)
- Esquinas redondeadas (8px), sombra suave
- Botón `"Ver más"` al final

### 4. Sobre el Chef
- Layout: imagen a la izquierda, texto a la derecha (alternado en mobile)
- Foto natural y auténtica del chef (no posada)
- Texto en primera persona, tono cálido y personal
- 3 datos clave debajo del texto con iconos:
  - 🍴 Años en Ibiza
  - 🌊 Especialidad gastronómica
  - ⭐ Número de eventos realizados
- Fondo: crema con textura sutil de papel/lino

### 5. Propuesta de Valor
- Título: `"¿Por qué elegir a Delixef?"`
- 3 cards en fila:
  1. **Menús personalizados** — adaptados a los gustos del cliente
  2. **Servicio completo** — desde la compra hasta la limpieza
  3. **Producto local** — mercados locales, temporada, kilómetro 0
- Cards: fondo crema, borde dorado sutil, icono elegante, título, descripción corta
- Fondo de sección: turquesa al 5-8% de opacidad (acento mediterráneo)
- Animación de entrada al scroll

### 6. Testimonios
- Título: `"Lo que dicen nuestros clientes"`
- Carousel con auto-play suave (3 testimonios en desktop, 1 en mobile)
- Cada card: estrellas en dorado, texto entrecomillado, nombre + contexto del evento
- Borde izquierdo en terracota, comillas grandes decorativas
- Debajo: logos de prensa (Bodas.net, Conde Nast, Diario de Ibiza, etc.) en gris
- Fondo: crema oscuro (`#F2EDE4`) para diferenciar sección

### 7. CTA Final
- Imagen de fondo emocional (mesa al atardecer, ambiente íntimo) con overlay terracota suave
- Título: `"¿Listo para tu experiencia?"`
- Subtítulo: `"Cuéntanos qué tienes en mente y creamos algo especial para ti"`
- Botón grande: `"Reservar mi experiencia →"` — crema sobre fondo oscuro
- Un solo CTA, sin fricción

### 8. Footer
- Logo + descripción corta a la izquierda
- Links: Servicios, Reservar, Contacto
- Instagram (@delixef.ibiza) prominente
- Email de contacto
- Copyright minimalista
- Fondo oscuro cálido (gris marrón `#3D3028`)

---

## Animaciones y Transiciones

- **Fade-in staggered** al entrar en viewport (Intersection Observer)
- **Hover suave** en botones (escala 1.02, sombra)
- **Navbar** con transición de transparente a opaco al scroll
- **Carousel** con swipe en mobile y auto-play suave
- **Galería** con filtro animado (fade entre categorías)
- Sin animaciones exageradas — todo sutil y elegante

---

## Responsive

- **Desktop:** Layout completo, galería 3 columnas, hero full viewport
- **Tablet:** Galería 2 columnas, texto reducido
- **Mobile:** Todo en columna única, hero con imagen estática (no video), CTA siempre visible

---

## Componentes a Crear/Modificar

1. `components/Navbar.tsx` — rediseño transparente/opaco con scroll
2. `components/Hero.tsx` — nuevo con video/imagen, overlay y animación
3. `components/Gallery.tsx` — grid masonry con filtros
4. `components/ChefBio.tsx` — sección sobre el chef
5. `components/ValueProps.tsx` — 3 pilares con cards
6. `components/Testimonials.tsx` — carousel de testimonios
7. `components/CtaBanner.tsx` — CTA final con imagen de fondo
8. `components/Footer.tsx` — rediseño minimalista
9. `app/page.tsx` — ensambla todos los componentes
10. `styles/globals.css` — variables CSS nuevas (paleta, tipografía)

---

## Fuera de Scope

- Páginas de Servicios, Reservar y Admin (fase 2 usando estos componentes como base)
- Cambios en lógica de backend o APIs
- Integración de nuevo CMS o imágenes (se usan las actuales + Unsplash temporalmente)
