# Guía de Testing para Delixef

## Configuración

El proyecto utiliza **Jest** y **React Testing Library** para realizar tests.

### Dependencias
- `jest` - Framework de testing
- `@testing-library/react` - Utilidades para testing de componentes React
- `@testing-library/jest-dom` - Matchers personalizados para Jest
- `jest-environment-jsdom` - Entorno DOM para tests

## Estructura de Tests

Los tests se organizan en el directorio `__tests__/` espejando la estructura del proyecto:

```
__tests__/
├── components/
│   ├── Button.test.tsx
│   ├── Card.test.tsx
│   └── Container.test.tsx
├── lib/
│   └── utils.test.ts
└── api/
    └── (para tests de API routes)
```

## Ejecutar Tests

```bash
# Ejecutar todos los tests
npm test

# Modo watch (vuelve a ejecutar al detectar cambios)
npm test -- --watch

# Tests de un archivo específico
npm test -- Button.test.tsx

# Con coverage
npm test -- --coverage
```

## Escribir Nuevos Tests

### Test de Componentes

```typescript
import React from 'react';
import { render, screen } from '@testing-library/react';
import MyComponent from '@/components/MyComponent';

describe('MyComponent', () => {
  it('renders correctly', () => {
    render(<MyComponent />);
    expect(screen.getByText('Expected text')).toBeInTheDocument();
  });

  it('handles user interaction', () => {
    render(<MyComponent />);
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(screen.getByText('After click')).toBeInTheDocument();
  });
});
```

### Test de Utilities

```typescript
describe('Utility Function', () => {
  it('formats price correctly', () => {
    const result = formatPrice(45.5);
    expect(result).toBe('€45.50');
  });
});
```

## Matchers Útiles

```typescript
// Elemento en el documento
expect(element).toBeInTheDocument();

// Visibilidad
expect(element).toBeVisible();

// Clases CSS
expect(element).toHaveClass('button-primary');

// Atributos
expect(element).toHaveAttribute('type', 'submit');

// Disabled
expect(element).toBeDisabled();

// Contenido
expect(element).toHaveTextContent('Click me');
```

## Testing de Formularios

```typescript
import { fireEvent } from '@testing-library/react';

it('handles form submission', () => {
  render(<ContactForm />);
  
  const input = screen.getByPlaceholderText('Email');
  const button = screen.getByRole('button', { name: /submit/i });
  
  fireEvent.change(input, { target: { value: 'test@example.com' } });
  fireEvent.click(button);
  
  expect(screen.getByText('Success')).toBeInTheDocument();
});
```

## Testing de Componentes con Props

```typescript
it('renders with different props', () => {
  const { rerender } = render(<Button variant="primary">Click</Button>);
  expect(screen.getByRole('button')).toHaveClass('bg-gold');
  
  rerender(<Button variant="secondary">Click</Button>);
  expect(screen.getByRole('button')).toHaveClass('bg-terracotta');
});
```

## Testing Asincrónico

```typescript
import { waitFor } from '@testing-library/react';

it('loads data asynchronously', async () => {
  render(<DataFetcher />);
  
  await waitFor(() => {
    expect(screen.getByText('Data loaded')).toBeInTheDocument();
  });
});
```

## Buenas Prácticas

1. **Test de comportamiento, no de implementación**: Testa qué hace el componente, no cómo lo hace
2. **Nombres descriptivos**: Los nombres de los tests deben explicar qué prueban
3. **Arrange-Act-Assert**: Estructura clara en cada test
4. **Evitar detalles internos**: No testes detalles de implementación internos
5. **Reutilizar código**: Crea funciones helper para setup común

## Tests Existentes

### Components
- **Button.test.tsx**: Tests de variantes, tamaños, estados deshabilitados
- **Card.test.tsx**: Tests de estilos, efecto hover, clases personalizadas
- **Container.test.tsx**: Tests de layout y responsive

### Utilities
- **utils.test.ts**: Tests de funciones de fecha, precio, validación, arrays

## Coverage

Para ver el coverage de los tests:

```bash
npm test -- --coverage
```

Genera un reporte en `coverage/` con información detallada de qué código está siendo testeado.

Objetivo de coverage:
- Statements: > 70%
- Branches: > 60%
- Functions: > 70%
- Lines: > 70%

## Testing en CI/CD

Los tests se ejecutan automáticamente:
1. Antes de hacer push (con pre-commit hooks si está configurado)
2. En el servidor de integración continua antes del deployment

Para el deployment en Vercel, los tests se ejecutan como parte del build process.

## Debugging de Tests

```bash
# Debug mode
node --inspect-brk node_modules/.bin/jest --runInBand

# Verbose output
npm test -- --verbose
```

## Limitaciones Actuales

- Los tests de API routes no están completamente configurados (requiere mocking de NextRequest)
- Tests de autenticación requieren mock de NextAuth

Estas limitaciones pueden ser implementadas en futuras iteraciones.
