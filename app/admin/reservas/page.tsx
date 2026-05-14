'use client';

import { useAdminAuth } from '@/lib/hooks';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import AdminCalendar from '@/components/AdminCalendar';

interface Reserva {
  id: string;
  client_name: string;
  client_email: string;
  client_phone?: string;
  reservation_date: string;
  time_slot: string;
  number_of_people: number;
  dietary_restrictions?: string;
  special_requests?: string;
  status: 'pendiente' | 'confirmada' | 'cancelada';
  created_at: string;
}

const statusLabels: Record<string, string> = {
  confirmada: 'Confirmada',
  pendiente: 'Pendiente',
  cancelada: 'Cancelada',
};

const statusColors: Record<string, { dot: string; pill: string }> = {
  confirmada: { dot: 'bg-sea-600', pill: 'bg-sea-100 text-sea-800' },
  pendiente: { dot: 'bg-coral-500', pill: 'bg-coral-50 text-coral-700' },
  cancelada: { dot: 'bg-ink-mute', pill: 'bg-ink/[0.06] text-ink-mute' },
};

export default function AdminReservas() {
  const { isAuthenticated, isLoading } = useAdminAuth();
  const [reservas, setReservas] = useState<Reserva[]>([]);
  const [filtro, setFiltro] = useState<'todas' | 'pendiente' | 'confirmada' | 'cancelada'>('todas');
  const [busqueda, setBusqueda] = useState('');
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [vista, setVista] = useState<'lista' | 'calendario'>('calendario');
  const [selectedDay, setSelectedDay] = useState<string | null>(null);

  useEffect(() => {
    if (isAuthenticated) {
      fetchReservas();
    }
  }, [isAuthenticated]);

  const fetchReservas = async () => {
    setIsLoadingData(true);
    try {
      const { data } = await supabase
        .from('reservas')
        .select('*')
        .order('reservation_date', { ascending: false });

      setReservas(data || []);
    } catch (error) {
      console.error('Error fetching reservations:', error);
    } finally {
      setIsLoadingData(false);
    }
  };

  const updateReservaStatus = async (id: string, newStatus: string) => {
    try {
      await supabase.from('reservas').update({ status: newStatus }).eq('id', id);
      setReservas(reservas.map((r) => (r.id === id ? { ...r, status: newStatus as any } : r)));
    } catch (error) {
      console.error('Error updating reservation:', error);
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

  const reservasFiltradas = reservas.filter((r) => {
    const matchFiltro = filtro === 'todas' || r.status === filtro;
    const matchBusqueda =
      r.client_name.toLowerCase().includes(busqueda.toLowerCase()) ||
      r.client_email.toLowerCase().includes(busqueda.toLowerCase());
    const matchDay = !selectedDay || r.reservation_date.slice(0, 10) === selectedDay;
    return matchFiltro && matchBusqueda && matchDay;
  });

  const getTimeSlotLabel = (slot: string) =>
    slot === 'desayuno' ? '08:00' : slot === 'comida' ? '13:00' : '20:00';

  const filtros = [
    { id: 'todas', label: 'Todas' },
    { id: 'pendiente', label: 'Pendientes' },
    { id: 'confirmada', label: 'Confirmadas' },
    { id: 'cancelada', label: 'Canceladas' },
  ];

  return (
    <div className="min-h-screen bg-sand-50">
      <div className="max-w-6xl mx-auto px-6 md:px-12 py-12 md:py-16">
        {/* Header */}
        <div className="mb-12 pb-6 border-b border-sea-200/60">
          <span className="eyebrow text-coral-600">— N°02 · Reservas</span>
          <h1 className="font-display font-light text-display-md text-ink leading-tight mt-3">
            Gestión de <span className="italic text-sea-600">reservas</span>.
          </h1>
          <p className="mt-3 text-ink-mute font-light">
            {reservasFiltradas.length} de {reservas.length} reservas
          {selectedDay && (
            <> · filtrando{' '}
              <button
                onClick={() => setSelectedDay(null)}
                className="text-coral-600 hover:underline"
              >
                {new Date(selectedDay + 'T12:00:00').toLocaleDateString('es-ES', { day: 'numeric', month: 'long' })} ×
              </button>
            </>
          )}
          </p>
        </div>

        {/* Toggle vista */}
        <div className="mb-8 flex items-center gap-2">
          {(['calendario', 'lista'] as const).map((v) => (
            <button
              key={v}
              onClick={() => setVista(v)}
              className={`px-5 py-2 rounded-full text-xs font-semibold tracking-[0.18em] uppercase transition-colors ${
                vista === v
                  ? 'bg-ink text-sand-50'
                  : 'text-ink-mute hover:text-ink border border-sea-200'
              }`}
            >
              {v === 'calendario' ? '◫ Calendario' : '≡ Lista'}
            </button>
          ))}
        </div>

        {/* Calendario */}
        {vista === 'calendario' && (
          <div className="mb-10">
            <AdminCalendar
              reservas={reservas}
              onDaySelect={(day) => {
                setSelectedDay(day);
                if (day) setVista('lista');
              }}
              selectedDay={selectedDay}
            />
          </div>
        )}

        {/* Filtros */}
        <div className="mb-12 flex flex-col md:flex-row gap-6 md:items-end">
          {/* Search */}
          <div className="flex-1">
            <label className="eyebrow text-ink-mute block mb-2">Buscar</label>
            <input
              type="text"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              placeholder="Nombre o correo..."
              className="w-full px-0 py-3 border-0 border-b border-sea-200 bg-transparent text-ink placeholder:text-ink-mute focus:outline-none focus:border-ink transition-colors font-light"
            />
          </div>

          {/* Status filter */}
          <div className="flex items-baseline gap-4 flex-wrap pb-2">
            {filtros.map((f) => (
              <button
                key={f.id}
                onClick={() => setFiltro(f.id as any)}
                className={`text-sm font-light transition-colors ${
                  filtro === f.id
                    ? 'text-ink underline underline-offset-8 decoration-coral-500 decoration-2'
                    : 'text-ink-mute hover:text-ink'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Lista de reservas */}
        {isLoadingData ? (
          <div className="py-20 text-center text-ink-mute font-light">Cargando…</div>
        ) : reservasFiltradas.length > 0 ? (
          <ul className="divide-y divide-sea-200/60 border-t border-b border-sea-200/60">
            {reservasFiltradas.map((reserva) => {
              const isExpanded = expandedId === reserva.id;
              const statusStyle = statusColors[reserva.status];
              return (
                <li key={reserva.id}>
                  {/* Row header */}
                  <button
                    onClick={() => setExpandedId(isExpanded ? null : reserva.id)}
                    className="w-full grid grid-cols-12 gap-4 py-6 items-baseline text-left hover:bg-sand-100 transition-colors -mx-6 px-6"
                  >
                    <div className="col-span-12 md:col-span-4">
                      <div className="font-display text-xl text-ink italic">
                        {reserva.client_name}
                      </div>
                      <div className="text-xs text-ink-mute font-light mt-1">
                        {reserva.client_email}
                      </div>
                    </div>

                    <div className="col-span-4 md:col-span-2 text-sm text-ink font-light">
                      {new Date(reserva.reservation_date).toLocaleDateString('es-ES', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </div>

                    <div className="col-span-3 md:col-span-1 text-sm text-ink-soft font-light tabular-nums">
                      {getTimeSlotLabel(reserva.time_slot)}
                    </div>

                    <div className="col-span-2 md:col-span-1 font-display text-lg text-ink tabular-nums">
                      {reserva.number_of_people}
                    </div>

                    <div className="col-span-12 md:col-span-3">
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[0.65rem] font-semibold tracking-[0.18em] uppercase ${statusStyle.pill}`}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${statusStyle.dot}`} />
                        {statusLabels[reserva.status]}
                      </span>
                    </div>

                    <div className="hidden md:block md:col-span-1 text-right text-ink-mute font-light">
                      {isExpanded ? '−' : '+'}
                    </div>
                  </button>

                  {/* Expanded details */}
                  {isExpanded && (
                    <div className="bg-sand-100 border-t border-sea-200/60 px-6 py-8 -mx-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                        <div>
                          <span className="eyebrow text-ink-mute block mb-2">Correo</span>
                          <div className="font-display text-lg text-ink">
                            {reserva.client_email}
                          </div>
                        </div>
                        <div>
                          <span className="eyebrow text-ink-mute block mb-2">Teléfono</span>
                          <div className="font-display text-lg text-ink">
                            {reserva.client_phone || (
                              <span className="text-ink-mute italic">No proporcionado</span>
                            )}
                          </div>
                        </div>
                      </div>

                      {reserva.dietary_restrictions && (
                        <div className="mb-6">
                          <span className="eyebrow text-ink-mute block mb-2">
                            Restricciones dietéticas
                          </span>
                          <p className="text-ink font-light">{reserva.dietary_restrictions}</p>
                        </div>
                      )}

                      {reserva.special_requests && (
                        <div className="mb-6">
                          <span className="eyebrow text-ink-mute block mb-2">
                            Solicitudes especiales
                          </span>
                          <p className="text-ink font-light">{reserva.special_requests}</p>
                        </div>
                      )}

                      <div className="flex gap-3 mt-8 pt-6 border-t border-sea-200/60">
                        {reserva.status !== 'confirmada' && (
                          <button
                            onClick={() => updateReservaStatus(reserva.id, 'confirmada')}
                            className="inline-flex items-center justify-center bg-ink text-sand-50 px-6 py-3 rounded-full text-xs font-semibold tracking-[0.2em] uppercase hover:bg-sea-900 transition-colors"
                          >
                            Confirmar
                          </button>
                        )}
                        {reserva.status !== 'cancelada' && (
                          <button
                            onClick={() => updateReservaStatus(reserva.id, 'cancelada')}
                            className="inline-flex items-center justify-center px-6 py-3 rounded-full text-xs font-semibold tracking-[0.2em] uppercase text-coral-600 hover:bg-coral-500/10 transition-colors border border-coral-500"
                          >
                            Cancelar
                          </button>
                        )}
                      </div>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        ) : (
          <div className="border-y border-sea-200/60 py-20 text-center">
            <p className="font-display text-2xl text-ink-soft font-light">
              No hay reservas que coincidan con los filtros.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
