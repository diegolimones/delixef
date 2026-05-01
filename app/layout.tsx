import type { Metadata } from 'next';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: 'Delixef - Chef Privado en Ibiza',
  description: 'Disfruta de experiencias gastronómicas exclusivas con nuestro chef privado en Ibiza',
  openGraph: {
    title: 'Delixef - Chef Privado en Ibiza',
    description: 'Disfruta de experiencias gastronómicas exclusivas con nuestro chef privado en Ibiza',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="font-inter">
        {children}
      </body>
    </html>
  );
}
