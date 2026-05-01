'use client';

import { useAdminAuth } from '@/lib/hooks';
import Container from '@/components/Container';
import Card from '@/components/Card';
import Button from '@/components/Button';
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
      await supabase
        .from('disponibilidad')
        .update({ available: !available })
        .eq('id', id);

      setDisponibilidades(
        disponibilidades.map((d) =>
          d.id === id ? { ...d, available: !available } : d
        )
      );
    } catch (error) {
      console.error('Error updating availability:', error);
    }
  };

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Cargando...</div>;
  }

  if (!isAuthenticated) {
    return null;
  }

  const timeSlots = [
    { id: 'desayuno', label: 'Desayuno (08:00 - 11:00)' },
    { id: 'comida', label: 'Comida (13:00 - 16:00)' },
    { id: 'cena', label: 'Cena (20:00 - 23:00)' },
  ];

  return (
    <div className="p-4 md:p-8">
      <Container>
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-playfair text-4xl font-bold mb-2">Gestión de Disponibilidad</h1>
          <p className="text-gray-600">Administra las fechas y horarios disponibles</p>
        </div>

        {/* Formulario */}
        <Card className="mb-8">
          <h2 className="text-2xl font-semibold mb-6">Agregar Disponibilidad</h2>
          <form onSubmit={handleAddAvailability} className="space-y-4">
            {submitError && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-800 text-sm">
                {submitError}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Fecha
                </label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gold"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Horario
                </label>
                <select
                  value={selectedTimeSlot}
                  onChange={(e) => setSelectedTimeSlot(e.target.value as any)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gold"
                >
                  {timeSlots.map((slot) => (
                    <option key={slot.id} value={slot.id}>
                      {slot.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Máximo de Reservas
                </label>
                <input
                  type="number"
                  min="1"
                  value={maxReservas}
                  onChange={(e) => setMaxReservas(parseInt(e.target.value) || 1)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gold"
                />
              </div>
            </div>

            <Button type="submit" variant="primary" size="md">
              Agregar Disponibilidad
            </Button>
          </form>
        </Card>

        {/* Lista de Disponibilidades */}
        {isLoadingData ? (
          <div className="text-center py-8">Cargando...</div>
        ) : disponibilidades.length > 0 ? (
          <div className="overflow-x-auto">
            <Card>
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Fecha</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Horario</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Máx. Reservas</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Reservas</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Estado</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {disponibilidades.map((disp) => (
                    <tr key={disp.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 text-gray-900">
                        {new Date(disp.date).toLocaleDateString('es-ES')}
                      </td>
                      <td className="py-3 px-4 text-gray-600">
                        {disp.time_slot === 'desayuno'
                          ? 'Desayuno'
                          : disp.time_slot === 'comida'
                            ? 'Comida'
                            : 'Cena'}
                      </td>
                      <td className="py-3 px-4 text-gray-600">{disp.max_reservas}</td>
                      <td className="py-3 px-4 text-gray-600">{disp.current_reservas}</td>
                      <td className="py-3 px-4">
                        <button
                          onClick={() => handleToggleAvailable(disp.id, disp.available)}
                          className={`px-3 py-1 rounded-full text-sm font-semibold ${
                            disp.available
                              ? 'bg-green-100 text-green-800 hover:bg-green-200'
                              : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                          }`}
                        >
                          {disp.available ? 'Disponible' : 'No disponible'}
                        </button>
                      </td>
                      <td className="py-3 px-4">
                        <button
                          onClick={() => handleDelete(disp.id)}
                          className="text-red-600 hover:text-red-800 font-semibold text-sm"
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Card>
          </div>
        ) : (
          <Card className="text-center py-12">
            <p className="text-gray-600 text-lg">No hay disponibilidades agregadas</p>
          </Card>
        )}
      </Container>
    </div>
  );
}
