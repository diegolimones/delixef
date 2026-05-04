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
    const dateString = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
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
      <div className="bg-sand-50 border border-sea-200/60 p-6">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={handlePreviousMonth}
            className="p-2 hover:bg-sand-100 transition-colors text-ink"
            aria-label="Mes anterior"
          >
            ←
          </button>
          <h3 className="font-display text-xl text-ink capitalize">{monthName}</h3>
          <button
            onClick={handleNextMonth}
            className="p-2 hover:bg-sand-100 transition-colors text-ink"
            aria-label="Próximo mes"
          >
            →
          </button>
        </div>

        {/* Weekdays */}
        <div className="grid grid-cols-7 gap-2 mb-2">
          {['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa'].map((day) => (
            <div key={day} className="text-center text-xs font-semibold tracking-[0.2em] uppercase text-ink-mute py-2">
              {day}
            </div>
          ))}
        </div>

        {/* Days */}
        <div className="grid grid-cols-7 gap-2">
          {days.map((day, index) => {
            const isAvailable = day ? isDateAvailable(day) : false;
            const isSelected = day ? isDateSelected(day) : false;

            return (
              <button
                key={index}
                onClick={() => day && handleDateClick(day)}
                disabled={!isAvailable}
                className={`
                  p-3 font-medium transition-colors text-sm
                  ${!day ? 'invisible' : ''}
                  ${isSelected ? 'bg-coral-500 text-sand-50' : 'bg-sand-100 text-ink'}
                  ${isAvailable && !isSelected ? 'hover:bg-coral-500/15 hover:text-coral-700 cursor-pointer' : ''}
                  ${!isAvailable && day ? 'opacity-40 cursor-not-allowed' : ''}
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
        <div className="bg-sand-50 border border-sea-200/60 p-6">
          <h4 className="font-display text-xl text-ink mb-5">Selecciona una hora</h4>
          <div className="space-y-3">
            {timeSlots.map((slot) => (
              <button
                key={slot.id}
                onClick={() => onDateSelect(selectedDate, slot.id)}
                className={`
                  w-full p-4 border-2 transition-colors text-left
                  ${
                    selectedTimeSlot === slot.id
                      ? 'border-coral-500 bg-coral-500/10'
                      : 'border-sea-200 hover:border-coral-500/50'
                  }
                `}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{slot.icon}</span>
                  <div>
                    <div className={`font-semibold ${
                      selectedTimeSlot === slot.id ? 'text-coral-700' : 'text-ink'
                    }`}>{slot.label}</div>
                  </div>
                  {selectedTimeSlot === slot.id && (
                    <span className="ml-auto text-coral-600 font-bold">✓</span>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Selection Summary */}
      {selectedDate && selectedTimeSlot && (
        <div className="bg-coral-500/10 border border-coral-500/40 p-4">
          <p className="text-sm text-coral-700">
            <strong className="text-coral-700">Fecha y hora seleccionadas:</strong>
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
