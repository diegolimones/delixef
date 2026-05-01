import React from 'react';
import { render, screen } from '@testing-library/react';
import Card from '@/components/Card';

describe('Card Component', () => {
  it('renders children content', () => {
    render(<Card>Card content</Card>);
    expect(screen.getByText('Card content')).toBeInTheDocument();
  });

  it('applies default card styles', () => {
    const { container } = render(<Card>Content</Card>);
    const card = container.firstChild;
    expect(card).toHaveClass('rounded-lg', 'bg-white', 'p-6', 'border');
  });

  it('applies hover effect when hover prop is true', () => {
    const { container } = render(<Card hover>Hover card</Card>);
    const card = container.firstChild;
    expect(card).toHaveClass('hover:shadow-lg', 'hover:border-gold');
  });

  it('does not apply hover effect when hover prop is false', () => {
    const { container } = render(<Card hover={false}>No hover</Card>);
    const card = container.firstChild;
    expect(card).not.toHaveClass('hover:shadow-lg');
  });

  it('applies custom className', () => {
    const { container } = render(<Card className="custom-card">Content</Card>);
    const card = container.firstChild;
    expect(card).toHaveClass('custom-card');
  });

  it('renders with custom border color', () => {
    const { container } = render(<Card className="border-gold">Bordered</Card>);
    const card = container.firstChild;
    expect(card).toHaveClass('border-gold');
  });

  it('has transition styles by default', () => {
    const { container } = render(<Card>Content</Card>);
    const card = container.firstChild;
    expect(card).toHaveClass('transition-all', 'duration-200');
  });
});
