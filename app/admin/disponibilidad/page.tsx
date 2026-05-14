'use client';

import { useAdminAuth } from '@/lib/hooks';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

interface Disponibilidad {
  id: string;
  date: string;
  time_slot: 'desayuno' | 'comida' | 'cena';
  max_reservas: number;
  current_reservas: number;
  available: boolean;
}

const slotLabels: Record<string, string> = {
  desayuno: 'Desayuno',
  comida: 'Comida',
  cena: 'Cena',
};

export default function AdminDisponibilidad() {
  const { isAuthenticated, isLoading } = useAdminAuth();
  const [disponibilidades, setDisponibilidades] = useState<Disponibilidad[]>([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<'desayuno' | 'comida' | 'cena'>('comida');
  const [maxReservas, setMaxReservas] = useState(1);
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [submitError, setSubmitError] = useState('');

  useEffect(() => {
    if (isAuthenticated) {
      fetchDisponibilidades();
    }
  }, [isAuthenticated]);

  const fetchDisponibilidades = async () => {
    setIsLoadingData(true);
    try {
      const { data } = await supabase
        .from('disponibilidad')
        .select('*')
        .order('date', { ascending: true });

      setDisponibilidades(data || []);
    } catch (error) {
      console.error('Error fetching availability:', error);
    } finally {
      setIsLoadingData(false);
    }
  };

  const handleAddAvailability = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError('');

    if (!selectedDate) {
      setSubmitError('Selecciona una fecha');
      return;
    }

    try {
      const { error } = await supabase.from('disponibilidad').insert({
        date: selectedDate,
        time_slot: selectedTimeSlot,
        max_reservas: maxReservas,
        current_reservas: 0,
        available: true,
      });

      if (error) {
        setSubmitError(error.message);
      } else {
        setSelectedDate('');
        setMaxReservas(1);
        fetchDisponibilidades();
      }
    } catch (error) {
      setSubmitError('Error al agregar disponibilidad');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await supabase.from('disponibilidad').delete().eq('id', id);
      setDisponibilidades(disponibilidades.filter((d) => d.id !== id));
    } catch (error) {
      console.error('Error deleting availability:', error);
    }
  };

  const handleToggleAvailable = async (id: string, available: boolean) => {
    try {
      await supabase.from('disponibilidad').update({ available: !available }).eq('id', id);
      setDisponibilidades(
        disponibilidades.map((d) => (d.id === id ? { ...d, available: !available } : d))
      );
    } catch (error) {
      console.error('Error updating availability:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-sand-50">
        <div className="font-display text-xl text-ink-mute font-light">Cargando…</div>
      </div>
    );
  }

  if (!isAuthenticated) return null;

  const timeSlots = [
    { id: 'desayuno', label: 'Desayuno (08—11)' },
    { id: 'comida', label: 'Comida (13—16)' },
    { id: 'cena', label: 'Cena (20—23)' },
  ];

  const inputClass =
    'w-full px-0 py-3 border-0 border-b border-sea-200 bg-transparent text-ink placeholder:text-ink-mute focus:outline-none focus:border-ink transition-colors font-light';

  return (
    <div className="min-h-screen bg-sand-50">
      <div className="max-w-6xl mx-auto px-6 md:px-12 py-12 md:py-16">
        {/* Header */}
        <div className="mb-12 pb-6 border-b border-sea-200/60">
          <span className="eyebrow text-coral-600">— N°03 · Disponibilidad</span>
          <h1 className="font-display font-light text-display-md text-ink leading-tight mt-3">
            Gestión de <span className="italic text-sea-600">disponibilidad</span>.
          </h1>
          <p className="mt-3 text-ink-mute font-light">
            Administra fechas y horarios disponibles para reserva
          </p>
        </div>

        {/* Add form */}
        <div className="mb-16">
          <span className="eyebrow text-coral-600 block mb-4">— Añadir</span>
          <h2 className="font-display text-2xl md:text-3xl font-light text-ink mb-8">
            Nueva disponibilidad
          </h2>

          <form onSubmit={handleAddAvailability} className="space-y-8 max-w-2xl">
            {submitError && (
              <div className="border border-coral-500/50 bg-coral-500/10 px-4 py-3">
                <p className="text-sm text-coral-600 font-light">{submitError}</p>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className="eyebrow text-ink-mute block mb-2">Fecha</label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className={inputClass}
                />
              </div>

              <div>
                <label className="eyebrow text-ink-mute block mb-2">Horario</label>
                <select
                  value={selectedTimeSlot}
                  onChange={(e) => setSelectedTimeSlot(e.target.value as any)}
                  className={inputClass}
                >
                  {timeSlots.map((slot) => (
                    <option key={slot.id} value={slot.id}>
                      {slot.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="eyebrow text-ink-mute block mb-2">Máximo de reservas</label>
                <input
                  type="number"
                  min="1"
                  value={maxReservas}
                  onChange={(e) => setMaxReservas(parseInt(e.target.value) || 1)}
                  className={inputClass}
                />
              </div>
            </div>

            <button
              type="submit"
              className="inline-flex items-center justify-center bg-ink text-sand-50 px-8 py-4 rounded-full text-xs font-semibold tracking-[0.22em] uppercase hover:bg-coral-600 transition-colors"
            >
              Añadir disponibilidad
            </button>
          </form>
        </div>

        {/* Listing */}
        <div>
          <span className="eyebrow text-coral-600 block mb-4">— Listado</span>
          <h2 className="font-display text-2xl md:text-3xl font-light text-ink mb-8">
            Fechas configuradas
          </h2>

          {isLoadingData ? (
            <div className="py-20 text-center text-ink-mute font-light">Cargando…</div>
          ) : disponibilidades.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-y border-sea-200/60">
                    <th className="text-left py-4 px-2 eyebrow text-ink-mute">Fecha</th>
                    <th className="text-left py-4 px-2 eyebrow text-ink-mute">Horario</th>
                    <th className="text-left py-4 px-2 eyebrow text-ink-mute">Máx</th>
                    <th className="text-left py-4 px-2 eyebrow text-ink-mute">Reservadas</th>
                    <th className="text-left py-4 px-2 eyebrow text-ink-mute">Estado</th>
                    <th className="text-right py-4 px-2 eyebrow text-ink-mute">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-sea-200/60">
                  {disponibilidades.map((disp) => (
                    <tr key={disp.id} className="hover:bg-sand-100 transition-colors">
                      <td className="py-5 px-2 font-display text-lg text-ink italic">
                        {new Date(disp.date).toLocaleDateString('es-ES', {
                          weekday: 'short',
                          day: '2-digit',
                          month: 'short',
                        })}
                      </td>
                      <td className="py-5 px-2 text-ink font-light">
                        {slotLabels[disp.time_slot]}
                      </td>
                      <td className="py-5 px-2 font-display text-lg text-ink tabular-nums">
                        {disp.max_reservas}
                      </td>
                      <td className="py-5 px-2 text-ink-soft font-light tabular-nums">
                        {disp.current_reservas}
                      </td>
                      <td className="py-5 px-2">
                        <button
                          onClick={() => handleToggleAvailable(disp.id, disp.available)}
                          className={`inline-flex items-center gap-2 text-xs font-semibold tracking-[0.18em] uppercase transition-colors ${
                            disp.available
                              ? 'text-sea-800 hover:text-coral-600'
                              : 'text-ink-mute hover:text-ink'
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              disp.available ? 'bg-sea-800' : 'bg-ink-mute'
                            }`}
                          ></span>
                          {disp.available ? 'Disponible' : 'No disponible'}
                        </button>
                      </td>
                      <td className="py-5 px-2 text-right">
                        <button
                          onClick={() => handleDelete(disp.id)}
                          className="text-xs font-semibold tracking-[0.18em] uppercase text-coral-600 hover:text-coral-700 transition-colors"
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="border-y border-sea-200/60 py-20 text-center">
              <p className="font-display text-2xl text-ink-soft font-light">
                Sin disponibilidades configuradas.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
