'use client';

import { useState } from 'react';
import Container from '@/components/Container';
import Card from '@/components/Card';
import Button from '@/components/Button';

export default function Contacto() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/contacto', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: '',
        });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-slate-900 to-slate-800 text-white">
        <Container className="text-center">
          <h1 className="font-playfair text-5xl md:text-6xl mb-4">Contacto</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            ¿Tienes preguntas? Nos encantaría escucharte. Ponte en contacto con nosotros.
          </p>
        </Container>
      </section>

      {/* Contact Section */}
      <section className="py-24 bg-white">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="font-playfair text-3xl mb-8">Envíanos un Mensaje</h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                {submitStatus === 'success' && (
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-800">
                    ¡Mensaje enviado exitosamente! Te responderemos pronto.
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">
                    Error al enviar el mensaje. Por favor, intenta de nuevo.
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Tu nombre"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-gold"
                  />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Tu email"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-gold"
                  />
                </div>

                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Tu teléfono"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-gold"
                />

                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-gold"
                >
                  <option value="">Selecciona un asunto</option>
                  <option value="reserva">Pregunta sobre reserva</option>
                  <option value="menu">Personalización de menú</option>
                  <option value="evento">Evento especial</option>
                  <option value="feedback">Feedback</option>
                  <option value="otro">Otro</option>
                </select>

                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Tu mensaje..."
                  required
                  rows={5}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-gold"
                />

                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  disabled={isSubmitting}
                  className="w-full"
                >
                  {isSubmitting ? 'Enviando...' : 'Enviar Mensaje'}
                </Button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h2 className="font-playfair text-3xl mb-8">Información de Contacto</h2>
              </div>

              <Card className="bg-gold bg-opacity-10 border-gold">
                <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  📞 Teléfono
                </h3>
                <a
                  href="tel:+34XXXXXXXXX"
                  className="text-lg text-gold hover:text-terracotta transition font-semibold"
                >
                  +34 XXX XXX XXX
                </a>
                <p className="text-sm text-gray-600 mt-2">Disponible de 9:00 a 20:00</p>
              </Card>

              <Card className="bg-terracotta bg-opacity-10 border-terracotta">
                <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  ✉️ Email
                </h3>
                <a
                  href="mailto:info@delixef.com"
                  className="text-lg text-terracotta hover:text-gold transition font-semibold"
                >
                  info@delixef.com
                </a>
                <p className="text-sm text-gray-600 mt-2">
                  Te responderemos en menos de 24 horas
                </p>
              </Card>

              <Card className="bg-blue-50 border-blue-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  📍 Ubicación
                </h3>
                <p className="text-lg font-semibold text-gray-900">Ibiza, España</p>
                <p className="text-sm text-gray-600 mt-2">
                  Servimos en toda la isla. Viajamos a tu ubicación.
                </p>
              </Card>

              <Card className="bg-purple-50 border-purple-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  ⏰ Horario de Atención
                </h3>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li>
                    <strong>Lunes - Viernes:</strong> 09:00 - 20:00
                  </li>
                  <li>
                    <strong>Sábado:</strong> 10:00 - 18:00
                  </li>
                  <li>
                    <strong>Domingo:</strong> Bajo solicitud
                  </li>
                </ul>
              </Card>

              {/* Social Media */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Síguenos</h3>
                <div className="flex gap-4">
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-gold text-white rounded-full flex items-center justify-center hover:opacity-90 transition"
                  >
                    📷
                  </a>
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-gold text-white rounded-full flex items-center justify-center hover:opacity-90 transition"
                  >
                    f
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-gray-50">
        <Container>
          <div className="max-w-3xl mx-auto">
            <h2 className="font-playfair text-4xl text-center mb-12">Preguntas Frecuentes</h2>

            <div className="space-y-6">
              {[
                {
                  question: '¿Cuál es el tiempo mínimo para reservar?',
                  answer:
                    'Recomendamos realizar la reserva con al menos 48 horas de anticipación. Para eventos especiales, es mejor hacerlo con más tiempo.',
                },
                {
                  question: '¿Puedo cambiar mi menú después de reservar?',
                  answer:
                    'Sí, siempre que sea con al menos 24 horas de anticipación. Contáctanos para discutir los cambios.',
                },
                {
                  question: '¿Ofrecen opciones veganas/sin gluten?',
                  answer:
                    'Por supuesto. Podemos adaptarnos a cualquier restricción dietética. Indícalas al momento de la reserva.',
                },
                {
                  question: '¿Cuál es la capacidad máxima?',
                  answer:
                    'Trabajamos con grupos desde 1 hasta 20 personas. Para grupos más grandes, contáctanos directamente.',
                },
              ].map((faq, index) => (
                <Card key={index}>
                  <h3 className="font-semibold text-lg text-gray-900 mb-3">{faq.question}</h3>
                  <p className="text-gray-600">{faq.answer}</p>
                </Card>
              ))}
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
