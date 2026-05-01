import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
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
      <body className="font-inter flex flex-col min-h-screen">
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
