import { render, screen } from '@testing-library/react';
import ChefBio from '../components/ChefBio';

describe('ChefBio', () => {
  it('renders chef name', () => {
    render(<ChefBio />);
    expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument();
  });

  it('renders the 3 stat items', () => {
    render(<ChefBio />);
    expect(screen.getByText(/Desde 2018 en Ibiza/i)).toBeInTheDocument();
    expect(screen.getByText(/Cocina Mediterránea/i)).toBeInTheDocument();
    expect(screen.getByText(/\+200 eventos realizados/i)).toBeInTheDocument();
  });
});
