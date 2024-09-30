import { Brain } from 'lucide-react';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="grid min-h-screen md:grid-cols-2">
      <div className="hidden h-full flex-col justify-between border-r border-foreground/60 bg-muted p-10 text-muted-foreground md:flex">
        <div className="flex items-center gap-3 text-lg text-foreground">
          <Brain className="h-5 w-5" />
          <span className="font-semibold">mind.schedule</span>
        </div>
      </div>

      <div className="relative flex flex-col items-center justify-center">
        {children}
      </div>

      <footer className="absolute bottom-10 left-8 text-xs md:left-10 md:text-sm">
        Painel de Consultas &copy; mind.schedule - {new Date().getFullYear()}
      </footer>
    </div>
  );
}
