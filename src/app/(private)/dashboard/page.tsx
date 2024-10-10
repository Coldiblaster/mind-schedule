'use client';

import { DashboardPatient } from '@/containers/dashboard/patient';
import { DashboardProfessional } from '@/containers/dashboard/professional';
import { useAuthPermissions } from '@/hooks/use-auth-permissions';
import { UserTypes } from '@/types/user-types';

export default function Home() {
  const { isLoading, userType } = useAuthPermissions();

  if (isLoading) {
    return <h1>Carregando...</h1>;
  }

  const DashboardComponent =
    userType === UserTypes.PROFESSIONAL
      ? DashboardProfessional
      : DashboardPatient;

  return <DashboardComponent />;
}
