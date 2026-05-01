import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Catálogo de Menús | Delixef - Chef Privado en Ibiza',
  description: 'Explora nuestro catálogo completo de menús personalizados. Desayunos, comidas, cenas y menús para eventos especiales.',
  openGraph: {
    title: 'Catálogo de Menús | Delixef',
    description: 'Descubre nuestros deliciosos menús',
    type: 'website',
  },
};

export default function CatalogoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
