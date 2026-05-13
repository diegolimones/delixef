import { render, screen } from '@testing-library/react';
import ValueProps from '../components/ValueProps';

describe('ValueProps', () => {
  it('renders 3 value proposition cards', () => {
    render(<ValueProps />);
    const cards = screen.getAllByRole('article');
    expect(cards).toHaveLength(3);
  });

  it('renders the section heading', () => {
    render(<ValueProps />);
    expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument();
  });
});
