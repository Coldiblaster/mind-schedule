/* eslint-disable prettier/prettier */
import { LandingPage } from '@/containers/landing-page';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="m-auto flex min-h-screen overflow-auto w-full flex-col md:flex-row">
      <div className="w-full h-svh md:w-1/2 fixed md:relative">{children}</div>
      <div className={`
          md:fixed right-0 z-20 md:h-screen w-full translate-x-0
          transform md:overflow-y-auto overflow-x-hidden bg-muted
          transition-transform duration-700 ease-in-out
          md:mt-0 md:w-1/2 relative h-full mt-[100vh]
        `}>
        <LandingPage />
      </div>
    </div>
  );
}
