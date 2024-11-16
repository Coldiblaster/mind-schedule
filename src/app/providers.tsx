'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';

import { ThemeProvider } from '@/components/theme/theme-provider';
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
          <Toaster
            position="top-right"
            toastOptions={{
              success: {
                className:
                  '!bg-white !border dark:text-white !border-input dark:!border-slate-900 dark:!bg-background',
              },
              error: {
                className:
                  '!bg-white !border dark:text-white !border-input dark:!border-slate-900 dark:!bg-background',
              },
            }}
          />
        </AuthPermissionsProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
