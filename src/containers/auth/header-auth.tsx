import { useClerk } from '@clerk/nextjs';
import { usePathname } from 'next/navigation';

import { CompanyLogo } from '@/components/company-logo';
import { ThemeToggle } from '@/components/theme/theme-toggle';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface HeaderAuthProps {
  className?: string;
}

export const HeaderAuth = ({ className }: HeaderAuthProps) => {
  const pathname = usePathname();

  const { signOut } = useClerk();

  const isRegister = pathname === '/register';

  return (
    <div
      className={cn(
        'z-10 flex w-full justify-between gap-2 md:w-auto md:justify-end',
        className,
      )}
    >
      <div className="flex items-center gap-2 md:hidden">
        <CompanyLogo />
        <span className="font-semibold">Mind Schedule</span>
      </div>

      <div className="mr-1 flex items-center gap-2 md:gap-4">
        {isRegister && (
          <Button variant="ghost" onClick={() => signOut()}>
            Sair
          </Button>
        )}
        <ThemeToggle />
      </div>
    </div>
  );
};
