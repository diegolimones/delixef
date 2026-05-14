'use client';

import { useAdminAuth } from '@/lib/hooks';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function AdminDashboard() {
  const { isLoading, isAuthenticated } = useAdminAuth();
  const [stats, setStats] = useState({
    totalReservations: 0,
    pendingReservations: 0,
    confirmedReservations: 0,
  });
  const [recentReservations, setRecentReservations] = useState<any[]>([]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchStats();
      fetchRecentReservations();
    }
  }, [isAuthenticated]);

  const fetchStats = async () => {
    try {
      const { data } = await supabase.from('reservas').select('*', { count: 'exact' });
      const pendingCount = data?.filter((r) => r.status === 'pendiente').length || 0;
      const confirmedCount = data?.filter((r) => r.status === 'confirmada').length || 0;

      setStats({
        totalReservations: data?.length || 0,
        pendingReservations: pendingCount,
        confirmedReservations: confirmedCount,
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const fetchRecentReservations = async () => {
    try {
      const { data } = await supabase
        .from('reservas')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(8);

      setRecentReservations(data || []);
    } catch (error) {
      console.error('Error fetching reservations:', error);
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

  const today = new Date().toLocaleDateString('es-ES', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const statCards = [
    { label: 'Total reservas', value: stats.totalReservations, accent: 'sea', top: 'border-t-2 border-amber-400' },
    { label: 'Pendientes', value: stats.pendingReservations, accent: 'coral', top: 'border-t-2 border-coral-500' },
    { label: 'Confirmadas', value: stats.confirmedReservations, accent: 'ink', top: 'border-t-2 border-sea-600' },
  ];

  return (
    <div className="min-h-screen bg-sand-50">
      <div className="max-w-6xl mx-auto px-6 md:px-12 py-12 md:py-16">
        {/* Header */}
        <div className="flex items-center justify-between mb-12 md:mb-16 pb-6 border-b border-sea-200/60">
          <div>
            <span className="eyebrow text-coral-600">— N°01 · Dashboard</span>
            <h1 className="font-display font-light text-display-md text-ink leading-tight mt-3">
              Buenos días, <span className="italic text-sea-600">Pau</span>.
            </h1>
          </div>
          <div className="hidden md:block text-right">
            <div className="eyebrow text-ink-mute mb-1">Hoy</div>
            <div className="font-display text-lg text-ink italic capitalize">{today}</div>
          </div>
        </div>

        {/* Stats — editorial cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-sea-200/60 border border-sea-200/60 mb-12 md:mb-16">
          {statCards.map((stat, index) => (
            <div key={index} className={`bg-sand-50 p-8 md:p-10 ${stat.top}`}>
              <div className="flex items-baseline justify-between mb-4">
                <span className="eyebrow text-ink-mute">{stat.label}</span>
                <span className="font-display text-xs text-ink-mute font-light tabular-nums">
                  0{index + 1}
                </span>
              </div>
              <div className="font-display font-light text-6xl md:text-7xl text-ink leading-none tabular-nums">
                {stat.value}
              </div>
              {stat.accent === 'coral' && stat.value > 0 && (
                <div className="mt-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-coral-50 text-coral-700 text-[0.65rem] font-semibold tracking-[0.18em] uppercase">
                    <span className="w-1.5 h-1.5 rounded-full bg-coral-500" />
                    Atención requerida
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Recent Reservations */}
        <div>
          <div className="flex items-baseline justify-between mb-8">
            <div>
              <span className="eyebrow text-coral-600 block mb-2">— Recientes</span>
              <h2 className="font-display text-3xl md:text-4xl font-light text-ink">
                Últimas reservas
              </h2>
            </div>
            <a
              href="/admin/reservas"
              className="hidden md:inline-flex items-center gap-3 text-sm font-semibold text-ink hover:text-coral-600 transition-colors uppercase tracking-[0.18em]"
            >
              Ver todas
              <span className="w-10 h-px bg-current"></span>
            </a>
          </div>

          {recentReservations.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-y border-sea-200/60">
                    <th className="text-left py-4 px-2 eyebrow text-ink-mute">Cliente</th>
                    <th className="text-left py-4 px-2 eyebrow text-ink-mute">Fecha</th>
                    <th className="text-left py-4 px-2 eyebrow text-ink-mute">Hora</th>
                    <th className="text-left py-4 px-2 eyebrow text-ink-mute">Personas</th>
                    <th className="text-left py-4 px-2 eyebrow text-ink-mute">Estado</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-sea-200/60">
                  {recentReservations.map((reservation: any) => (
                    <tr
                      key={reservation.id}
                      className="hover:bg-sand-100 transition-colors"
                    >
                      <td className="py-5 px-2">
                        <div className="font-display text-lg text-ink italic">
                          {reservation.client_name}
                        </div>
                        <div className="text-xs text-ink-mute font-light mt-0.5">
                          {reservation.client_email}
                        </div>
                      </td>
                      <td className="py-5 px-2 font-light text-ink">
                        {new Date(reservation.reservation_date).toLocaleDateString('es-ES', {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </td>
                      <td className="py-5 px-2 font-light text-ink-soft tabular-nums">
                        {reservation.time_slot === 'desayuno'
                          ? '08:00'
                          : reservation.time_slot === 'comida'
                            ? '13:00'
                            : '20:00'}
                      </td>
                      <td className="py-5 px-2 font-display text-lg text-ink tabular-nums">
                        {reservation.number_of_people}
                      </td>
                      <td className="py-5 px-2">
                        <span
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[0.65rem] font-semibold tracking-[0.18em] uppercase ${
                            reservation.status === 'confirmada'
                              ? 'bg-sea-100 text-sea-800'
                              : reservation.status === 'pendiente'
                                ? 'bg-coral-50 text-coral-700'
                                : 'bg-ink/[0.06] text-ink-mute'
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              reservation.status === 'confirmada'
                                ? 'bg-sea-600'
                                : reservation.status === 'pendiente'
                                  ? 'bg-coral-500'
                                  : 'bg-ink-mute'
                            }`}
                          />
                          {reservation.status === 'confirmada'
                            ? 'Confirmada'
                            : reservation.status === 'pendiente'
                              ? 'Pendiente'
                              : 'Cancelada'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="border-y border-sea-200/60 py-20 text-center">
              <p className="font-display text-2xl text-ink-soft font-light">
                Sin reservas todavía.
              </p>
              <p className="mt-3 text-ink-mute font-light">
                Las nuevas reservas aparecerán aquí.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
