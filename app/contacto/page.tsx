'use client';

import { useState } from 'react';
import Image from 'next/image';
import { trackContact } from '@/lib/analytics';

const heroImage =
  'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=1600&q=85&auto=format&fit=crop';

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
        trackContact(formData.subject);
        setSubmitStatus('success');
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass =
    'w-full px-0 py-4 border-0 border-b border-sea-200 bg-transparent text-ink placeholder:text-ink-mute focus:outline-none focus:border-ink transition-colors font-light';

  const faqs = [
    {
      question: '¿Cuál es el tiempo mínimo para reservar?',
      answer:
        'Para bodas y eventos grandes, recomendamos al menos 3 meses para diseñar bien la propuesta. Para cenas en villa o servicios pequeños, 48 horas es suficiente.',
    },
    {
      question: '¿Puedo cambiar mi menú después de reservar?',
      answer:
        'Sí, hasta 5 días antes para bodas y 24 h para servicios privados. Después de la compra de producto, los cambios complejos pueden tener coste.',
    },
    {
      question: '¿Ofrecen opciones veganas, vegetarianas o sin gluten?',
      answer:
        'Por defecto. Adaptamos cualquier restricción dietética sin recargo. Indícalas al hacer la solicitud y las incluimos en el menú.',
    },
    {
      question: '¿Cuál es la capacidad?',
      answer:
        'De 2 a 200 invitados. Bodas y eventos grandes: hasta 200. Cenas privadas: a partir de 2 personas. Para grupos mayores, escríbenos: lo coordinamos con un equipo ampliado.',
    },
    {
      question: '¿Trabajáis en toda Ibiza?',
      answer:
        'Sí. Operamos desde Santa Gertrudis y nos desplazamos a cualquier punto de la isla con el equipo completo: villas, fincas, calas, espacios privados.',
    },
  ];

  return (
    <>
      {/* HERO — cinematic with calm sea image */}
      <section className="relative -mt-20 md:-mt-24">
        <div className="relative h-[68vh] min-h-[480px] max-h-[720px] overflow-hidden">
          <div className="absolute inset-0 hero-breathe">
            <Image
              src={heroImage}
              alt="Mar Mediterráneo en calma al atardecer en Ibiza"
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          </div>

          <div
            aria-hidden="true"
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(180deg, oklch(0.13 0.05 232 / 0.45) 0%, oklch(0.13 0.05 232 / 0.20) 35%, oklch(0.13 0.05 232 / 0.40) 75%, oklch(0.13 0.05 232 / 0.85) 100%)',
            }}
          />

          {/* Animated waves */}
          <div
            aria-hidden="true"
            className="absolute bottom-0 left-0 right-0 h-24 md:h-32 overflow-hidden pointer-events-none"
          >
            <svg className="absolute bottom-0 left-0 wave-animate-slow text-sand-50/20" style={{ width: '200%', height: '100%' }} viewBox="0 0 2880 160" preserveAspectRatio="none">
              <path d="M0,80 Q360,30 720,80 T1440,80 T2160,80 T2880,80 L2880,160 L0,160 Z" fill="currentColor" />
            </svg>
            <svg className="absolute bottom-0 left-0 wave-animate text-sand-50/30" style={{ width: '200%', height: '100%' }} viewBox="0 0 2880 160" preserveAspectRatio="none">
              <path d="M0,110 Q360,70 720,110 T1440,110 T2160,110 T2880,110 L2880,160 L0,160 Z" fill="currentColor" />
            </svg>
            <svg className="absolute bottom-0 left-0 wave-animate-reverse text-sand-50" style={{ width: '200%', height: '100%' }} viewBox="0 0 2880 160" preserveAspectRatio="none">
              <path d="M0,140 Q360,115 720,140 T1440,140 T2160,140 T2880,140 L2880,160 L0,160 Z" fill="currentColor" />
            </svg>
          </div>

          {/* Edition mark */}
          <div className="absolute top-24 md:top-28 inset-x-0 z-10">
            <div className="max-w-editorial mx-auto px-6 md:px-10">
              <div className="flex items-center justify-between fade-up fade-up-1">
                <span className="eyebrow text-sand-50/95">N°04 · Contacto</span>
                <span className="eyebrow text-sand-50/85 hidden md:inline tabular-nums">
                  Respuesta en 24 h
                </span>
              </div>
            </div>
          </div>

          {/* Headline */}
          <div className="absolute inset-0 flex items-center z-10">
            <div className="max-w-editorial mx-auto px-6 md:px-10 w-full">
              <h1 className="font-display font-light text-display-xl text-sand-50 leading-[0.88]">
                <span className="block fade-up fade-up-2">Háblanos de</span>
                <span className="block italic font-normal text-coral-400 fade-up fade-up-3">
                  tu boda o evento
                </span>
                <span className="block fade-up fade-up-4">en Ibiza.</span>
              </h1>

              <div className="mt-8 md:mt-10 max-w-md fade-up fade-up-5">
                <p className="text-base md:text-lg text-sand-50/90 font-light leading-relaxed">
                  Para bodas, eventos exclusivos, prensa o cualquier idea: escríbenos. Te respondemos siempre.
                </p>
              </div>
            </div>
          </div>

          {/* Bottom caption */}
          <div className="absolute bottom-6 left-0 right-0 z-10">
            <div className="max-w-editorial mx-auto px-6 md:px-10 flex items-end justify-end fade-up fade-up-6">
              <div className="flex items-baseline gap-6">
                <span className="eyebrow text-sand-50/80">Santa Gertrudis</span>
                <span className="eyebrow text-sand-50/80 tabular-nums">38°54′N · 1°26′E</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact + Info */}
      <section className="bg-sand-100 border-y border-sea-200/40 py-20 md:py-28">
        <div className="max-w-editorial mx-auto px-6 md:px-10">
          <div className="grid grid-cols-12 gap-y-16 gap-x-10">
            {/* Form */}
            <div className="col-span-12 lg:col-span-7">
              <span className="eyebrow text-coral-600 block mb-6">— Mensaje</span>
              <h2 className="font-display text-3xl md:text-4xl font-light text-ink leading-tight mb-10">
                Escríbenos.
              </h2>

              <form onSubmit={handleSubmit} className="space-y-8">
                {submitStatus === 'success' && (
                  <div className="border border-sea-400 bg-sea-50 px-5 py-4 text-sea-800 font-light">
                    Mensaje enviado. Te respondemos pronto.
                  </div>
                )}
                {submitStatus === 'error' && (
                  <div className="border border-coral-500 bg-sand-50 px-5 py-4 text-coral-700 font-light">
                    No hemos podido enviar el mensaje. Intenta de nuevo.
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <label className="eyebrow text-ink-mute block mb-2">Nombre</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Tu nombre completo"
                      required
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className="eyebrow text-ink-mute block mb-2">Correo</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="tucorreo@ejemplo.com"
                      required
                      className={inputClass}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <label className="eyebrow text-ink-mute block mb-2">Teléfono (opcional)</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+34 ..."
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className="eyebrow text-ink-mute block mb-2">Asunto</label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className={`${inputClass} appearance-none bg-[length:14px] bg-no-repeat bg-[right_0.25rem_center]`}
                      style={{
                        backgroundImage:
                          'url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'%23555\' stroke-width=\'1.5\'><path d=\'M6 9l6 6 6-6\'/></svg>")',
                      }}
                    >
                      <option value="">Selecciona</option>
                      <option value="boda">Boda</option>
                      <option value="evento">Evento privado</option>
                      <option value="cena">Cena en villa</option>
                      <option value="arroces">Arroces / barras</option>
                      <option value="prensa">Prensa / colaboración</option>
                      <option value="otro">Otro</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="eyebrow text-ink-mute block mb-2">Mensaje</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Cuéntanos cuántos sois, qué celebráis, dónde y cuándo"
                    required
                    rows={5}
                    className={inputClass}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center justify-center bg-ink text-sand-50 px-8 py-4 text-xs font-semibold tracking-[0.22em] uppercase hover:bg-coral-600 transition-colors disabled:opacity-60"
                >
                  {isSubmitting ? 'Enviando...' : 'Enviar mensaje'}
                </button>
              </form>
            </div>

            {/* Info column */}
            <div className="col-span-12 lg:col-span-4 lg:col-start-9">
              <span className="eyebrow text-coral-600 block mb-6">— Directo</span>

              <div className="space-y-10">
                <div>
                  <span className="eyebrow text-ink-mute block mb-3">Correo</span>
                  <a
                    href="mailto:info@delixef.com"
                    className="font-display text-2xl md:text-3xl font-light text-ink hover:text-coral-600 transition-colors"
                  >
                    info@delixef.com
                  </a>
                  <p className="text-sm text-ink-mute mt-2 font-light">Respondemos en menos de 24 h.</p>
                </div>

                <div className="pt-10 border-t border-sea-200/60">
                  <span className="eyebrow text-ink-mute block mb-3">Teléfono</span>
                  <a
                    href="tel:+34XXXXXXXXX"
                    className="font-display text-2xl md:text-3xl font-light text-ink hover:text-coral-600 transition-colors"
                  >
                    +34 XXX XXX XXX
                  </a>
                  <p className="text-sm text-ink-mute mt-2 font-light">Lun–Vie · 09:00 a 20:00</p>
                </div>

                <div className="pt-10 border-t border-sea-200/60">
                  <span className="eyebrow text-ink-mute block mb-3">Ubicación</span>
                  <p className="font-display text-2xl font-light text-ink">
                    Santa Gertrudis
                  </p>
                  <p className="text-sm text-ink-mute mt-2 font-light">
                    Base de operaciones en Santa Gertrudis de Fruitera. Servicio en toda Ibiza: viajamos con el equipo completo a la villa, finca o cala donde sea tu evento.
                  </p>
                </div>

                <div className="pt-10 border-t border-sea-200/60">
                  <span className="eyebrow text-ink-mute block mb-3">Redes</span>
                  <div className="flex gap-6">
                    <a
                      href="https://www.instagram.com/delixef.ibiza/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-semibold uppercase tracking-wider text-ink hover:text-coral-600 transition-colors"
                    >
                      @delixef.ibiza
                    </a>
                    <span className="w-px h-4 bg-sea-200" aria-hidden="true"></span>
                    <a
                      href="https://www.instagram.com/chef.baena/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-semibold uppercase tracking-wider text-ink hover:text-coral-600 transition-colors"
                    >
                      @chef.baena
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-sand-50 py-20 md:py-28">
        <div className="max-w-editorial mx-auto px-6 md:px-10">
          <div className="grid grid-cols-12 gap-y-12 gap-x-10">
            <div className="col-span-12 md:col-span-4">
              <span className="eyebrow text-coral-600 block mb-6">— Preguntas</span>
              <h2 className="font-display text-display-md font-light text-ink leading-tight">
                Lo que <span className="italic text-sea-600">suelen</span> preguntarnos.
              </h2>
              <p className="mt-6 text-ink-soft font-light leading-relaxed max-w-sm">
                Si tu pregunta no está aquí, escríbenos directamente. Respondemos personalmente en menos de 24 horas.
              </p>
            </div>

            <div className="col-span-12 md:col-span-7 md:col-start-6">
              <ul className="divide-y divide-sea-200/60 border-y border-sea-200/60">
                {faqs.map((faq, i) => (
                  <li key={i} className="py-8 grid grid-cols-12 gap-4 items-baseline">
                    <span className="col-span-2 font-display text-2xl text-coral-600 font-light tabular-nums">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div className="col-span-10">
                      <h3 className="font-display text-xl md:text-2xl text-ink mb-3">
                        {faq.question}
                      </h3>
                      <p className="text-ink-soft font-light leading-relaxed">{faq.answer}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
