'use client';

import { useState, useMemo } from 'react';

interface Reserva {
  id: string;
  reservation_date: string;
  status: 'pendiente' | 'confirmada' | 'cancelada';
}

interface AdminCalendarProps {
  reservas: Reserva[];
  onDaySelect: (date: string | null) => void;
  selectedDay: string | null;
}

const WEEKDAYS = ['Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa', 'Do'];

const STATUS_DOT: Record<string, string> = {
  confirmada: 'bg-sea-600',
  pendiente: 'bg-coral-500',
  cancelada: 'bg-ink-mute',
};

export default function AdminCalendar({ reservas, onDaySelect, selectedDay }: AdminCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDow = new Date(year, month, 1).getDay();
  const offset = (firstDow + 6) % 7;

  const days = useMemo(() => {
    const d: (number | null)[] = [];
    for (let i = 0; i < offset; i++) d.push(null);
    for (let i = 1; i <= daysInMonth; i++) d.push(i);
    return d;
  }, [daysInMonth, offset]);

  const getDateStr = (day: number) =>
    `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

  const reservasByDay = useMemo(() => {
    const map: Record<string, Reserva[]> = {};
    for (const r of reservas) {
      const d = r.reservation_date.slice(0, 10);
      if (!map[d]) map[d] = [];
      map[d].push(r);
    }
    return map;
  }, [reservas]);

  const monthName = currentDate.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' });
  const today = new Date();

  return (
    <div className="bg-sand-50 border border-sea-200/60">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-sea-200/60">
        <button
          onClick={() => setCurrentDate(new Date(year, month - 1))}
          className="p-2 text-ink hover:text-amber-500 transition-colors"
          aria-label="Mes anterior"
        >
          ←
        </button>
        <div className="text-center">
          <h3 className="font-display text-xl text-ink capitalize font-light">{monthName}</h3>
          {selectedDay && (
            <button
              onClick={() => onDaySelect(null)}
              className="eyebrow text-coral-600 hover:text-coral-700 mt-1"
            >
              Quitar filtro ×
            </button>
          )}
        </div>
        <button
          onClick={() => setCurrentDate(new Date(year, month + 1))}
          className="p-2 text-ink hover:text-amber-500 transition-colors"
          aria-label="Mes siguiente"
        >
          →
        </button>
      </div>

      {/* Cabeceras días */}
      <div className="grid grid-cols-7 border-b border-sea-200/40 bg-sand-100">
        {WEEKDAYS.map((d) => (
          <div key={d} className="py-2 text-center eyebrow text-ink-mute text-[0.6rem]">{d}</div>
        ))}
      </div>

      {/* Días */}
      <div className="grid grid-cols-7 divide-x divide-y divide-sea-200/30">
        {days.map((day, idx) => {
          if (!day) return <div key={`e-${idx}`} className="bg-sand-50 min-h-[72px]" />;

          const dateStr = getDateStr(day);
          const dayReservas = reservasByDay[dateStr] || [];
          const isSelected = selectedDay === dateStr;
          const isToday =
            day === today.getDate() &&
            month === today.getMonth() &&
            year === today.getFullYear();

          // Group by status for dots
          const counts = {
            confirmada: dayReservas.filter((r) => r.status === 'confirmada').length,
            pendiente: dayReservas.filter((r) => r.status === 'pendiente').length,
            cancelada: dayReservas.filter((r) => r.status === 'cancelada').length,
          };

          return (
            <button
              key={day}
              onClick={() => onDaySelect(isSelected ? null : dateStr)}
              className={`
                min-h-[72px] p-2 text-left flex flex-col transition-colors
                ${isSelected ? 'bg-amber-50 ring-2 ring-inset ring-amber-400' : 'hover:bg-sand-100'}
                ${dayReservas.length > 0 ? 'cursor-pointer' : 'cursor-default'}
              `}
            >
              <span className={`
                text-sm font-light leading-none mb-2 w-6 h-6 flex items-center justify-center
                ${isToday ? 'bg-ink text-sand-50 rounded-full text-xs' : 'text-ink'}
                ${isSelected ? 'font-semibold' : ''}
              `}>
                {day}
              </span>

              {/* Dots */}
              <div className="flex flex-col gap-0.5 w-full">
                {counts.confirmada > 0 && (
                  <span className="flex items-center gap-1 text-[0.6rem] text-sea-700 font-light">
                    <span className="w-1.5 h-1.5 rounded-full bg-sea-600 shrink-0" />
                    {counts.confirmada}
                  </span>
                )}
                {counts.pendiente > 0 && (
                  <span className="flex items-center gap-1 text-[0.6rem] text-coral-700 font-light">
                    <span className="w-1.5 h-1.5 rounded-full bg-coral-500 shrink-0" />
                    {counts.pendiente}
                  </span>
                )}
                {counts.cancelada > 0 && (
                  <span className="flex items-center gap-1 text-[0.6rem] text-ink-mute font-light">
                    <span className="w-1.5 h-1.5 rounded-full bg-ink-mute shrink-0" />
                    {counts.cancelada}
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Leyenda */}
      <div className="flex flex-wrap items-center gap-4 px-6 py-3 border-t border-sea-200/40 bg-sand-100">
        <span className="flex items-center gap-1.5 eyebrow text-ink-mute">
          <span className="w-2 h-2 rounded-full bg-sea-600" /> Confirmada
        </span>
        <span className="flex items-center gap-1.5 eyebrow text-ink-mute">
          <span className="w-2 h-2 rounded-full bg-coral-500" /> Pendiente
        </span>
        <span className="flex items-center gap-1.5 eyebrow text-ink-mute">
          <span className="w-2 h-2 rounded-full bg-ink-mute" /> Cancelada
        </span>
      </div>
    </div>
  );
}
