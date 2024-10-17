'use client';

import { useSearchParams } from 'next/navigation';

import { ScrollArea } from '@/components/ui/scroll-area';
import { SignIn } from '@/containers/auth/sign-in';
import { SignUp } from '@/containers/auth/sign-up';
import { LandingPage } from '@/containers/landing-page';

export default function Auth() {
  const searchParams = useSearchParams();
  const isRegister = searchParams.get('register') === 'true';

  return (
    <>
      <ScrollArea
        className={`${isRegister ? 'md:translate-x-full' : 'md:translate-x-0'} fixed h-svh w-full transform bg-white p-4 transition-transform duration-700 ease-in-out dark:bg-black md:relative md:w-1/2 md:p-8`}
      >
        {isRegister ? <SignUp /> : <SignIn />}
      </ScrollArea>
      <ScrollArea
        className={`${isRegister && 'hidden md:flex'} relative right-0 z-20 mt-[100vh] h-full w-full transform overflow-x-hidden bg-slate-100 transition-transform duration-700 ease-in-out dark:bg-background md:fixed md:mt-0 md:h-screen md:w-1/2 md:overflow-y-auto ${isRegister ? 'md:-translate-x-full' : 'md:translate-x-0'} `}
      >
        <LandingPage />
      </ScrollArea>
    </>
  );
}
