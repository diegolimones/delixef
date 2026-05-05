'use client';

import { useState } from 'react';
import Calendar from './Calendar';
import { services } from '@/lib/services';
import { trackReservation } from '@/lib/analytics';

type Step = 1 | 2 | 3 | 4;

interface ReservationData {
  serviceType: string;
  date: string;
  timeSlot: string;
  numberOfPeople: number;
  name: string;
  email: string;
  phone: string;
  dietaryRestrictions: string;
  specialRequests: string;
}

interface ReservationFormProps {
  onSubmit?: (data: ReservationData) => void;
}

const stepLabels = ['Servicio', 'Fecha', 'Detalles', 'Contacto'];

export default function ReservationForm({ onSubmit }: ReservationFormProps) {
  const [step, setStep] = useState<Step>(1);
  const [formData, setFormData] = useState<ReservationData>({
    serviceType: '',
    date: '',
    timeSlot: '',
    numberOfPeople: 2,
    name: '',
    email: '',
    phone: '',
    dietaryRestrictions: '',
    specialRequests: '',
  });

  const handleServiceSelect = (serviceId: string) => {
    setFormData({ ...formData, serviceType: serviceId });
    setStep(2);
  };

  const handleDateTimeSelect = (date: string, timeSlot: string) => {
    setFormData({ ...formData, date, timeSlot });
  };

  const handleGuestCountChange = (count: number) => {
    setFormData({ ...formData, numberOfPeople: count });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleProceedToStep3 = () => {
    if (formData.date && formData.timeSlot) {
      setStep(3);
    } else {
      alert('Por favor selecciona una fecha y una hora');
    }
  };

  const handleProceedToStep4 = () => {
    if (formData.numberOfPeople > 0) {
      setStep(4);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(formData);
    } else {
      try {
        const response = await fetch('/api/reservas', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            client_name: formData.name,
            client_email: formData.email,
            client_phone: formData.phone,
            reservation_date: formData.date,
            time_slot: formData.timeSlot,
            number_of_people: formData.numberOfPeople,
            dietary_restrictions: formData.dietaryRestrictions,
            special_requests: formData.specialRequests,
            event_type: formData.serviceType,
          }),
        });

        if (response.ok) {
          trackReservation({
            serviceType: formData.serviceType,
            numberOfPeople: formData.numberOfPeople,
            date: formData.date,
          });
          alert('¡Reserva creada exitosamente! Revisa tu email para confirmación.');
          setStep(1);
          setFormData({
            serviceType: '',
            date: '',
            timeSlot: '',
            numberOfPeople: 2,
            name: '',
            email: '',
            phone: '',
            dietaryRestrictions: '',
            specialRequests: '',
          });
        } else {
          const errorData = await response.json();
          console.error('API Error:', errorData);
          alert(`Error al crear la reserva: ${errorData.details || 'Error desconocido'}`);
        }
      } catch (error) {
        alert('Error de conexión. Intenta de nuevo.');
      }
    }
  };

  const inputClass =
    'w-full px-0 py-4 border-0 border-b border-sea-200 bg-transparent text-ink placeholder:text-ink-mute focus:outline-none focus:border-ink transition-colors font-light';

  const selectedService = services.find((s) => s.id === formData.serviceType);

  return (
    <div className="space-y-12">
      {/* Editorial progress indicator */}
      <div className="border-y border-sea-200/60 py-5">
        <div className="grid grid-cols-4 gap-2">
          {stepLabels.map((label, idx) => {
            const s = (idx + 1) as Step;
            const isCurrent = s === step;
            const isDone = s < step;
            return (
              <div key={label} className="flex flex-col items-start">
                <div className="flex items-baseline gap-2 w-full">
                  <span
                    className={`font-display text-xs font-medium tabular-nums transition-colors ${
                      isCurrent
                        ? 'text-coral-600'
                        : isDone
                          ? 'text-ink'
                          : 'text-ink-mute'
                    }`}
                  >
                    {isDone ? '✓' : `0${s}`}
                  </span>
                  <span
                    className={`flex-1 h-px transition-colors ${
                      isDone || isCurrent ? 'bg-coral-500' : 'bg-sea-200'
                    }`}
                  ></span>
                </div>
                <div
                  className={`mt-3 eyebrow transition-colors ${
                    isCurrent
                      ? 'text-coral-600'
                      : isDone
                        ? 'text-ink'
                        : 'text-ink-mute'
                  }`}
                >
                  {label}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Step 1: Service Selection — editorial list */}
      {step === 1 && (
        <div>
          <div className="mb-10">
            <span className="eyebrow text-coral-600 block mb-4">— Paso 01</span>
            <h2 className="font-display font-light text-display-md text-ink leading-[1.04]">
              ¿Qué servicio
              <br />
              <span className="italic text-sea-600">tienes en mente?</span>
            </h2>
          </div>

          <ul className="divide-y divide-sea-200/60 border-y border-sea-200/60">
            {services.map((service) => {
              const isSelected = formData.serviceType === service.id;
              return (
                <li key={service.id}>
                  <button
                    onClick={() => handleServiceSelect(service.id)}
                    className={`group w-full grid grid-cols-12 gap-3 md:gap-6 py-6 md:py-7 items-baseline text-left transition-colors -mx-4 px-4 md:-mx-6 md:px-6 ${
                      isSelected
                        ? 'bg-coral-500/10'
                        : 'hover:bg-sand-100'
                    }`}
                  >
                    <span
                      className={`col-span-2 md:col-span-1 font-display text-2xl md:text-3xl font-light tabular-nums transition-colors ${
                        isSelected ? 'text-coral-600' : 'text-coral-500'
                      }`}
                    >
                      {service.num}
                    </span>
                    <div className="col-span-10 md:col-span-4">
                      <h3
                        className={`font-display text-2xl md:text-3xl text-ink font-light leading-tight transition-all ${
                          isSelected ? 'italic' : 'group-hover:italic'
                        }`}
                      >
                        {service.name}
                      </h3>
                      <div className="eyebrow text-ink-mute mt-2">{service.subtitle}</div>
                    </div>
                    <p className="col-span-12 md:col-span-5 text-sm md:text-base text-ink-soft font-light leading-relaxed">
                      {service.shortDescription}
                    </p>
                    <div className="col-span-12 md:col-span-2 md:text-right">
                      <span className="eyebrow text-ink-mute block">Desde</span>
                      <span className="font-display text-lg md:text-xl text-ink mt-1 inline-block">
                        {service.precio}
                      </span>
                    </div>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {/* Step 2: Date & Time Selection */}
      {step === 2 && (
        <div>
          <div className="mb-10">
            <span className="eyebrow text-coral-600 block mb-4">— Paso 02</span>
            <h2 className="font-display font-light text-display-md text-ink leading-[1.04]">
              Selecciona
              <br />
              <span className="italic text-sea-600">fecha y hora</span>.
            </h2>
            {selectedService && (
              <p className="mt-4 text-sm text-ink-mute font-light">
                Servicio seleccionado:{' '}
                <span className="text-ink italic">{selectedService.name}</span>
              </p>
            )}
          </div>

          <Calendar
            onDateSelect={handleDateTimeSelect}
            selectedDate={formData.date}
            selectedTimeSlot={formData.timeSlot}
          />

          <div className="flex flex-col sm:flex-row gap-3 mt-12 pt-8 border-t border-sea-200/60">
            <button
              onClick={() => setStep(1)}
              className="inline-flex items-center justify-center px-6 py-4 text-xs font-semibold tracking-[0.22em] uppercase text-ink hover:text-coral-600 transition-colors border border-ink"
            >
              ← Atrás
            </button>
            <button
              onClick={handleProceedToStep3}
              className="inline-flex items-center justify-center bg-ink text-sand-50 px-8 py-4 text-xs font-semibold tracking-[0.22em] uppercase hover:bg-coral-600 transition-colors"
            >
              Continuar al paso 03
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Guest Count & Preferences */}
      {step === 3 && (
        <div>
          <div className="mb-10">
            <span className="eyebrow text-coral-600 block mb-4">— Paso 03</span>
            <h2 className="font-display font-light text-display-md text-ink leading-[1.04]">
              Detalles
              <br />
              <span className="italic text-sea-600">de tu mesa</span>.
            </h2>
          </div>

          <div className="space-y-10">
            {/* Guest Count */}
            <div className="border-b border-sea-200/60 pb-8">
              <span className="eyebrow text-ink-mute block mb-4">Número de invitados</span>
              <div className="flex items-center gap-6">
                <button
                  type="button"
                  onClick={() => handleGuestCountChange(Math.max(1, formData.numberOfPeople - 1))}
                  className="w-12 h-12 border border-sea-200 hover:border-coral-500 hover:text-coral-600 transition-colors text-ink font-light text-xl"
                  aria-label="Quitar invitado"
                >
                  −
                </button>
                <span className="font-display text-4xl md:text-5xl text-ink font-light tabular-nums w-16 text-center">
                  {formData.numberOfPeople}
                </span>
                <button
                  type="button"
                  onClick={() => handleGuestCountChange(formData.numberOfPeople + 1)}
                  className="w-12 h-12 border border-sea-200 hover:border-coral-500 hover:text-coral-600 transition-colors text-ink font-light text-xl"
                  aria-label="Añadir invitado"
                >
                  +
                </button>
              </div>
            </div>

            {/* Dietary Restrictions */}
            <div>
              <label className="eyebrow text-ink-mute block mb-3">
                Restricciones dietéticas (opcional)
              </label>
              <textarea
                name="dietaryRestrictions"
                value={formData.dietaryRestrictions}
                onChange={handleInputChange}
                placeholder="Vegetariano, sin gluten, alergias..."
                className={inputClass}
                rows={2}
              />
            </div>

            {/* Special Requests */}
            <div>
              <label className="eyebrow text-ink-mute block mb-3">
                Solicitudes especiales (opcional)
              </label>
              <textarea
                name="specialRequests"
                value={formData.specialRequests}
                onChange={handleInputChange}
                placeholder="Cuéntanos si hay algo concreto que quieras: un plato, un tema, una hora del atardecer..."
                className={inputClass}
                rows={3}
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-8 border-t border-sea-200/60">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="inline-flex items-center justify-center px-6 py-4 text-xs font-semibold tracking-[0.22em] uppercase text-ink hover:text-coral-600 transition-colors border border-ink"
              >
                ← Atrás
              </button>
              <button
                type="button"
                onClick={handleProceedToStep4}
                className="inline-flex items-center justify-center bg-ink text-sand-50 px-8 py-4 text-xs font-semibold tracking-[0.22em] uppercase hover:bg-coral-600 transition-colors"
              >
                Continuar al paso 04
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Step 4: Contact Information */}
      {step === 4 && (
        <form onSubmit={handleSubmit}>
          <div className="mb-10">
            <span className="eyebrow text-coral-600 block mb-4">— Paso 04</span>
            <h2 className="font-display font-light text-display-md text-ink leading-[1.04]">
              Confirma
              <br />
              <span className="italic text-sea-600">tus datos</span>.
            </h2>
          </div>

          <div className="space-y-8">
            <div>
              <label className="eyebrow text-ink-mute block mb-2">Nombre completo</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Tu nombre"
                required
                className={inputClass}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
              <div>
                <label className="eyebrow text-ink-mute block mb-2">Teléfono</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+34 ..."
                  required
                  className={inputClass}
                />
              </div>
            </div>

            {/* Editorial Summary */}
            <div className="mt-12 pt-8 border-t border-sea-200/60">
              <span className="eyebrow text-coral-600 block mb-6">— Resumen</span>
              <ul className="divide-y divide-sea-200/60 border-y border-sea-200/60">
                <li className="py-4 flex items-baseline justify-between gap-4">
                  <span className="eyebrow text-ink-mute">Servicio</span>
                  <span className="font-display text-lg md:text-xl text-ink text-right">
                    {selectedService?.name || '—'}
                  </span>
                </li>
                <li className="py-4 flex items-baseline justify-between gap-4">
                  <span className="eyebrow text-ink-mute">Fecha</span>
                  <span className="font-display text-lg md:text-xl text-ink italic text-right">
                    {formData.date
                      ? new Date(formData.date).toLocaleDateString('es-ES', {
                          weekday: 'long',
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                        })
                      : '—'}
                  </span>
                </li>
                <li className="py-4 flex items-baseline justify-between gap-4">
                  <span className="eyebrow text-ink-mute">Hora</span>
                  <span className="font-display text-lg md:text-xl text-ink text-right">
                    {formData.timeSlot === 'desayuno'
                      ? 'Desayuno (08—11)'
                      : formData.timeSlot === 'comida'
                        ? 'Comida (13—16)'
                        : formData.timeSlot === 'cena'
                          ? 'Cena (20—23)'
                          : '—'}
                  </span>
                </li>
                <li className="py-4 flex items-baseline justify-between gap-4">
                  <span className="eyebrow text-ink-mute">Invitados</span>
                  <span className="font-display text-lg md:text-xl text-ink tabular-nums">
                    {formData.numberOfPeople}
                  </span>
                </li>
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-8 border-t border-sea-200/60">
              <button
                type="button"
                onClick={() => setStep(3)}
                className="inline-flex items-center justify-center px-6 py-4 text-xs font-semibold tracking-[0.22em] uppercase text-ink hover:text-coral-600 transition-colors border border-ink"
              >
                ← Atrás
              </button>
              <button
                type="submit"
                className="inline-flex items-center justify-center bg-coral-500 text-sand-50 px-8 py-4 text-xs font-semibold tracking-[0.22em] uppercase hover:bg-coral-600 transition-colors"
              >
                Confirmar reserva
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}
