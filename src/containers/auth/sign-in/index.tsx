'use client';

import { useSignIn, useSignUp } from '@clerk/nextjs';
import { OAuthStrategy } from '@clerk/types';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

import SignInForm from '@/app/sign-in/[[...sign-in]]';
import SignUpForm from '@/app/sign-up/[[...sign-up]]';
import { Icon } from '@/components/icon';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { tabContent } from '@/data/auth';

import { HeaderAuth } from '../header-auth';
import { Header } from './header';

export function SignInPage() {
  const { signIn } = useSignIn();
  const { signUp } = useSignUp();
  const [activeTab, setActiveTab] = useState<'signIn' | 'signUp'>('signIn');
  // const router = useRouter();

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

  // const goToRegister = () => {
  //   router.push('/?register=true');
  // };

  return (
    <div
      data-animation={activeTab}
      className="group relative flex h-full w-full justify-center py-4 transition-all md:py-8"
    >
      <HeaderAuth className="absolute md:right-0" />

      <div className="flex max-w-[350px] flex-col justify-center gap-6">
        <div className="flex flex-col gap-2 group-data-[animation=signIn]:animate-fade-right group-data-[animation=signUp]:animate-fade-left">
          {activeTab === 'signIn' ? (
            <Header {...tabContent.signIn} />
          ) : (
            <Header {...tabContent.signUp} />
          )}
        </div>

        <Button
          variant="outline"
          className="flex w-full gap-2 group-data-[animation=signIn]:animate-fade-right group-data-[animation=signUp]:animate-fade-left"
          onClick={() => handleSignIn('oauth_google')}
        >
          <Image
            src="/logos/icons8-google.svg"
            width={24}
            height={24}
            alt="Logo google"
          />
          {activeTab === 'signIn'
            ? 'Faça login com o Google'
            : 'Criar conta com o Google'}
        </Button>

        <div className="inline-flex w-full items-center justify-center">
          <hr className="my-3 h-1 w-64 rounded border-0 bg-gray-200 dark:bg-gray-700" />
          <p className="absolute left-1/2 -translate-x-1/2 bg-white px-4 text-center text-muted-foreground dark:bg-black">
            ou
          </p>
        </div>

        <Tabs defaultValue="signIn" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="signIn" onClick={() => setActiveTab('signIn')}>
              Entrar
            </TabsTrigger>
            <TabsTrigger value="signUp" onClick={() => setActiveTab('signUp')}>
              Cadastrar
            </TabsTrigger>
          </TabsList>
          <TabsContent
            className="group-data-[animation=signIn]:animate-fade-right group-data-[animation=signUp]:animate-fade-left"
            value="signIn"
          >
            <SignInForm />
          </TabsContent>
          <TabsContent
            className="group-data-[animation=signIn]:animate-fade-right group-data-[animation=signUp]:animate-fade-left"
            value="signUp"
          >
            <SignUpForm />
          </TabsContent>
        </Tabs>

        <div className="flex flex-col space-y-4">
          <div className="text-center text-xs text-gray-500">
            Ideal para profissionais de saúde, beleza, e prestadores de
            serviços.
            <Button variant="link" className="h-auto px-1 py-0">
              Saiba mais e cadastre sua empresa
            </Button>
            <div className="mt-4">
              Conheça também nossos{' '}
              <Link href="/termos-de-uso" className="text-primary">
                termos de uso
              </Link>{' '}
              e nossa{' '}
              <Link href="/politicas-de-privacidade" className="text-primary">
                política de privacidade
              </Link>
              .
            </div>
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
