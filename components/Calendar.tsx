'use client';

import { useState, useMemo } from 'react';

interface CalendarProps {
  onDateSelect: (date: string, timeSlot: string) => void;
  selectedDate?: string;
  selectedTimeSlot?: string;
  minDays?: number;
}

type TimeSlot = 'desayuno' | 'comida' | 'cena';

const timeSlots: { id: TimeSlot; label: string; icon: string }[] = [
  { id: 'desayuno', label: 'Desayuno (08:00 - 11:00)', icon: '☀️' },
  { id: 'comida', label: 'Comida (13:00 - 16:00)', icon: '🌤️' },
  { id: 'cena', label: 'Cena (20:00 - 23:00)', icon: '🌙' },
];

export default function Calendar({
  onDateSelect,
  selectedDate,
  selectedTimeSlot,
  minDays = 1,
}: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());

  const daysInMonth = useMemo(() => {
    return new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  }, [currentDate]);

  const firstDayOfMonth = useMemo(() => {
    return new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
  }, [currentDate]);

  const minDate = new Date();
  minDate.setDate(minDate.getDate() + minDays);

  const days = useMemo(() => {
    const days = [];
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }
    return days;
  }, [daysInMonth, firstDayOfMonth]);

  const isDateAvailable = (day: number) => {
    if (!day) return false;
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    return date >= minDate && date.getDay() !== 0; // Excluir domingos
  };

  const isDateSelected = (day: number) => {
    if (!selectedDate || !day) return false;
    const [year, month, dayStr] = selectedDate.split('-');
    return (
      parseInt(year) === currentDate.getFullYear() &&
      parseInt(month) - 1 === currentDate.getMonth() &&
      parseInt(dayStr) === day
    );
  };

  const handleDateClick = (day: number) => {
    if (!isDateAvailable(day)) return;
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    const dateString = date.toISOString().split('T')[0];
    onDateSelect(dateString, selectedTimeSlot || 'comida');
  };

  const handlePreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const monthName = currentDate.toLocaleDateString('es-ES', {
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className="space-y-6">
      {/* Calendar */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={handlePreviousMonth}
            className="p-2 hover:bg-gray-100 rounded transition"
            aria-label="Mes anterior"
          >
            ←
          </button>
          <h3 className="font-semibold text-lg capitalize">{monthName}</h3>
          <button
            onClick={handleNextMonth}
            className="p-2 hover:bg-gray-100 rounded transition"
            aria-label="Próximo mes"
          >
            →
          </button>
        </div>

        {/* Weekdays */}
        <div className="grid grid-cols-7 gap-2 mb-2">
          {['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa'].map((day) => (
            <div key={day} className="text-center text-sm font-semibold text-gray-600 py-2">
              {day}
            </div>
          ))}
        </div>

        {/* Days */}
        <div className="grid grid-cols-7 gap-2">
          {days.map((day, index) => {
            const isAvailable = isDateAvailable(day);
            const isSelected = isDateSelected(day);

            return (
              <button
                key={index}
                onClick={() => day && handleDateClick(day)}
                disabled={!isAvailable}
                className={`
                  p-3 rounded font-medium transition text-sm
                  ${!day ? 'invisible' : ''}
                  ${isSelected ? 'bg-gold text-white' : 'bg-gray-100 text-gray-900'}
                  ${isAvailable && !isSelected ? 'hover:bg-gray-200 cursor-pointer' : ''}
                  ${!isAvailable && day ? 'opacity-50 cursor-not-allowed' : ''}
                `}
              >
                {day}
              </button>
            );
          })}
        </div>
      </div>

      {/* Time Slots */}
      {selectedDate && (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h4 className="font-semibold text-lg mb-4">Selecciona una hora</h4>
          <div className="space-y-3">
            {timeSlots.map((slot) => (
              <button
                key={slot.id}
                onClick={() => onDateSelect(selectedDate, slot.id)}
                className={`
                  w-full p-4 rounded-lg border-2 transition text-left
                  ${
                    selectedTimeSlot === slot.id
                      ? 'border-gold bg-gold bg-opacity-10'
                      : 'border-gray-200 hover:border-gold'
                  }
                `}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{slot.icon}</span>
                  <div>
                    <div className="font-semibold text-gray-900">{slot.label}</div>
                  </div>
                  {selectedTimeSlot === slot.id && (
                    <span className="ml-auto">✓</span>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Selection Summary */}
      {selectedDate && selectedTimeSlot && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-900">
            <strong>Fecha y hora seleccionadas:</strong>
            {' '}
            {new Date(selectedDate).toLocaleDateString('es-ES', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
            {' '}
            - {timeSlots.find((s) => s.id === selectedTimeSlot)?.label}
          </p>
        </div>
      )}
    </div>
  );
}
