import { Brain } from 'lucide-react';

import { AccountMenu } from './account-menu';
import { ThemeToggle } from './theme/theme-toggle';
import { Separator } from './ui/separator';

export function Header() {
  return (
    <div className="border-b">
      <div className="flex h-20 items-center gap-4 px-6 md:gap-6">
        <Brain className="h-6 w-6" />

        <Separator orientation="vertical" className="h-8" />

        <div className="ml-auto flex items-center gap-2">
          <ThemeToggle />
          <AccountMenu />
        </div>
      </div>
    </div>
  );
}
