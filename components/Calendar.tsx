'use client';

import { useState, useMemo, useEffect } from 'react';

interface AvailabilitySlot {
  date: string;
  time_slot: string;
  available: boolean;
}

interface CalendarProps {
  onDateSelect: (date: string, timeSlot: string) => void;
  selectedDate?: string;
  selectedTimeSlot?: string;
  minDays?: number;
}

type TimeSlot = 'desayuno' | 'comida' | 'cena';

const TIME_SLOTS: { id: TimeSlot; label: string; hours: string }[] = [
  { id: 'desayuno', label: 'Desayuno', hours: '08:00 — 11:00' },
  { id: 'comida', label: 'Comida', hours: '13:00 — 16:00' },
  { id: 'cena', label: 'Cena', hours: '20:00 — 23:00' },
];

const WEEKDAYS = ['Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa', 'Do'];

export default function Calendar({
  onDateSelect,
  selectedDate,
  selectedTimeSlot,
  minDays = 1,
}: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [availability, setAvailability] = useState<AvailabilitySlot[]>([]);
  const [loading, setLoading] = useState(false);

  const monthKey = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}`;

  useEffect(() => {
    setLoading(true);
    fetch(`/api/disponibilidad?month=${monthKey}`)
      .then((r) => r.json())
      .then(({ slots }) => setAvailability(slots || []))
      .catch(() => setAvailability([]))
      .finally(() => setLoading(false));
  }, [monthKey]);

  const minDate = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + minDays);
    d.setHours(0, 0, 0, 0);
    return d;
  }, [minDays]);

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();

  // Week starts on Monday (ISO). getDay() returns 0=Sun, convert to 0=Mon
  const firstDow = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
  const offset = (firstDow + 6) % 7; // Mon=0 … Sun=6

  const days = useMemo(() => {
    const d: (number | null)[] = [];
    for (let i = 0; i < offset; i++) d.push(null);
    for (let i = 1; i <= daysInMonth; i++) d.push(i);
    return d;
  }, [daysInMonth, offset]);

  const getDateStr = (day: number) =>
    `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

  const isDateAvailable = (day: number) => {
    const d = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    if (d < minDate) return false;
    // Disponible por defecto — solo bloqueado si TODOS los slots están explícitamente bloqueados
    const dateStr = getDateStr(day);
    const blockedForDate = availability.filter((s) => s.date === dateStr && !s.available);
    return blockedForDate.length < TIME_SLOTS.length;
  };

  const isDateSelected = (day: number) => !!selectedDate && selectedDate === getDateStr(day);

  const handleDateClick = (day: number) => {
    if (!isDateAvailable(day)) return;
    const dateStr = getDateStr(day);
    // Auto-select first available slot for the date
    const firstSlot = availability.find((s) => s.date === dateStr && s.available);
    onDateSelect(dateStr, selectedTimeSlot || firstSlot?.time_slot || 'cena');
  };

  const getSlotsForDate = (dateStr: string) =>
    TIME_SLOTS.map((slot) => {
      const entry = availability.find((s) => s.date === dateStr && s.time_slot === slot.id);
      // Disponible si no hay entrada explícita O la entrada dice que está disponible
      return { ...slot, isAvailable: !entry || entry.available };
    });

  const canGoPrev = () => {
    const prev = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
    const now = new Date();
    return prev >= new Date(now.getFullYear(), now.getMonth(), 1);
  };

  const monthName = currentDate.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' });

  return (
    <div className="space-y-5">
      {/* ── Calendario ── */}
      <div className="bg-sand-50 border border-sea-200/60">
        {/* Header mes */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-sea-200/60">
          <button
            onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))}
            disabled={!canGoPrev()}
            aria-label="Mes anterior"
            className="p-2 text-ink hover:text-coral-600 transition-colors disabled:opacity-30"
          >
            ←
          </button>
          <h3 className="font-display text-lg text-ink capitalize font-light">
            {loading ? <span className="text-ink-mute">…</span> : monthName}
          </h3>
          <button
            onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))}
            aria-label="Mes siguiente"
            className="p-2 text-ink hover:text-coral-600 transition-colors"
          >
            →
          </button>
        </div>

        {/* Cabeceras días */}
        <div className="grid grid-cols-7 border-b border-sea-200/40">
          {WEEKDAYS.map((d) => (
            <div key={d} className="py-2 text-center eyebrow text-ink-mute text-[0.6rem]">{d}</div>
          ))}
        </div>

        {/* Días */}
        <div className="grid grid-cols-7 gap-px bg-sea-200/20 p-px">
          {days.map((day, idx) => {
            if (!day) return <div key={`e-${idx}`} className="bg-sand-50 aspect-square" />;
            const available = isDateAvailable(day);
            const selected = isDateSelected(day);
            const today = new Date();
            const isToday =
              day === today.getDate() &&
              currentDate.getMonth() === today.getMonth() &&
              currentDate.getFullYear() === today.getFullYear();

            return (
              <button
                key={day}
                onClick={() => handleDateClick(day)}
                disabled={!available}
                className={`
                  bg-sand-50 aspect-square flex flex-col items-center justify-center gap-0.5
                  text-sm font-light transition-colors
                  ${selected ? 'bg-coral-500 text-sand-50 hover:bg-coral-600' : ''}
                  ${available && !selected ? 'hover:bg-coral-50 hover:text-coral-700 cursor-pointer' : ''}
                  ${!available ? 'opacity-30 cursor-not-allowed' : ''}
                `}
              >
                <span className={isToday && !selected ? 'underline decoration-coral-500 decoration-2 underline-offset-2' : ''}>
                  {day}
                </span>
              </button>
            );
          })}
        </div>

        {/* Leyenda */}
        <div className="flex items-center gap-4 px-5 py-3 border-t border-sea-200/40">
          <span className="flex items-center gap-1.5 eyebrow text-ink-mute">
            <span className="w-2 h-2 rounded-full bg-coral-500" /> Seleccionado
          </span>
          <span className="eyebrow text-ink-mute opacity-50">Días pasados no disponibles</span>
        </div>
      </div>

      {/* ── Horarios ── */}
      {selectedDate && (
        <div className="bg-sand-50 border border-sea-200/60 p-5">
          <h4 className="font-display text-lg text-ink font-light mb-4">
            Horario para{' '}
            <span className="italic text-sea-600">
              {new Date(selectedDate + 'T12:00:00').toLocaleDateString('es-ES', {
                weekday: 'long', day: 'numeric', month: 'long',
              })}
            </span>
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {getSlotsForDate(selectedDate).map((slot) => {
              const isActive = selectedTimeSlot === slot.id;
              return (
                <button
                  key={slot.id}
                  onClick={() => slot.isAvailable && onDateSelect(selectedDate, slot.id)}
                  disabled={!slot.isAvailable}
                  className={`
                    p-4 border-2 text-left transition-colors
                    ${isActive ? 'border-coral-500 bg-coral-500/10' : ''}
                    ${slot.isAvailable && !isActive ? 'border-sea-200 hover:border-coral-400' : ''}
                    ${!slot.isAvailable ? 'border-sea-200/40 opacity-40 cursor-not-allowed' : ''}
                  `}
                >
                  <div className={`font-display text-lg font-light ${isActive ? 'text-coral-700 italic' : 'text-ink'}`}>
                    {slot.label}
                  </div>
                  <div className="eyebrow text-ink-mute mt-1">{slot.hours}</div>
                  {!slot.isAvailable && (
                    <div className="eyebrow text-coral-400 mt-1">Completo</div>
                  )}
                  {isActive && (
                    <div className="eyebrow text-coral-600 mt-1">Seleccionado</div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* ── Resumen selección ── */}
      {selectedDate && selectedTimeSlot && (
        <div className="bg-sea-50 border border-sea-200 px-5 py-4">
          <p className="text-sm text-sea-800 font-light">
            <span className="font-semibold">Seleccionado:</span>{' '}
            {new Date(selectedDate + 'T12:00:00').toLocaleDateString('es-ES', {
              weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
            })}{' '}
            · {TIME_SLOTS.find((s) => s.id === selectedTimeSlot)?.label}{' '}
            ({TIME_SLOTS.find((s) => s.id === selectedTimeSlot)?.hours})
          </p>
        </div>
      )}
    </div>
  );
}
