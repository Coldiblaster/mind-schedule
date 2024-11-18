'use client';

import { useAuth } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { CompanyLogo } from '@/components/company-logo';
import { useAuthPermissions } from '@/hooks/use-auth-permissions';
import { usePutMetadata } from '@/services/putUserMetadata';
import { UserTypes } from '@/types/user-types';

const LoginCallback = () => {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const { userId } = useAuth();
  const { companyDataCompleted, isLoading } = useAuthPermissions();

  const useSaveMetadata = usePutMetadata({
    userId,
    companyDataCompleted,
    userType: UserTypes.PROFESSIONAL,
  });

  useEffect(() => {
    if (!isLoading && userId) {
      if (companyDataCompleted) {
        router.push('/dashboard');
      } else {
        useSaveMetadata.mutate();
        router.push('/register');
      }

      setLoading(false);
    }
  }, [companyDataCompleted, userId]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-center">
          <CompanyLogo width={140} height={140} loading className="mx-auto" />

          <h1 className="mt-4 text-xl font-semibold text-accent-foreground">
            Carregando, por favor aguarde...
          </h1>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center">
        <h1 className="mb-4 text-2xl font-bold text-accent-foreground">
          Redirecionando...
        </h1>
        <p className="text-accent-foreground/80">
          Você será redirecionado para o painel em instantes.
        </p>
      </div>
    </div>
  );
};

export default LoginCallback;
