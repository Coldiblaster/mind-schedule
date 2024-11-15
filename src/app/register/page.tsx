'use client';

import { ScrollArea } from '@/components/ui/scroll-area';
import { SignUp } from '@/containers/auth/sign-up';
import { LandingPage } from '@/containers/landing-page';

export default function Auth() {
  return (
    <>
      <ScrollArea className="fixed h-svh w-full transform bg-white px-4 transition-transform duration-700 ease-in-out dark:bg-black md:relative md:w-1/2 md:translate-x-full md:px-8">
        <SignUp />
      </ScrollArea>
      <ScrollArea className="z-20 hidden h-full w-full transform overflow-x-hidden bg-slate-100 transition-transform duration-700 ease-in-out dark:bg-background md:fixed md:right-0 md:mt-0 md:flex md:h-screen md:w-1/2 md:-translate-x-full md:overflow-y-auto">
        <LandingPage />
      </ScrollArea>
    </>
  );
}
