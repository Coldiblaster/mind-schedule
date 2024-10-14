'use client';

import { useAuth } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const LoginCallback = () => {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const { userId, isLoaded } = useAuth();

  // useEffect(() => {
  //   // Certifique-se de que os dados do Clerk estão carregados
  //   if (isLoaded && userId) {
  //     const signIntoFirebaseWithClerk = async () => {
  //       const token = await getToken({ template: 'integration_firebase' });

  //       await signInWithCustomToken(auth, token || '');
  //       setLoading(false);
  //       // Redireciona para o dashboard após a autenticação
  //       router.push('/dashboard');
  //     };

  //     signIntoFirebaseWithClerk();
  //   }
  // }, [isLoaded, userId, router]);

  useEffect(() => {
    // Certifique-se de que os dados do Clerk estão carregados
    if (isLoaded && userId) {
      const simulateFirebaseSignIn = () => {
        // Simula um atraso de 2 segundos
        setTimeout(() => {
          // Redireciona para o dashboard após a simulação
          setLoading(true);
          router.push('/dashboard');
        }, 2000);
      };

      simulateFirebaseSignIn();
    }
  }, [isLoaded, userId, router]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-center">
          <svg
            className="mx-auto h-10 w-10 animate-spin text-blue-600"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              fill="none"
              strokeWidth="4"
              stroke="currentColor"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 0 1 16 0 8 8 0 0 1-16 0z"
            />
          </svg>
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
