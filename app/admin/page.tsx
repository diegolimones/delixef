'use client';

import { useAdminAuth } from '@/lib/hooks';
import Container from '@/components/Container';
import Card from '@/components/Card';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function AdminDashboard() {
  const { session, isLoading, isAuthenticated } = useAdminAuth();
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
        .limit(5);

      setRecentReservations(data || []);
    } catch (error) {
      console.error('Error fetching reservations:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Cargando...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  const statCards = [
    {
      label: 'Total de Reservas',
      value: stats.totalReservations,
      icon: '📅',
      color: 'bg-blue-50',
      borderColor: 'border-blue-200',
    },
    {
      label: 'Pendientes',
      value: stats.pendingReservations,
      icon: '⏳',
      color: 'bg-yellow-50',
      borderColor: 'border-yellow-200',
    },
    {
      label: 'Confirmadas',
      value: stats.confirmedReservations,
      icon: '✅',
      color: 'bg-green-50',
      borderColor: 'border-green-200',
    },
  ];

  return (
    <div className="p-4 md:p-8">
      <Container>
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-playfair text-4xl font-bold mb-2">Dashboard</h1>
          <p className="text-gray-600">Bienvenido al panel de administración de Delixef</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {statCards.map((stat, index) => (
            <Card key={index} className={`${stat.color} border ${stat.borderColor}`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-semibold">{stat.label}</p>
                  <p className="text-4xl font-bold text-gray-900 mt-2">{stat.value}</p>
                </div>
                <span className="text-5xl opacity-20">{stat.icon}</span>
              </div>
            </Card>
          ))}
        </div>

        {/* Recent Reservations */}
        <Card>
          <h2 className="text-2xl font-semibold mb-6">Últimas Reservas</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Cliente</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Fecha</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Hora</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Personas</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Estado</th>
                </tr>
              </thead>
              <tbody>
                {recentReservations.length > 0 ? (
                  recentReservations.map((reservation: any) => (
                    <tr key={reservation.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 text-gray-900">{reservation.client_name}</td>
                      <td className="py-3 px-4 text-gray-600">
                        {new Date(reservation.reservation_date).toLocaleDateString('es-ES')}
                      </td>
                      <td className="py-3 px-4 text-gray-600">
                        {reservation.time_slot === 'desayuno'
                          ? '08:00'
                          : reservation.time_slot === 'comida'
                            ? '13:00'
                            : '20:00'}
                      </td>
                      <td className="py-3 px-4 text-gray-600">{reservation.number_of_people}</td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-semibold ${
                            reservation.status === 'confirmada'
                              ? 'bg-green-100 text-green-800'
                              : reservation.status === 'pendiente'
                                ? 'bg-yellow-100 text-yellow-800'
                                : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {reservation.status === 'confirmada'
                            ? 'Confirmada'
                            : reservation.status === 'pendiente'
                              ? 'Pendiente'
                              : 'Cancelada'}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="py-8 px-4 text-center text-gray-600">
                      No hay reservas
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </Card>
      </Container>
    </div>
  );
}
