import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contacto | Delixef - Chef Privado en Ibiza',
  description: 'Ponte en contacto con nosotros. Teléfono, email, horarios y formulario de contacto para Delixef chef privado en Ibiza.',
  openGraph: {
    title: 'Contacto | Delixef',
    description: 'Contáctanos para reservar tu experiencia gastronómica',
    type: 'website',
  },
};

export default function ContactoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
