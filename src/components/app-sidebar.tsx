'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { MenuData } from '@/data/menu';
import { useAuthPermissions } from '@/hooks/use-auth-permissions';

import { CompanyLogo } from './company-logo';
import { Icon } from './icon';

export function AppSidebar() {
  const currentPath = usePathname();
  const { isLoading } = useAuthPermissions();

  return (
    <>
      {isLoading ? (
        <div className="h-9 w-9 animate-pulse rounded-lg bg-muted-foreground md:h-8 md:w-8" />
      ) : (
        <Sidebar>
          <SidebarHeader />

          <SidebarContent>
            <SidebarGroup>
              <Link href="/" className="group">
                <CompanyLogo className="transition-all group-hover:scale-110" />
                <span className="sr-only">Toggle Menu</span>
              </Link>
            </SidebarGroup>
            {MenuData.map(({ title, link, icon, allowedUserTypes }, index) => {
              const isActive = currentPath === link;
              return (
                <SidebarGroup key={index}>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                          <Link
                            href={link}
                            className={`${isActive && 'bg-accent'} flex items-center rounded-lg text-muted-foreground transition-colors hover:text-foreground`}
                          >
                            <Icon name={icon} className="h-5 w-5" />
                            <div>{title}</div>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    </SidebarMenu>
                  </SidebarGroupContent>
                </SidebarGroup>
              );
            })}
          </SidebarContent>
          <SidebarFooter />
        </Sidebar>
      )}
    </>
  );
}
