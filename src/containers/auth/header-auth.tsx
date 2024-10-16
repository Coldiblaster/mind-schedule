import { useRouter, useSearchParams } from 'next/navigation';

import { CompanyLogo } from '@/components/company-logo';
import { ThemeToggle } from '@/components/theme/theme-toggle';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface HeaderAuthProps {
  className?: string;
}

export const HeaderAuth = ({ className }: HeaderAuthProps) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const isRegister = searchParams.get('register') === 'true';

  return (
    <div
      className={cn(
        'z-10 flex w-full justify-between gap-2 md:w-auto md:justify-end',
        className,
      )}
    >
      <div className="flex items-center gap-2 md:hidden">
        <CompanyLogo />
        <span className="font-semibold">mind.schedule</span>
      </div>

      <div className="flex items-center gap-2 md:gap-4">
        {isRegister && (
          <Button variant="ghost" onClick={() => router.push('/')}>
            Fazer login
          </Button>
        )}
        <ThemeToggle />
      </div>
    </div>
  );
};
