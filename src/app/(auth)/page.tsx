'use client';

import { useSearchParams } from 'next/navigation';

import { SignIn } from '@/containers/auth/sign-in';
import { SignUp } from '@/containers/auth/sign-up';
import { LandingPage } from '@/containers/landing-page';

export default function Auth() {
  const searchParams = useSearchParams();
  const isRegister = searchParams.get('register') === 'true';

  return (
    <>
      <div
        className={`transform ${isRegister ? 'md:translate-x-full' : 'md:translate-x-0'} fixed h-screen w-full transition-transform duration-700 ease-in-out md:relative md:w-1/2`}
      >
        {isRegister ? <SignUp /> : <SignIn />}
      </div>
      <div
        className={`relative right-0 z-20 mt-[100vh] h-full w-full transform overflow-x-hidden bg-muted transition-transform duration-700 ease-in-out md:fixed md:mt-0 md:h-screen md:w-1/2 md:overflow-y-auto ${isRegister ? 'md:-translate-x-full' : 'md:translate-x-0'} `}
      >
        <LandingPage />
      </div>
    </>
  );
}
