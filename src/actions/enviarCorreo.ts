'use server';

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function enviarCorreo(formData: FormData) {
  const nombre = formData.get('nombre') as string;
  const telefono = formData.get('telefono') as string;
  const email = formData.get('email') as string;
  const motivo = formData.get('motivo') as string;
  const mensaje = formData.get('mensaje') as string;

  try {
    await resend.emails.send({
      from: 'Web Isorana <onboarding@resend.dev>',
      to: ['agrupacionmusicalisorana@gmail.com'], // El correo real de la agrupación
      subject: `Nuevo mensaje de contacto: ${motivo || 'General'} (${nombre})`,
      html: `
        <div style="font-family: Arial, sans-serif; color: #333; padding: 20px; border: 1px solid #e2e8f0; border-radius: 10px;">
          <h2 style="color: #4f46e5;">Nuevo mensaje desde la web de la Agrupación Musical Isorana</h2>
          <p><strong>Nombre:</strong> ${nombre}</p>
          <p><strong>Teléfono:</strong> ${telefono || 'No proporcionado'}</p>
          <p><strong>Correo electrónico:</strong> ${email}</p>
          <p><strong>Motivo de contacto:</strong> <span style="background: #e0e7ff; color: #3730a3; padding: 3px 8px; border-radius: 4px;">${motivo}</span></p>
          <p><strong>Mensaje:</strong></p>
          <p style="background: #f8fafc; padding: 15px; border-radius: 6px; border-left: 4px solid #4f46e5;">${mensaje}</p>
        </div>
      `,
    });

    return { success: true };
  } catch (error) {
    console.error('Error al enviar el correo:', error);
    return { success: false, error: 'Error al enviar el correo' };
  }
}