import { Header } from '@/components/header';
import { SidebarDesktop } from '@/components/sidebar/desktop';
import { TooltipProvider } from '@/components/ui/tooltip';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <TooltipProvider>
      <div className="flex min-h-svh w-full">
        <SidebarDesktop />

        <div className="flex w-full flex-col">
          <Header />
          {children}
        </div>
      </div>
    </TooltipProvider>
  );
}
