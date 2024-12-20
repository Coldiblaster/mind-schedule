'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { ThemeProvider } from '@/components/theme/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import { AuthPermissionsProvider } from '@/hooks/use-auth-permissions';

interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  const queryClient = new QueryClient();

  return (
    <ThemeProvider defaultTheme="dark" storageKey="mind-schedule-theme">
      <QueryClientProvider client={queryClient}>
        <AuthPermissionsProvider>
          {children}

          <Toaster />
        </AuthPermissionsProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
