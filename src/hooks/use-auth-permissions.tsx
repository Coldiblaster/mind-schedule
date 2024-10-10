// src/context/AuthPermissionsProvider.tsx

'use client';

import { useClerk } from '@clerk/nextjs';
import React, {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

import { useUserMetadata } from '@/services/user'; // Importando o hook para obter metadados do usuário
import { UserTypes } from '@/types/user-types'; // Importando o tipo ou enum de tipos de usuários

interface AuthPermissionsContextType {
  userType: UserTypes; // Atualizando para usar o enum UserTypes
  isLoading: boolean;
}

interface AuthFormContextProviderProps {
  children: ReactNode;
}

const AuthPermissionsContext = createContext<
  AuthPermissionsContextType | undefined
>(undefined); // Definindo o contexto como indefinido inicialmente

const AuthPermissionsProvider = ({
  children,
}: AuthFormContextProviderProps) => {
  const { user } = useClerk();

  // Usando o hook de serviço para obter metadados do usuário
  const { data: userMetadata } = useUserMetadata(user?.id);

  const [isLoading, setIsLoading] = useState(true);

  // Verificando se o usuário é um profissional ou paciente
  const userType = userMetadata?.userType as UserTypes; // Assegurando que userType seja do tipo UserTypes

  useEffect(() => {
    if (userType) setIsLoading(false);
  }, [userType]);

  return (
    <AuthPermissionsContext.Provider
      value={{
        userType, // Adicionando userType ao contexto
        isLoading,
      }}
    >
      {children}
    </AuthPermissionsContext.Provider>
  );
};

// Atualizando o hook useAuth
const useAuthPermissions = () => {
  const context = useContext(AuthPermissionsContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthPermissionsProvider');
  }
  return context;
};

export { AuthPermissionsProvider, useAuthPermissions };
