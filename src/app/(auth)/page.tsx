'use client';

import { ScrollArea } from '@/components/ui/scroll-area';
import { SignInPage } from '@/containers/auth/sign-in';
import { LandingPage } from '@/containers/landing-page';

export default function Auth() {
  return (
    <>
      <ScrollArea className="fixed h-svh w-full bg-white px-4 dark:bg-black md:relative md:w-1/2 md:px-8">
        <SignInPage />
      </ScrollArea>
      <ScrollArea className="z-20 h-full w-full overflow-x-hidden bg-slate-100 duration-700 ease-in-out dark:bg-background md:fixed md:right-0 md:mt-0 md:h-screen md:w-2/3 md:overflow-y-auto">
        <LandingPage />
      </ScrollArea>
    </>
  );
}
