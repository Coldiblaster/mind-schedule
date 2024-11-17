'use client';

import { ScrollArea } from '@/components/ui/scroll-area';
import { SignUp } from '@/containers/auth/sign-up';
import { LandingPage } from '@/containers/landing-page';

export default function Auth() {
  return (
    <>
      <ScrollArea className="z-20 hidden h-full w-full overflow-x-hidden bg-slate-100 dark:bg-background lg:fixed lg:mt-0 lg:flex lg:h-screen lg:w-1/2 lg:overflow-y-auto">
        <LandingPage />
      </ScrollArea>
      <ScrollArea className="fixed h-svh w-full animate-fade bg-white px-4 dark:bg-black md:relative md:px-8 lg:w-1/2">
        <SignUp />
      </ScrollArea>
    </>
  );
}
