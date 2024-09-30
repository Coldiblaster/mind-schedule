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
      <div className="flex min-h-screen w-full">
        <SidebarDesktop />

        <div className="flex w-full flex-col">
          <Header />
          <div className="flex flex-1 flex-col gap-4 p-8 pt-6">{children}</div>
        </div>
      </div>
    </TooltipProvider>
  );
}
