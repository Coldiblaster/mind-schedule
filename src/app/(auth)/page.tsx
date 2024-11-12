'use client';

import { useSearchParams } from 'next/navigation';

import { ScrollArea } from '@/components/ui/scroll-area';
import { SignInPage } from '@/containers/auth/sign-in';
import { SignUp } from '@/containers/auth/sign-up';
import { LandingPage } from '@/containers/landing-page';

export default function Auth() {
  const searchParams = useSearchParams();
  const isRegister = searchParams.get('register') === 'true';

  return (
    <>
      <ScrollArea
        className={`${isRegister ? 'md:translate-x-full' : 'md:translate-x-0'} fixed h-svh w-full transform bg-white px-4 transition-transform duration-700 ease-in-out dark:bg-black md:relative md:w-1/2 md:px-8`}
      >
        {isRegister ? <SignUp /> : <SignInPage />}
      </ScrollArea>
      <ScrollArea
        className={`${isRegister && 'hidden md:flex'} z-20 h-full w-full transform overflow-x-hidden bg-slate-100 transition-transform duration-700 ease-in-out dark:bg-background md:fixed md:right-0 md:mt-0 md:h-screen md:w-2/3 md:overflow-y-auto ${isRegister ? 'md:-translate-x-full' : 'md:translate-x-0'} `}
      >
        <LandingPage />
      </ScrollArea>
    </>
  );
}
