// components/PermissionWrapper.tsx

import React, { ReactNode } from 'react';

import { useAuthPermissions } from '@/hooks/use-auth-permissions';
import { UserTypes } from '@/types/user-types'; // Ajuste o caminho conforme necessário

interface PermissionWrapperProps {
  allowedUserTypes: UserTypes[]; // Usando o enum aqui
  children: ReactNode; // Conteúdo a ser exibido se a permissão for concedida
}

export const PermissionWrapper = ({
  allowedUserTypes,
  children,
}: PermissionWrapperProps) => {
  const { userType } = useAuthPermissions();

  // Verifica se o tipo de usuário está na lista de tipos permitidos
  if (allowedUserTypes.includes(userType as UserTypes)) {
    return <>{children}</>; // Renderiza o conteúdo se a permissão for concedida
  }

  return null; // Pode retornar null ou um componente de mensagem de erro
};
