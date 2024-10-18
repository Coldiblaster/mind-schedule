'use client';

import { useSignIn, useSignUp } from '@clerk/nextjs';
import { OAuthStrategy } from '@clerk/types';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { Icon } from '@/components/icon';
import { Button } from '@/components/ui/button';

import { HeaderAuth } from '../header-auth';

export function SignIn() {
  const { signIn } = useSignIn();
  const { signUp } = useSignUp();
  const router = useRouter();

  if (!signIn || !signUp) return null;

  const signInWith = (strategy: OAuthStrategy) => {
    return signIn.authenticateWithRedirect({
      strategy,
      redirectUrl: '/login-callback',
      redirectUrlComplete: '/login-callback',
    });
  };

  async function handleSignIn(strategy: OAuthStrategy) {
    if (!signIn || !signUp) return null;

    // Verifica se o usuário precisa de uma conta nova
    const userNeedsToBeCreated =
      signIn.firstFactorVerification.status === 'transferable';

    if (userNeedsToBeCreated) {
      // Cria a conta do usuário com OAuth e redireciona
      await signUp.authenticateWithRedirect({
        strategy,
        redirectUrl: '/login-callback',
        redirectUrlComplete: '/login-callback',
      });
    } else {
      // Se o usuário já tem uma conta, faz o login com OAuth
      signInWith(strategy);
    }
  }

  const goToRegister = () => {
    router.push('/?register=true');
  };

  return (
    <div className="relative flex h-full w-full animate-fade justify-center py-4 animate-delay-150 animate-duration-500 md:py-8">
      <HeaderAuth className="absolute md:right-0" />
      <div className="flex max-w-[350px] flex-col justify-center gap-6">
        <div className="flex flex-col gap-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">Login</h1>
          <p className="text-sm text-muted-foreground">
            Gerencie sua agenda, finanças e mais em um só lugar.
          </p>
        </div>

        <Button
          variant="outline"
          className="flex w-full gap-2"
          onClick={() => handleSignIn('oauth_google')}
        >
          <Image
            src="/logos/icons8-google.svg"
            width={24}
            height={24}
            alt="Logo google"
          />
          Faça login com o Google
        </Button>

        <div className="flex flex-col space-y-4">
          <div className="text-center text-sm text-foreground">
            Não tem uma conta?
            <Button
              variant="link"
              className="h-auto px-2"
              onClick={() => goToRegister()}
            >
              Criar conta grátis
            </Button>
          </div>
          <div className="text-center text-xs text-gray-500">
            Ideal para profissionais de saúde, beleza, e prestadores de
            serviços.
            <Button
              variant="link"
              className="h-auto px-1 py-0"
              onClick={() => goToRegister()}
            >
              Saiba mais e cadastre sua empresa
            </Button>
          </div>
        </div>
      </div>

      <Link
        href="#landing-page"
        className="absolute bottom-8 rounded-full bg-primary/80 text-white md:hidden"
      >
        <Icon
          name="MdKeyboardArrowDown"
          size={32}
          className="animate-bounce pt-0 animate-delay-200 animate-duration-1000"
        />
        <span className="sr-only">Scroll down for more content</span>
      </Link>
    </div>
  );
}
