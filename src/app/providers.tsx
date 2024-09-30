'use client';

import { ThemeProvider } from '@/components/theme/theme-provider';

interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="pizzashop-theme">
      {children}
    </ThemeProvider>
  );
}
