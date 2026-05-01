# Guía de Contribución

## Flujo de Trabajo

1. **Fork** el repositorio
2. **Clone** tu fork: `git clone https://github.com/tu-usuario/delixef.git`
3. **Crear rama** para tu feature: `git checkout -b feature/nombre-feature`
4. **Hacer cambios** y commits descriptivos
5. **Push** a tu fork
6. **Pull Request** al repositorio principal

## Convenciones de Commits

Usar el siguiente formato:

```
type(scope): subject

body (opcional)
```

### Tipos válidos:
- `feat`: Nueva característica
- `fix`: Corrección de bug
- `docs`: Cambios en documentación
- `style`: Cambios de formato (sin cambios lógicos)
- `refactor`: Refactorización de código
- `test`: Agregar o actualizar tests
- `chore`: Cambios en dependencias o configuración

### Ejemplos:
```
feat(reservas): agregar validación de fecha
fix(admin): corregir error en listado de menús
docs(setup): actualizar instrucciones de instalación
```

## Estándares de Código

- Usar TypeScript (sin `any`)
- Nombrar variables en inglés
- Componentes React en PascalCase
- Funciones y variables en camelCase
- Máximo 80 caracteres por línea (flexible para URLs)
- Agregar comentarios solo cuando sea necesario

## Testing

Antes de hacer push:
```bash
npm run build      # Verificar que compila
npm run lint       # Verificar estilos
```

## Pull Requests

### Descripción obligatoria:
- ¿Qué cambios hace?
- ¿Por qué son necesarios?
- ¿Hay breaking changes?

### Checklist:
- [ ] Código compila sin errores
- [ ] Sin console.log() o debugger
- [ ] Commits con mensajes descriptivos
- [ ] .env.local no es incluido
- [ ] README actualizado si aplica

## Estructura de Ramas

- `main`: Código en producción
- `develop`: Rama de desarrollo
- `feature/*`: Nuevas características
- `fix/*`: Correcciones de bugs
- `docs/*`: Cambios de documentación

## Requisitos para Merge

- Build de GitHub Actions pasa
- Mínimo 1 review aprobado
- No hay conflictos con main
- Commits squashed (1 commit por feature)

## Preguntas o Dudas

Abrir un Issue o contactar al equipo de desarrollo.

---

¡Gracias por contribuir a Delixef!
