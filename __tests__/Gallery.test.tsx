import { render, screen, fireEvent } from '@testing-library/react';
import Gallery from '../components/Gallery';

global.IntersectionObserver = jest.fn(() => ({ observe: jest.fn(), disconnect: jest.fn() })) as any;

const mockItems = [
  { src: 'https://images.unsplash.com/photo-1?w=800', label: 'Paella valenciana', category: 'Arroces' },
  { src: 'https://images.unsplash.com/photo-2?w=800', label: 'Boda en villa', category: 'Bodas' },
  { src: 'https://images.unsplash.com/photo-3?w=800', label: 'Cena privada', category: 'Eventos' },
];

describe('Gallery', () => {
  it('renders all items by default', () => {
    render(<Gallery items={mockItems} />);
    expect(screen.getByAltText('Paella valenciana')).toBeInTheDocument();
    expect(screen.getByAltText('Boda en villa')).toBeInTheDocument();
    expect(screen.getByAltText('Cena privada')).toBeInTheDocument();
  });

  it('filters items by category', () => {
    render(<Gallery items={mockItems} />);
    fireEvent.click(screen.getByRole('button', { name: 'Bodas' }));
    expect(screen.getByAltText('Boda en villa')).toBeInTheDocument();
    expect(screen.queryByAltText('Paella valenciana')).not.toBeInTheDocument();
  });

  it('shows all items when Todos is clicked', () => {
    render(<Gallery items={mockItems} />);
    fireEvent.click(screen.getByRole('button', { name: 'Bodas' }));
    fireEvent.click(screen.getByRole('button', { name: 'Todos' }));
    expect(screen.getByAltText('Paella valenciana')).toBeInTheDocument();
    expect(screen.getByAltText('Boda en villa')).toBeInTheDocument();
  });
});
