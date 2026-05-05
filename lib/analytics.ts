/**
 * Helpers de tracking para GA4 y Meta Pixel.
 * Solo se ejecutan en cliente. En desarrollo logean a consola.
 */

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    fbq?: (...args: any[]) => void;
  }
}

interface ReservationEventData {
  serviceType: string;
  numberOfPeople: number;
  date?: string;
}

/**
 * Track conversion: el usuario ha enviado el formulario de reserva.
 * - GA4: evento 'generate_lead'
 * - Meta Pixel: evento 'Lead'
 */
export function trackReservation(data: ReservationEventData) {
  if (typeof window === 'undefined') return;

  if (process.env.NODE_ENV !== 'production') {
    console.info('[analytics] reservation:', data);
    return;
  }

  // GA4
  window.gtag?.('event', 'generate_lead', {
    event_category: 'reservation',
    service_type: data.serviceType,
    number_of_people: data.numberOfPeople,
    reservation_date: data.date,
  });

  // Meta Pixel
  window.fbq?.('track', 'Lead', {
    content_name: data.serviceType,
    content_category: 'reservation',
    num_guests: data.numberOfPeople,
  });
}

/**
 * Track el envío del formulario de contacto.
 */
export function trackContact(subject: string) {
  if (typeof window === 'undefined') return;

  if (process.env.NODE_ENV !== 'production') {
    console.info('[analytics] contact:', subject);
    return;
  }

  window.gtag?.('event', 'contact', {
    event_category: 'contact',
    subject,
  });

  window.fbq?.('track', 'Contact', { subject });
}
