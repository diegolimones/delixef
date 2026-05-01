'use client';

import { useAdminAuth } from '@/lib/hooks';
import Container from '@/components/Container';
import Card from '@/components/Card';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

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

export default function AdminReservas() {
  const { isAuthenticated, isLoading } = useAdminAuth();
  const [reservas, setReservas] = useState<Reserva[]>([]);
  const [filtro, setFiltro] = useState<'todas' | 'pendiente' | 'confirmada' | 'cancelada'>('todas');
  const [busqueda, setBusqueda] = useState('');
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);

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
      await supabase
        .from('reservas')
        .update({ status: newStatus })
        .eq('id', id);

      setReservas(
        reservas.map((r) =>
          r.id === id ? { ...r, status: newStatus as any } : r
        )
      );
    } catch (error) {
      console.error('Error updating reservation:', error);
    }
  };

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Cargando...</div>;
  }

  if (!isAuthenticated) {
    return null;
  }

  const reservasFiltradas = reservas.filter((r) => {
    const matchFiltro = filtro === 'todas' || r.status === filtro;
    const matchBusqueda = r.client_name.toLowerCase().includes(busqueda.toLowerCase()) ||
      r.client_email.toLowerCase().includes(busqueda.toLowerCase());
    return matchFiltro && matchBusqueda;
  });

  const getTimeSlotLabel = (slot: string) => {
    return slot === 'desayuno'
      ? '08:00'
      : slot === 'comida'
        ? '13:00'
        : '20:00';
  };

  return (
    <div className="p-4 md:p-8">
      <Container>
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-playfair text-4xl font-bold mb-2">Gestión de Reservas</h1>
          <p className="text-gray-600">Total: {reservasFiltradas.length} reservas</p>
        </div>

        {/* Filtros */}
        <Card className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Buscar</label>
              <input
                type="text"
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                placeholder="Buscar por nombre o email..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gold"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Estado</label>
              <select
                value={filtro}
                onChange={(e) => setFiltro(e.target.value as any)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gold"
              >
                <option value="todas">Todas</option>
                <option value="pendiente">Pendientes</option>
                <option value="confirmada">Confirmadas</option>
                <option value="cancelada">Canceladas</option>
              </select>
            </div>
          </div>
        </Card>

        {/* Tabla de Reservas */}
        {isLoadingData ? (
          <div className="text-center py-8">Cargando reservas...</div>
        ) : reservasFiltradas.length > 0 ? (
          <div className="space-y-4">
            {reservasFiltradas.map((reserva) => (
              <Card key={reserva.id} className="cursor-pointer hover:shadow-lg transition">
                <div onClick={() => setExpandedId(expandedId === reserva.id ? null : reserva.id)}>
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg text-gray-900">{reserva.client_name}</h3>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2 text-sm text-gray-600">
                        <div>
                          <span className="font-semibold">Fecha:</span>
                          {' '}
                          {new Date(reserva.reservation_date).toLocaleDateString('es-ES')}
                        </div>
                        <div>
                          <span className="font-semibold">Hora:</span>
                          {' '}
                          {getTimeSlotLabel(reserva.time_slot)}
                        </div>
                        <div>
                          <span className="font-semibold">Personas:</span>
                          {' '}
                          {reserva.number_of_people}
                        </div>
                        <div>
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              reserva.status === 'confirmada'
                                ? 'bg-green-100 text-green-800'
                                : reserva.status === 'pendiente'
                                  ? 'bg-yellow-100 text-yellow-800'
                                  : 'bg-red-100 text-red-800'
                            }`}
                          >
                            {reserva.status === 'confirmada'
                              ? 'Confirmada'
                              : reserva.status === 'pendiente'
                                ? 'Pendiente'
                                : 'Cancelada'}
                          </span>
                        </div>
                      </div>
                    </div>
                    <span className="text-2xl">{expandedId === reserva.id ? '▼' : '▶'}</span>
                  </div>

                  {/* Detalles Expandidos */}
                  {expandedId === reserva.id && (
                    <div className="mt-6 pt-6 border-t border-gray-200 space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-600">Email</p>
                          <p className="font-semibold text-gray-900">{reserva.client_email}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Teléfono</p>
                          <p className="font-semibold text-gray-900">
                            {reserva.client_phone || 'No proporcionado'}
                          </p>
                        </div>
                      </div>

                      {reserva.dietary_restrictions && (
                        <div>
                          <p className="text-sm text-gray-600">Restricciones dietéticas</p>
                          <p className="text-gray-900">{reserva.dietary_restrictions}</p>
                        </div>
                      )}

                      {reserva.special_requests && (
                        <div>
                          <p className="text-sm text-gray-600">Solicitudes especiales</p>
                          <p className="text-gray-900">{reserva.special_requests}</p>
                        </div>
                      )}

                      {/* Actions */}
                      <div className="flex gap-3 mt-6">
                        {reserva.status !== 'confirmada' && (
                          <button
                            onClick={() => updateReservaStatus(reserva.id, 'confirmada')}
                            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition text-sm font-semibold"
                          >
                            Confirmar
                          </button>
                        )}
                        {reserva.status !== 'cancelada' && (
                          <button
                            onClick={() => updateReservaStatus(reserva.id, 'cancelada')}
                            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition text-sm font-semibold"
                          >
                            Cancelar
                          </button>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="text-center py-12">
            <p className="text-gray-600 text-lg">No hay reservas que coincidan con los filtros</p>
          </Card>
        )}
      </Container>
    </div>
  );
}
