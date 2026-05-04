import type { Metadata } from 'next';
import Script from 'next/script';
import { Fraunces, Manrope } from 'next/font/google';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import '@/styles/globals.css';

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  display: 'swap',
  axes: ['SOFT', 'WONK', 'opsz'],
});

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Delixef — Chef Privado en Ibiza | Experiencias Gastronómicas',
  description: 'Chef privado en Ibiza. Menús personalizados, desayunos, comidas, cenas y eventos diseñados con producto local y técnica de alta cocina.',
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
    title: 'Delixef — Chef Privado en Ibiza',
    description: 'Cocina mediterránea editorial. Menús diseñados a medida para tu casa, villa o evento en Ibiza.',
    type: 'website',
    locale: 'es_ES',
    url: 'https://delixef.com',
    siteName: 'Delixef',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Delixef — Chef Privado en Ibiza',
    description: 'Cocina mediterránea editorial diseñada a medida.',
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
    <html lang="es" className={`${fraunces.variable} ${manrope.variable}`}>
      <head>
        <Script
          id="organization-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
          strategy="afterInteractive"
        />
      </head>
      <body className="font-body bg-sand-50 text-ink flex flex-col min-h-screen antialiased">
        <Header />
        <main className="flex-1 pt-20 md:pt-24">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
