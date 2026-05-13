import Image from 'next/image';
import Link from 'next/link';
import Gallery, { GalleryItem } from '../components/Gallery';
import ChefBio from '../components/ChefBio';
import ValueProps from '../components/ValueProps';
import Testimonials, { TestimonialItem } from '../components/Testimonials';

const galeria: GalleryItem[] = [
  { src: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=900&q=85&auto=format&fit=crop', label: 'Paella valenciana', category: 'Arroces' },
  { src: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=900&q=85&auto=format&fit=crop', label: 'Cena íntima', category: 'Eventos' },
  { src: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=900&q=85&auto=format&fit=crop', label: 'Boda en villa', category: 'Bodas' },
  { src: 'https://images.unsplash.com/photo-1555244162-803834f70033?w=900&q=85&auto=format&fit=crop', label: 'Catering eventos', category: 'Catering' },
  { src: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=900&q=85&auto=format&fit=crop', label: 'Barra libre', category: 'Bodas' },
  { src: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=900&q=85&auto=format&fit=crop', label: 'Arroz negro', category: 'Arroces' },
];

const testimonios: TestimonialItem[] = [
  {
    name: 'Sarah & Tom',
    context: 'Boda en Villa, Ibiza 2024',
    text: 'Contratar a Delixef fue lo mejor que hicimos para nuestra boda. Los invitados aún hablan de ello. La paella fue espectacular.',
    stars: 5,
  },
  {
    name: 'Carlos Martínez',
    context: 'Cena de aniversario privada, 2024',
    text: 'Una experiencia que no olvidaremos. El menú fue perfecto, el servicio impecable y la atención al detalle increíble.',
    stars: 5,
  },
  {
    name: 'The Johnson Family',
    context: 'Alquiler vacacional, verano 2024',
    text: 'Tres semanas con Delixef cocinando para nosotros. Cada día una sorpresa. El mejor recuerdo de nuestras vacaciones.',
    stars: 5,
  },
];

export default function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1920&q=90&auto=format&fit=crop"
          alt="Mesa al atardecer en Ibiza"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/60 via-ink/40 to-ink/70" />
        <div className="absolute inset-0 bg-amber-900/20" />

        <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
          <h1 className="font-display font-light text-5xl md:text-7xl text-sand-50 leading-[1.05] mb-6">
            Tu chef privado<br />
            <span className="italic text-gold-300">en Ibiza</span>
          </h1>
          <p className="text-sand-100/80 text-lg md:text-xl font-light leading-relaxed mb-10 max-w-xl mx-auto">
            Experiencias gastronómicas únicas para momentos que no se olvidan
          </p>
          <Link
            href="/reservar"
            className="inline-block bg-amber-500 hover:bg-amber-400 text-white px-10 py-4 rounded-full text-sm tracking-widest uppercase transition-all duration-300 hover:scale-105 hover:shadow-xl"
          >
            Reservar mi experiencia →
          </Link>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
          <div className="w-px h-8 bg-sand-50/40" />
          <span className="text-xs tracking-widest uppercase text-sand-50/40">Scroll</span>
        </div>
      </section>

      <Gallery items={galeria} />
      <ChefBio />
      <ValueProps />
      <Testimonials items={testimonios} />

      {/* CTA FINAL */}
      <section className="relative py-32 md:py-48 overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1559339352-11d035aa65de?w=1920&q=85&auto=format&fit=crop"
          alt="Mesa preparada al atardecer"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-amber-900/80 to-ink/70" />

        <div className="relative z-10 text-center px-6 max-w-2xl mx-auto">
          <h2 className="font-display font-light text-4xl md:text-6xl text-sand-50 leading-tight mb-6">
            ¿Listo para tu<br />
            <span className="italic text-gold-300">experiencia?</span>
          </h2>
          <p className="text-sand-100/70 text-lg font-light mb-10">
            Cuéntanos qué tienes en mente y creamos algo especial para ti
          </p>
          <Link
            href="/reservar"
            className="inline-block border-2 border-sand-50 text-sand-50 hover:bg-sand-50 hover:text-ink px-10 py-4 rounded-full text-sm tracking-widest uppercase transition-all duration-300"
          >
            Reservar mi experiencia →
          </Link>
        </div>
      </section>
    </>
  );
}
