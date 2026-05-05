import type { Metadata } from 'next';
import Image from 'next/image';
import ReservationForm from '@/components/ReservationForm';

const heroImage =
  'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1600&q=85&auto=format&fit=crop';

export const metadata: Metadata = {
  title: 'Reservar | Delixef',
  description: 'Reserva tu experiencia gastronómica con nuestro chef privado en Ibiza. Elige tu servicio, fecha y personaliza tu menú.',
  openGraph: {
    title: 'Reservar | Delixef',
    description: 'Crea tu reserva personalizada en Delixef',
    type: 'website',
  },
};

export default function Reservar() {
  return (
    <>
      {/* HERO — cinematic */}
      <section className="relative -mt-20 md:-mt-24">
        <div className="relative h-[72vh] min-h-[500px] max-h-[760px] overflow-hidden">
          <div className="absolute inset-0 hero-breathe">
            <Image
              src={heroImage}
              alt="Mesa elegante lista para una cena privada en Ibiza"
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          </div>

          {/* Gradient overlay */}
          <div
            aria-hidden="true"
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(180deg, oklch(0.13 0.05 232 / 0.50) 0%, oklch(0.13 0.05 232 / 0.20) 35%, oklch(0.13 0.05 232 / 0.40) 75%, oklch(0.13 0.05 232 / 0.80) 100%)',
            }}
          />

          {/* Animated waves */}
          <div
            aria-hidden="true"
            className="absolute bottom-0 left-0 right-0 h-24 md:h-32 overflow-hidden pointer-events-none"
          >
            <svg
              className="absolute bottom-0 left-0 wave-animate-slow text-sand-50/20"
              style={{ width: '200%', height: '100%' }}
              viewBox="0 0 2880 160"
              preserveAspectRatio="none"
            >
              <path d="M0,80 Q360,30 720,80 T1440,80 T2160,80 T2880,80 L2880,160 L0,160 Z" fill="currentColor" />
            </svg>
            <svg
              className="absolute bottom-0 left-0 wave-animate text-sand-50/30"
              style={{ width: '200%', height: '100%' }}
              viewBox="0 0 2880 160"
              preserveAspectRatio="none"
            >
              <path d="M0,110 Q360,70 720,110 T1440,110 T2160,110 T2880,110 L2880,160 L0,160 Z" fill="currentColor" />
            </svg>
            <svg
              className="absolute bottom-0 left-0 wave-animate-reverse text-sand-50"
              style={{ width: '200%', height: '100%' }}
              viewBox="0 0 2880 160"
              preserveAspectRatio="none"
            >
              <path d="M0,140 Q360,115 720,140 T1440,140 T2160,140 T2880,140 L2880,160 L0,160 Z" fill="currentColor" />
            </svg>
          </div>

          {/* Edition mark */}
          <div className="absolute top-24 md:top-28 inset-x-0 z-10">
            <div className="max-w-editorial mx-auto px-6 md:px-10">
              <div className="flex items-center justify-between fade-up fade-up-1">
                <span className="eyebrow text-sand-50/95">N°03 · Reservas</span>
                <span className="eyebrow text-sand-50/85 hidden md:inline tabular-nums">04 pasos</span>
              </div>
            </div>
          </div>

          {/* Headline */}
          <div className="absolute inset-0 flex items-center z-10">
            <div className="max-w-editorial mx-auto px-6 md:px-10 w-full">
              <h1 className="font-display font-light text-display-xl text-sand-50 leading-[0.88]">
                <span className="block fade-up fade-up-2">Cuéntanos cómo</span>
                <span className="block italic font-normal text-coral-400 fade-up fade-up-3">
                  imaginas tu evento
                </span>
              </h1>
              <div className="mt-8 md:mt-10 max-w-md fade-up fade-up-5">
                <p className="text-base md:text-lg text-sand-50/90 font-light leading-relaxed">
                  Cuatro pasos cortos. Te respondemos con propuesta de menú y presupuesto en menos de 24 horas.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="bg-cream-100 border-y border-olive-200/40 py-16 md:py-24">
        <div className="max-w-editorial mx-auto px-6 md:px-10">
          <div className="max-w-3xl mx-auto bg-cream-50 border border-olive-200/60 p-6 md:p-12">
            <ReservationForm />
          </div>
        </div>
      </section>

      {/* What happens next */}
      <section className="bg-cream-50 py-20 md:py-28">
        <div className="max-w-editorial mx-auto px-6 md:px-10">
          <div className="grid grid-cols-12 gap-y-12 gap-x-8">
            <div className="col-span-12 md:col-span-4">
              <span className="eyebrow text-terracotta-600 block mb-4">— Después</span>
              <h2 className="font-display text-3xl md:text-4xl font-light text-ink leading-tight">
                Lo que pasa <span className="italic text-olive-800">después</span> del envío.
              </h2>
            </div>
            <div className="col-span-12 md:col-span-8">
              <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-olive-200/60">
                <div className="md:pr-6 pb-6 md:pb-0">
                  <span className="font-display text-3xl text-terracotta-600 font-light">I.</span>
                  <h3 className="mt-3 font-display text-xl text-ink">Confirmación</h3>
                  <p className="mt-2 text-ink-soft font-light leading-relaxed">
                    Recibes un correo automático con los datos de tu solicitud.
                  </p>
                </div>
                <div className="md:px-6 py-6 md:py-0">
                  <span className="font-display text-3xl text-terracotta-600 font-light">II.</span>
                  <h3 className="mt-3 font-display text-xl text-ink">Llamada</h3>
                  <p className="mt-2 text-ink-soft font-light leading-relaxed">
                    Te llamamos en menos de 24 h para afinar el menú y los detalles.
                  </p>
                </div>
                <div className="md:pl-6 pt-6 md:pt-0">
                  <span className="font-display text-3xl text-terracotta-600 font-light">III.</span>
                  <h3 className="mt-3 font-display text-xl text-ink">Menú a medida</h3>
                  <p className="mt-2 text-ink-soft font-light leading-relaxed">
                    Te enviamos la propuesta final, sin compromiso, antes de cobrar.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
