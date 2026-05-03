'use client';

import { useState } from 'react';
import Calendar from './Calendar';
import Button from './Button';
import Card from './Card';

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

const services = [
  { id: 'desayuno', name: 'Desayuno', icon: '🥐', description: 'Desde €40 por persona' },
  { id: 'comida', name: 'Comida', icon: '🍽️', description: 'Desde €60 por persona' },
  { id: 'cena', name: 'Cena', icon: '✨', description: 'Desde €80 por persona' },
  { id: 'evento', name: 'Evento Especial', icon: '🎉', description: 'Presupuesto personalizado' },
];

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
      // Default submission to API
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

  return (
    <div className="space-y-8">
      {/* Progress Indicator */}
      <div className="flex items-center justify-between">
        {[1, 2, 3, 4].map((s) => (
          <div key={s} className="flex flex-col items-center flex-1">
            <div
              className={`
                w-10 h-10 rounded-full flex items-center justify-center font-semibold
                ${s <= step ? 'bg-gold text-white' : 'bg-gray-200 text-gray-600'}
                ${s < step ? 'ring-2 ring-gold' : ''}
              `}
            >
              {s < step ? '✓' : s}
            </div>
            <div className="text-xs mt-2 text-center text-gray-600">
              {s === 1 && 'Servicio'}
              {s === 2 && 'Fecha'}
              {s === 3 && 'Huéspedes'}
              {s === 4 && 'Contacto'}
            </div>
            {s < 4 && (
              <div
                className={`
                  h-1 flex-1 mx-2 mt-4
                  ${s < step ? 'bg-gold' : 'bg-gray-200'}
                `}
                style={{ minWidth: '20px' }}
              />
            )}
          </div>
        ))}
      </div>

      {/* Step 1: Service Selection */}
      {step === 1 && (
        <div>
          <h2 className="font-playfair text-3xl mb-6">¿Qué tipo de servicio deseas?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {services.map((service) => (
              <button
                key={service.id}
                onClick={() => handleServiceSelect(service.id)}
                className={`
                  p-6 rounded-lg border-2 transition text-left
                  ${
                    formData.serviceType === service.id
                      ? 'border-gold bg-gold bg-opacity-10'
                      : 'border-gray-200 hover:border-gold'
                  }
                `}
              >
                <div className="text-4xl mb-2">{service.icon}</div>
                <h3 className="font-semibold text-lg">{service.name}</h3>
                <p className="text-sm text-gray-600">{service.description}</p>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 2: Date & Time Selection */}
      {step === 2 && (
        <div>
          <h2 className="font-playfair text-3xl mb-6">Selecciona fecha y hora</h2>
          <Calendar
            onDateSelect={handleDateTimeSelect}
            selectedDate={formData.date}
            selectedTimeSlot={formData.timeSlot}
          />
          <div className="flex gap-4 mt-8">
            <Button
              variant="outline"
              onClick={() => setStep(1)}
            >
              Atrás
            </Button>
            <Button
              variant="primary"
              onClick={handleProceedToStep3}
              className="min-w-max bg-black hover:bg-gray-800 text-white"
            >
              Continuar al paso 3
            </Button>
          </div>
        </div>
      )}

      {/* Step 3: Guest Count & Preferences */}
      {step === 3 && (
        <div>
          <h2 className="font-playfair text-3xl mb-6">Detalles de tu reserva</h2>
          <div className="space-y-6">
            {/* Guest Count */}
            <Card>
              <h3 className="font-semibold text-lg mb-4">Número de personas</h3>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => handleGuestCountChange(Math.max(1, formData.numberOfPeople - 1))}
                  className="w-10 h-10 border border-gray-300 rounded hover:bg-gray-100"
                >
                  −
                </button>
                <span className="text-2xl font-semibold w-12 text-center">
                  {formData.numberOfPeople}
                </span>
                <button
                  onClick={() => handleGuestCountChange(formData.numberOfPeople + 1)}
                  className="w-10 h-10 border border-gray-300 rounded hover:bg-gray-100"
                >
                  +
                </button>
              </div>
            </Card>

            {/* Dietary Restrictions */}
            <Card>
              <h3 className="font-semibold text-lg mb-4">Restricciones dietéticas</h3>
              <textarea
                name="dietaryRestrictions"
                value={formData.dietaryRestrictions}
                onChange={handleInputChange}
                placeholder="Ej: Vegetariano, Sin gluten, Alergias, etc."
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-gold"
                rows={3}
              />
            </Card>

            {/* Special Requests */}
            <Card>
              <h3 className="font-semibold text-lg mb-4">Solicitudes especiales</h3>
              <textarea
                name="specialRequests"
                value={formData.specialRequests}
                onChange={handleInputChange}
                placeholder="Cuéntanos si tienes algo especial en mente..."
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-gold"
                rows={3}
              />
            </Card>

            <div className="flex gap-4">
              <Button variant="outline" onClick={() => setStep(2)}>
                Atrás
              </Button>
              <Button variant="primary" onClick={handleProceedToStep4}>
                Continuar
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Step 4: Contact Information */}
      {step === 4 && (
        <form onSubmit={handleSubmit}>
          <h2 className="font-playfair text-3xl mb-6">Confirma tus datos</h2>
          <div className="space-y-4">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Nombre completo"
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-gold"
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Correo electrónico"
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-gold"
            />
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="Teléfono"
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-gold"
            />

            {/* Summary */}
            <Card className="bg-blue-50 border-blue-200">
              <h3 className="font-semibold mb-3">Resumen de tu reserva:</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <strong>Servicio:</strong>{' '}
                  {services.find((s) => s.id === formData.serviceType)?.name}
                </li>
                <li>
                  <strong>Fecha:</strong>{' '}
                  {new Date(formData.date).toLocaleDateString('es-ES', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </li>
                <li>
                  <strong>Hora:</strong>{' '}
                  {formData.timeSlot === 'desayuno'
                    ? 'Desayuno (08:00 - 11:00)'
                    : formData.timeSlot === 'comida'
                      ? 'Comida (13:00 - 16:00)'
                      : 'Cena (20:00 - 23:00)'}
                </li>
                <li>
                  <strong>Personas:</strong> {formData.numberOfPeople}
                </li>
              </ul>
            </Card>

            <div className="flex gap-4">
              <Button variant="outline" onClick={() => setStep(3)}>
                Atrás
              </Button>
              <Button variant="primary" type="submit">
                Confirmar Reserva
              </Button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}
