import type { Metadata } from 'next';
import Script from 'next/script';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: 'Delixef - Chef Privado en Ibiza | Experiencias Gastronómicas Exclusivas',
  description: 'Delixef ofrece servicios de chef privado en Ibiza. Menús personalizados, desayunos, comidas, cenas y eventos especiales con experiencia gastronómica de lujo.',
  keywords: 'chef privado Ibiza, catering privado, menú personalizado, desayuno, comida, cena, eventos gastronómicos, chef personal',
  authors: [{ name: 'Delixef' }],
  creator: 'Delixef',
  publisher: 'Delixef',
  formatDetection: {
    email: true,
    telephone: true,
  },
  viewport: 'width=device-width, initial-scale=1.0',
  robots: 'index, follow',
  openGraph: {
    title: 'Delixef - Chef Privado en Ibiza',
    description: 'Experimenta lujo minimalista con warmth gourmet. Menús personalizados diseñados para cada ocasión.',
    type: 'website',
    locale: 'es_ES',
    url: 'https://delixef.com',
    siteName: 'Delixef - Chef Privado en Ibiza',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Delixef - Chef Privado en Ibiza',
    description: 'Experiencias gastronómicas exclusivas con nuestro chef privado',
  },
  alternates: {
    canonical: 'https://delixef.com',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Delixef',
    description: 'Chef Privado en Ibiza',
    url: 'https://delixef.com',
    telephone: '+34XXXXXXXXX',
    email: 'info@delixef.com',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Ibiza',
      addressRegion: 'Islas Baleares',
      addressCountry: 'ES',
    },
    sameAs: [
      'https://instagram.com/delixef',
      'https://facebook.com/delixef',
    ],
    image: 'https://delixef.com/logo.png',
  };

  return (
    <html lang="es">
      <head>
        <Script
          id="organization-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
          strategy="afterInteractive"
        />
      </head>
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
