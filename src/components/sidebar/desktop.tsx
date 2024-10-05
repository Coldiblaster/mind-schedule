'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { MenuData } from '@/data/menu';

import { Icon } from '../icon';

export function SidebarDesktop() {
  const currentPath = usePathname();

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

        {MenuData.map(({ title, link, icon }, index) => {
          const isActive = currentPath === link;

          return (
            <Tooltip key={index}>
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
          );
        })}
      </nav>
    </aside>
  );
}
