import { NextRequest, NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabase';
import { v4 as uuidv4 } from 'uuid';

function generateConfirmationToken(): string {
  return uuidv4().replace(/-/g, '').substring(0, 32);
}

async function sendConfirmationEmail(
  clientEmail: string,
  clientName: string,
  reservationDate: string,
  timeSlot: string,
  numberOfPeople: number,
  confirmationToken: string
) {
  const confirmationUrl = `${process.env.NEXTAUTH_URL}/confirmar/${confirmationToken}`;
  const timeSlotLabel =
    timeSlot === 'desayuno'
      ? 'Desayuno (08:00 - 11:00)'
      : timeSlot === 'comida'
        ? 'Comida (13:00 - 16:00)'
        : 'Cena (20:00 - 23:00)';

  const emailHtml = `
    <div style="font-family: Arial, sans-serif; color: #333;">
      <h1 style="color: #D4AF37;">¡Reserva Confirmada!</h1>

      <p>Hola <strong>${clientName}</strong>,</p>

      <p>Tu reserva en Delixef ha sido recibida. Aquí están los detalles:</p>

      <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <p><strong>Fecha:</strong> ${new Date(reservationDate).toLocaleDateString('es-ES', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}</p>
        <p><strong>Hora:</strong> ${timeSlotLabel}</p>
        <p><strong>Número de personas:</strong> ${numberOfPeople}</p>
      </div>

      <p>Por favor, confirma tu reserva haciendo clic en el siguiente enlace:</p>

      <p>
        <a href="${confirmationUrl}" style="background-color: #D4AF37; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; display: inline-block;">
          Confirmar Reserva
        </a>
      </p>

      <p style="color: #666; font-size: 12px; margin-top: 30px;">
        Si no realizaste esta reserva, ignora este email.
      </p>

      <p style="color: #999; font-size: 12px;">
        © 2024 Delixef - Chef Privado en Ibiza
      </p>
    </div>
  `;

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'onboarding@resend.dev',
        to: clientEmail,
        subject: 'Tu reserva en Delixef ha sido recibida - Confirma aquí',
        html: emailHtml,
      }),
    });

    return response.ok;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
}

async function sendAdminNotification(
  clientName: string,
  clientEmail: string,
  reservationDate: string,
  timeSlot: string,
  numberOfPeople: number
) {
  const timeSlotLabel =
    timeSlot === 'desayuno'
      ? 'Desayuno (08:00 - 11:00)'
      : timeSlot === 'comida'
        ? 'Comida (13:00 - 16:00)'
        : 'Cena (20:00 - 23:00)';

  const emailHtml = `
    <div style="font-family: Arial, sans-serif; color: #333;">
      <h2>Nueva Reserva Recibida</h2>

      <p><strong>Cliente:</strong> ${clientName}</p>
      <p><strong>Email:</strong> ${clientEmail}</p>
      <p><strong>Fecha:</strong> ${new Date(reservationDate).toLocaleDateString('es-ES')}</p>
      <p><strong>Hora:</strong> ${timeSlotLabel}</p>
      <p><strong>Personas:</strong> ${numberOfPeople}</p>

      <p>Por favor, verifica el panel de administración para más detalles.</p>
    </div>
  `;

  try {
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'onboarding@resend.dev',
        to: process.env.ADMIN_EMAIL,
        subject: `Nueva reserva: ${clientName} - ${reservationDate}`,
        html: emailHtml,
      }),
    });
  } catch (error) {
    console.error('Error sending admin notification:', error);
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      client_name,
      client_email,
      client_phone,
      reservation_date,
      time_slot,
      number_of_people,
      menu_preference,
      dietary_restrictions,
      special_requests,
      event_type,
    } = body;

    // Validation
    if (!client_name || !client_email || !reservation_date || !time_slot || !number_of_people) {
      return NextResponse.json(
        { error: 'Faltan campos requeridos' },
        { status: 400 }
      );
    }

    // Generate confirmation token
    const confirmationToken = generateConfirmationToken();

    // Insert into Supabase
    const { data, error } = await supabaseServer
      .from('reservas')
      .insert({
        client_name,
        client_email,
        client_phone: client_phone || null,
        reservation_date,
        time_slot,
        number_of_people,
        menu_preference: menu_preference || null,
        dietary_restrictions: dietary_restrictions || null,
        special_requests: special_requests || null,
        status: 'pendiente',
        event_type: event_type || null,
        confirmation_token: confirmationToken,
        confirmed: false,
      })
      .select()
      .single();

    if (error) {
      console.error('Database error:', error);
      return NextResponse.json(
        { error: 'Error al crear la reserva', details: error.message },
        { status: 500 }
      );
    }

    // Send confirmation email to client
    await sendConfirmationEmail(
      client_email,
      client_name,
      reservation_date,
      time_slot,
      number_of_people,
      confirmationToken
    );

    // Send notification to admin
    await sendAdminNotification(
      client_name,
      client_email,
      reservation_date,
      time_slot,
      number_of_people
    );

    return NextResponse.json(
      {
        success: true,
        message: 'Reserva creada exitosamente',
        data,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');

    if (!email) {
      return NextResponse.json(
        { error: 'Email requerido' },
        { status: 400 }
      );
    }

    const { data, error } = await supabaseServer
      .from('reservas')
      .select('*')
      .eq('client_email', email)
      .order('created_at', { ascending: false });

    if (error) {
      return NextResponse.json(
        { error: 'Error al obtener reservas' },
        { status: 500 }
      );
    }

    return NextResponse.json({ data });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
