describe('Utility Functions', () => {
  describe('Date Formatting', () => {
    it('formats date correctly', () => {
      const date = new Date('2026-05-01T10:00:00Z');
      const formatted = date.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
      expect(formatted).toContain('2026');
    });
  });

  describe('Price Formatting', () => {
    it('formats price with Euro symbol', () => {
      const price = 45.5;
      const formatted = `€${price.toFixed(2)}`;
      expect(formatted).toBe('€45.50');
    });

    it('handles whole numbers', () => {
      const price = 100;
      const formatted = `€${price.toFixed(2)}`;
      expect(formatted).toBe('€100.00');
    });

    it('rounds decimal numbers', () => {
      const price = 99.999;
      const formatted = `€${price.toFixed(2)}`;
      expect(formatted).toBe('€100.00');
    });
  });

  describe('String Validation', () => {
    it('validates email format', () => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      expect(emailRegex.test('user@example.com')).toBe(true);
      expect(emailRegex.test('invalid.email')).toBe(false);
    });

    it('checks if string is empty', () => {
      expect(''.trim().length === 0).toBe(true);
      expect('text'.trim().length === 0).toBe(false);
    });
  });

  describe('Array Operations', () => {
    it('filters available items', () => {
      const items = [
        { id: 1, available: true },
        { id: 2, available: false },
        { id: 3, available: true },
      ];
      const filtered = items.filter((item) => item.available);
      expect(filtered).toHaveLength(2);
      expect(filtered[0].id).toBe(1);
    });

    it('sorts items alphabetically', () => {
      const items = ['Cena', 'Desayuno', 'Comida'];
      const sorted = [...items].sort();
      expect(sorted[0]).toBe('Cena');
    });
  });

  describe('Object Transformation', () => {
    it('converts form data correctly', () => {
      const formData = {
        name: 'John',
        email: 'john@example.com',
        phone: '+34 123',
      };
      const cleaned = Object.entries(formData).reduce(
        (acc, [key, value]) => ({
          ...acc,
          [key]: (value as string).trim(),
        }),
        {}
      );
      expect(cleaned.name).toBe('John');
    });
  });
});
