'use client';

import { useClerk } from '@clerk/nextjs';
import { createContext, type ReactNode, useContext, useMemo } from 'react';

import { useUserMetadata } from '@/services/getUserMetadata';
import { UserPrivateMetadata } from '@/types/user-types';

interface AuthPermissionsContextType extends UserPrivateMetadata {
  isLoading: boolean; // Estado de carregamento baseado no React Query
}

interface AuthPermissionsProviderProps {
  children: ReactNode;
}

const AuthPermissionsContext = createContext<
  AuthPermissionsContextType | undefined
>(undefined);

const AuthPermissionsProvider = ({
  children,
}: AuthPermissionsProviderProps) => {
  const { user } = useClerk();

  // Hook para buscar os metadados do usuário
  const { data: userMetadata, isPending: isLoading } = useUserMetadata(
    user?.id,
  );

  // Determinar o tipo de usuário ou null se ainda não carregou
  const userType = userMetadata?.userType;
  const companyDataCompleted = userMetadata?.companyDataCompleted;

  const value = useMemo(
    () => ({
      userType,
      isLoading,
      companyDataCompleted,
    }),
    [userType, isLoading, companyDataCompleted],
  );

  return (
    <AuthPermissionsContext.Provider value={value}>
      {children}
    </AuthPermissionsContext.Provider>
  );
};

const useAuthPermissions = (): AuthPermissionsContextType => {
  const context = useContext(AuthPermissionsContext);
  if (!context) {
    throw new Error(
      'useAuthPermissions must be used within an AuthPermissionsProvider',
    );
  }
  return context;
};

export { AuthPermissionsProvider, useAuthPermissions };
