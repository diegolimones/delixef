import type { Metadata } from 'next';
import ReservationForm from '@/components/ReservationForm';

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
      {/* Header */}
      <section className="bg-cream-50">
        <div className="max-w-editorial mx-auto px-6 md:px-10 pt-12 md:pt-20 pb-16 md:pb-20">
          <div className="flex items-center justify-between mb-12 md:mb-20">
            <span className="eyebrow text-ink-mute">N°02 · Reservas</span>
            <span className="eyebrow text-ink-mute hidden md:inline">04 pasos</span>
          </div>

          <div className="grid grid-cols-12 gap-y-8">
            <h1 className="col-span-12 lg:col-span-10 font-display font-light text-display-lg text-ink leading-[0.98]">
              Cuéntanos cómo
              <br />
              <span className="italic text-sea-600">imaginas tu evento</span>.
            </h1>
            <p className="col-span-12 md:col-span-8 md:col-start-5 lg:col-span-5 lg:col-start-8 mt-4 md:mt-8 text-lg text-ink-soft font-light leading-relaxed">
              Cuatro pasos cortos. Tipo de evento, fecha, número de invitados y contacto. Te respondemos con una propuesta de menú y presupuesto en menos de 24 horas.
            </p>
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
