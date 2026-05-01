import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, subject, message } = body;

    // Validation
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Faltan campos requeridos' },
        { status: 400 }
      );
    }

    // Send to admin email via Resend
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; color: #333;">
        <h2 style="color: #D4AF37;">Nuevo Mensaje de Contacto</h2>

        <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p><strong>Nombre:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          ${phone ? `<p><strong>Teléfono:</strong> ${phone}</p>` : ''}
          <p><strong>Asunto:</strong> ${subject}</p>
        </div>

        <h3>Mensaje:</h3>
        <p>${message.replace(/\n/g, '<br>')}</p>

        <hr style="margin: 30px 0; border: none; border-top: 1px solid #ddd;">

        <p style="color: #999; font-size: 12px;">
          © 2024 Delixef - Chef Privado en Ibiza
        </p>
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
          from: 'contacto@delixef.com',
          to: process.env.ADMIN_EMAIL,
          subject: `Nuevo contacto: ${subject}`,
          html: htmlContent,
          replyTo: email,
        }),
      });
    } catch (emailError) {
      console.error('Error sending contact email:', emailError);
      // Continue even if email fails
    }

    // Send confirmation email to user
    const confirmationHtml = `
      <div style="font-family: Arial, sans-serif; color: #333;">
        <h2 style="color: #D4AF37;">¡Hemos recibido tu mensaje!</h2>

        <p>Hola ${name},</p>

        <p>Gracias por ponerte en contacto con Delixef. Hemos recibido tu mensaje y nos pondremos en contacto contigo en breve.</p>

        <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p><strong>Asunto:</strong> ${subject}</p>
          <p><strong>Responderemos a:</strong> ${email}</p>
        </div>

        <p>Si tu consulta es urgente, puedes llamarnos al teléfono de contacto.</p>

        <p style="margin-top: 30px;">
          Saludos,<br>
          <strong>El equipo de Delixef</strong>
        </p>

        <hr style="margin: 30px 0; border: none; border-top: 1px solid #ddd;">

        <p style="color: #999; font-size: 12px;">
          © 2024 Delixef - Chef Privado en Ibiza
        </p>
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
          from: 'info@delixef.com',
          to: email,
          subject: 'Hemos recibido tu mensaje - Delixef',
          html: confirmationHtml,
        }),
      });
    } catch (emailError) {
      console.error('Error sending confirmation email:', emailError);
      // Continue even if email fails
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Mensaje enviado exitosamente',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
