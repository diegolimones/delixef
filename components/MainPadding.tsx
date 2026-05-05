'use client';

import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

export default function MainPadding({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith('/admin');

  return (
    <main className={`flex-1 ${isAdmin ? '' : 'pt-20 md:pt-24'}`}>
      {children}
    </main>
  );
}
