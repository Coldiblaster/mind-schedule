import { LandingPage } from '@/containers/landing-page';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="grid min-h-screen grid-rows-2 md:grid-cols-2">
      <div className="relative flex flex-col items-center justify-center">
        {children}
      </div>
      {/* <div className="hidden h-full flex-col justify-between border-r border-foreground/60 bg-muted p-10 text-muted-foreground md:flex">
         <div className="flex items-center gap-3 text-lg text-foreground">
          <Icon name="LuBrain" className="h-5 w-5" />
          <span className="font-semibold">mind.schedule</span>
        </div>
      </div> */}
      <div className="fixed right-0 z-20 h-screen w-1/2 translate-x-0 transform overflow-y-auto overflow-x-hidden bg-muted transition-transform duration-700 ease-in-out">
        <LandingPage />
      </div>
    </div>
  );
}
