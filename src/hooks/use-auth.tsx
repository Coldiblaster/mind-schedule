import { useClerk } from '@clerk/nextjs';
import { useEffect } from 'react';
import { create, useStore } from 'zustand';

export interface UseAuthStoreProps {
  token: string;
  setToken: (token: string) => void;
}

export const useAuthStore = create<UseAuthStoreProps>(set => ({
  token: '',
  setToken: (token: string) => {
    set({ token });
  },
}));

export function useAuth() {
  const { session } = useClerk();
  const { token, setToken } = useStore(useAuthStore);

  useEffect(() => {
    if (!session) return;

    session
      .getToken({
        template: 'development-jwt',
      })
      .then(async jwt => {
        if (!jwt) return await Promise.reject(new Error('Token invalido'));
        setToken(jwt);
      });
  }, [session]);

  return { token };
}
