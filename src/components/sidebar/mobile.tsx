'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { MenuData } from '@/data/menu';
import { useAuthPermissions } from '@/hooks/use-auth-permissions';

import { CompanyLogo } from '../company-logo';
import { Icon } from '../icon';
import { PermissionWrapper } from '../permission-wrapper';

export function SidebarMobile() {
  const currentPath = usePathname();
  const { isLoading } = useAuthPermissions();

  return (
    <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
      <Sheet>
        <SheetTrigger asChild>
          <Button size="icon" variant="outline" className="sm:hidden">
            <Icon name="LuPanelLeft" className="h-5 w-5" />

            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="sm:max-w-xs">
          <nav className="grid gap-4 text-lg font-medium">
            <Link href="#" className="group">
              <CompanyLogo
                width={40}
                height={40}
                className="transition-all group-hover:scale-110"
              />

              <span className="sr-only">mind.schedule</span>
            </Link>

            {isLoading ? (
              <div className="h-9 w-9 animate-pulse rounded-lg bg-muted-foreground md:h-8 md:w-8" />
            ) : (
              <>
                {MenuData.map(
                  ({ title, link, icon, allowedUserTypes }, index) => {
                    const isActive = currentPath === link;

                    return (
                      <PermissionWrapper
                        key={index}
                        allowedUserTypes={allowedUserTypes}
                      >
                        <Link
                          key={index}
                          href={link}
                          className={`${isActive && 'rounded-lg bg-accent'} flex h-9 items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground`}
                        >
                          <Icon className="h-5 w-5" name={icon} />
                          {title}
                        </Link>
                      </PermissionWrapper>
                    );
                  },
                )}
              </>
            )}
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  );
}
