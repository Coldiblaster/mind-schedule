import { AccountMenu } from './account-menu';
import { SidebarMobile } from './sidebar/mobile';
import { ThemeToggle } from './theme/theme-toggle';

export function Header() {
  return (
    <div className="border-b">
      <div className="flex h-20 items-center gap-4 px-6 md:gap-6">
        <SidebarMobile />

        <div className="ml-auto flex items-center gap-2">
          <ThemeToggle />
          <AccountMenu />
        </div>
      </div>
    </div>
  );
}
