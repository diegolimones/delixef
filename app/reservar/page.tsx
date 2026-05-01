'use client';

import Container from '@/components/Container';
import ReservationForm from '@/components/ReservationForm';

export default function Reservar() {
  return (
    <>
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-slate-900 to-slate-800 text-white">
        <Container className="text-center">
          <h1 className="font-playfair text-5xl md:text-6xl mb-4">Realiza tu Reserva</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Completa el formulario en 4 pasos para confirmar tu experiencia gastronómica
          </p>
        </Container>
      </section>

      {/* Form Section */}
      <section className="py-16 bg-white">
        <Container>
          <div className="max-w-2xl mx-auto">
            <ReservationForm />
          </div>
        </Container>
      </section>

      {/* Info Section */}
      <section className="py-16 bg-gray-50">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl mb-4">✉️</div>
              <h3 className="font-semibold text-lg mb-2">Confirmación por Email</h3>
              <p className="text-gray-600">
                Recibirás un email de confirmación en el plazo de 24 horas
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">📅</div>
              <h3 className="font-semibold text-lg mb-2">Sincronización Automática</h3>
              <p className="text-gray-600">
                Tu reserva se sincroniza automáticamente con nuestro calendario
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">💬</div>
              <h3 className="font-semibold text-lg mb-2">Personalización</h3>
              <p className="text-gray-600">
                Podemos personalizar tu menú según tus preferencias
              </p>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
