import { NextRequest, NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabase';

async function syncToGoogleCalendar(
  clientName: string,
  reservationDate: string,
  timeSlot: string,
  numberOfPeople: number,
  clientEmail: string
) {
  const calendarId = process.env.GOOGLE_CALENDAR_ID;
  const apiKey = process.env.GOOGLE_CALENDAR_API_KEY;

  if (!calendarId || !apiKey) {
    console.warn('Google Calendar credentials not configured');
    return null;
  }

  // Calculate start and end times based on time slot
  const startDateTime = new Date(reservationDate);
  const endDateTime = new Date(reservationDate);

  if (timeSlot === 'desayuno') {
    startDateTime.setHours(8, 0, 0);
    endDateTime.setHours(11, 0, 0);
  } else if (timeSlot === 'comida') {
    startDateTime.setHours(13, 0, 0);
    endDateTime.setHours(16, 0, 0);
  } else {
    // cena
    startDateTime.setHours(20, 0, 0);
    endDateTime.setHours(23, 0, 0);
  }

  const timeSlotLabel =
    timeSlot === 'desayuno'
      ? 'Desayuno'
      : timeSlot === 'comida'
        ? 'Comida'
        : 'Cena';

  const event = {
    summary: `Reserva: ${clientName} - ${timeSlotLabel}`,
    description: `Reserva de ${numberOfPeople} persona(s) para ${timeSlotLabel.toLowerCase()}.`,
    start: {
      dateTime: startDateTime.toISOString(),
      timeZone: 'Europe/Madrid',
    },
    end: {
      dateTime: endDateTime.toISOString(),
      timeZone: 'Europe/Madrid',
    },
    attendees: [
      {
        email: clientEmail,
        displayName: clientName,
      },
    ],
  };

  try {
    const response = await fetch(
      `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events?key=${apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(event),
      }
    );

    if (!response.ok) {
      console.error('Google Calendar API error:', await response.text());
      return null;
    }

    const data = await response.json();
    return data.id;
  } catch (error) {
    console.error('Error syncing to Google Calendar:', error);
    return null;
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { reservationId } = body;

    if (!reservationId) {
      return NextResponse.json(
        { error: 'reservationId es requerido' },
        { status: 400 }
      );
    }

    // Get reservation from database
    const { data: reservation, error: findError } = await supabaseServer
      .from('reservas')
      .select('*')
      .eq('id', reservationId)
      .single();

    if (findError || !reservation) {
      return NextResponse.json(
        { error: 'Reserva no encontrada' },
        { status: 404 }
      );
    }

    if (reservation.status !== 'confirmada') {
      return NextResponse.json(
        { error: 'Solo se pueden sincronizar reservas confirmadas' },
        { status: 400 }
      );
    }

    // Sync to Google Calendar
    const eventId = await syncToGoogleCalendar(
      reservation.client_name,
      reservation.reservation_date,
      reservation.time_slot,
      reservation.number_of_people,
      reservation.client_email
    );

    if (!eventId) {
      return NextResponse.json(
        { error: 'No se pudo sincronizar con Google Calendar' },
        { status: 500 }
      );
    }

    // Update reservation with event ID
    const { error: updateError } = await supabaseServer
      .from('reservas')
      .update({ google_calendar_event_id: eventId })
      .eq('id', reservationId);

    if (updateError) {
      console.error('Error updating reservation:', updateError);
    }

    return NextResponse.json({
      success: true,
      message: 'Reserva sincronizada con Google Calendar',
      eventId,
    });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json();
    const { reservationId } = body;

    if (!reservationId) {
      return NextResponse.json(
        { error: 'reservationId es requerido' },
        { status: 400 }
      );
    }

    // Get reservation from database
    const { data: reservation, error: findError } = await supabaseServer
      .from('reservas')
      .select('*')
      .eq('id', reservationId)
      .single();

    if (findError || !reservation) {
      return NextResponse.json(
        { error: 'Reserva no encontrada' },
        { status: 404 }
      );
    }

    if (!reservation.google_calendar_event_id) {
      return NextResponse.json(
        { error: 'Reserva no sincronizada con Google Calendar' },
        { status: 400 }
      );
    }

    // Delete event from Google Calendar
    const calendarId = process.env.GOOGLE_CALENDAR_ID;
    const apiKey = process.env.GOOGLE_CALENDAR_API_KEY;

    if (!calendarId || !apiKey) {
      return NextResponse.json(
        { error: 'Google Calendar no configurado' },
        { status: 500 }
      );
    }

    const response = await fetch(
      `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events/${reservation.google_calendar_event_id}?key=${apiKey}`,
      {
        method: 'DELETE',
      }
    );

    if (!response.ok) {
      console.error('Google Calendar API error:', await response.text());
      return NextResponse.json(
        { error: 'No se pudo eliminar el evento de Google Calendar' },
        { status: 500 }
      );
    }

    // Clear event ID from reservation
    await supabaseServer
      .from('reservas')
      .update({ google_calendar_event_id: null })
      .eq('id', reservationId);

    return NextResponse.json({
      success: true,
      message: 'Evento eliminado de Google Calendar',
    });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
