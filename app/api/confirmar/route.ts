import { NextRequest, NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { token } = body;

    if (!token) {
      return NextResponse.json(
        { error: 'Token requerido' },
        { status: 400 }
      );
    }

    // Find reservation by token
    const { data: reservation, error: findError } = await supabaseServer
      .from('reservas')
      .select('*')
      .eq('confirmation_token', token)
      .single();

    if (findError || !reservation) {
      return NextResponse.json(
        { error: 'Token inválido o expirado' },
        { status: 404 }
      );
    }

    // Update reservation status
    const { error: updateError } = await supabaseServer
      .from('reservas')
      .update({
        confirmed: true,
        confirmed_at: new Date().toISOString(),
        status: 'confirmada',
      })
      .eq('id', reservation.id);

    if (updateError) {
      return NextResponse.json(
        { error: 'Error al confirmar la reserva' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Reserva confirmada exitosamente',
      reservation,
    });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
