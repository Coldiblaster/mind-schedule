'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Fragment } from 'react';

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { MenuData } from '@/data/menu';
import { useAuthPermissions } from '@/hooks/use-auth-permissions';

import { Icon } from '../icon';
import { PermissionWrapper } from '../permission-wrapper';

export function SidebarDesktop() {
  const currentPath = usePathname();
  const { isLoading } = useAuthPermissions();

  return (
    <aside className="z-10 hidden w-14 flex-col border-r bg-background sm:flex">
      <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
        <Link
          href="#"
          className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
        >
          <Icon
            name="LuBrain"
            className="h-4 w-4 transition-all group-hover:scale-110"
          />
          <span className="sr-only">Toggle Menu</span>
        </Link>

        {isLoading ? (
          <div className="h-9 w-9 animate-pulse rounded-lg bg-muted-foreground md:h-8 md:w-8" />
        ) : (
          <>
            {MenuData.map(({ title, link, icon, allowedUserTypes }, index) => {
              const isActive = currentPath === link;

              return (
                <PermissionWrapper
                  key={index}
                  allowedUserTypes={allowedUserTypes}
                >
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link
                        href={link}
                        className={`${isActive && 'bg-accent'} flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8`}
                      >
                        <Icon name={icon} className="h-5 w-5" />
                        <span className="sr-only">{title}</span>
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent side="right">{title}</TooltipContent>
                  </Tooltip>
                </PermissionWrapper>
              );
            })}
          </>
        )}
      </nav>
    </aside>
  );
}
