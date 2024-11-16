'use client';

import { ScrollArea } from '@/components/ui/scroll-area';
import { SignUp } from '@/containers/auth/sign-up';
import { LandingPage } from '@/containers/landing-page';

export default function Auth() {
  return (
    <>
      <ScrollArea className="z-20 hidden h-full w-full overflow-x-hidden bg-slate-100 dark:bg-background md:fixed md:right-0 md:mt-0 md:flex md:h-screen md:w-1/2 md:overflow-y-auto">
        <LandingPage />
      </ScrollArea>
      <ScrollArea className="fixed h-svh w-full animate-fade bg-white px-4 dark:bg-black md:relative md:w-1/2 md:px-8">
        <SignUp />
      </ScrollArea>
    </>
  );
}
