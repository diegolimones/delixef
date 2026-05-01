import React from 'react';
import { render } from '@testing-library/react';
import Container from '@/components/Container';

describe('Container Component', () => {
  it('renders children', () => {
    const { getByText } = render(<Container>Test content</Container>);
    expect(getByText('Test content')).toBeInTheDocument();
  });

  it('applies container styles', () => {
    const { container } = render(<Container>Content</Container>);
    const div = container.firstChild;
    expect(div).toHaveClass('max-w-7xl', 'mx-auto', 'px-4');
  });

  it('applies custom className', () => {
    const { container } = render(
      <Container className="text-center">Centered</Container>
    );
    const div = container.firstChild;
    expect(div).toHaveClass('text-center');
  });

  it('combines default and custom classes', () => {
    const { container } = render(
      <Container className="custom-class">Content</Container>
    );
    const div = container.firstChild;
    expect(div).toHaveClass('max-w-7xl');
    expect(div).toHaveClass('custom-class');
  });
});
