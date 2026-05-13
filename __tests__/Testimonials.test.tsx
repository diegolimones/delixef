import { render, screen, fireEvent } from '@testing-library/react';
import Testimonials from '../components/Testimonials';

const mockTestimonials = [
  { name: 'Sarah & Tom', context: 'Boda en Villa, Ibiza 2024', text: 'Los invitados aún hablan de ello', stars: 5 },
  { name: 'María García', context: 'Cena privada, 2024', text: 'Una experiencia increíble', stars: 5 },
];

describe('Testimonials', () => {
  it('renders the first testimonial by default', () => {
    render(<Testimonials items={mockTestimonials} />);
    expect(screen.getByText(/Los invitados aún hablan de ello/)).toBeInTheDocument();
  });

  it('navigates to next testimonial on arrow click', async () => {
    render(<Testimonials items={mockTestimonials} />);
    fireEvent.click(screen.getByRole('button', { name: /siguiente/i }));
    expect(await screen.findByText(/Una experiencia increíble/)).toBeInTheDocument();
  });

  it('renders star rating', () => {
    render(<Testimonials items={mockTestimonials} />);
    expect(screen.getAllByText('★')).toHaveLength(5);
  });
});
