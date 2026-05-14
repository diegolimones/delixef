import { NextRequest, NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabase';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const month = searchParams.get('month'); // YYYY-MM

  if (!month || !/^\d{4}-\d{2}$/.test(month)) {
    return NextResponse.json({ error: 'Parámetro month requerido (YYYY-MM)' }, { status: 400 });
  }

  const [year, mm] = month.split('-');
  const start = `${year}-${mm}-01`;
  const nextMonthDate = new Date(parseInt(year), parseInt(mm), 1);
  const end = `${nextMonthDate.getFullYear()}-${String(nextMonthDate.getMonth() + 1).padStart(2, '0')}-01`;

  const [{ data: disp }, { data: reservas }] = await Promise.all([
    supabaseServer
      .from('disponibilidad')
      .select('date, time_slot, max_reservas, available')
      .gte('date', start)
      .lt('date', end),
    supabaseServer
      .from('reservas')
      .select('reservation_date, time_slot')
      .gte('reservation_date', start)
      .lt('reservation_date', end)
      .neq('status', 'cancelada'),
  ]);

  const counts: Record<string, number> = {};
  for (const r of reservas || []) {
    const key = `${r.reservation_date}_${r.time_slot}`;
    counts[key] = (counts[key] || 0) + 1;
  }

  const slots = (disp || []).map((d) => {
    const key = `${d.date}_${d.time_slot}`;
    return {
      date: d.date,
      time_slot: d.time_slot,
      available: d.available && (counts[key] || 0) < d.max_reservas,
    };
  });

  return NextResponse.json({ slots });
}
