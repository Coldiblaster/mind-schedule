'use client';

import { useClerk } from '@clerk/nextjs';
import { ChevronDown, LogOut, UserRoundPen } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { Avatar, AvatarImage } from './ui/avatar';
import { Skeleton } from './ui/skeleton';

export function AccountMenu() {
  const { signOut, user } = useClerk();

  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="flex max-w-[200px] select-none items-center gap-2 md:max-w-[300px]"
          >
            <div className="flex items-center gap-2">
              <Avatar className="h-7 w-7">
                {user?.imageUrl ? (
                  <AvatarImage src={user?.imageUrl} />
                ) : (
                  <Skeleton className="h-7 w-7 rounded-full" />
                )}
              </Avatar>

              {user?.fullName || user?.emailAddresses[0] ? (
                <span className="max-w-[100px] overflow-hidden truncate text-ellipsis whitespace-nowrap md:max-w-[140px] lg:max-w-full">
                  {user.fullName
                    ? user.fullName
                    : user?.emailAddresses[0].emailAddress}
                </span>
              ) : (
                <Skeleton className="h-5 w-20" />
              )}
            </div>
            <ChevronDown className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel className="flex flex-col">
            {user?.emailAddresses ? (
              <span className="text-sm font-normal text-muted-foreground">
                {user?.emailAddresses[0].emailAddress}
              </span>
            ) : (
              <Skeleton className="h-5 w-full" />
            )}
          </DropdownMenuLabel>

          <DropdownMenuSeparator />
          <DialogTrigger asChild>
            <DropdownMenuItem>
              <UserRoundPen className="mr-2 h-4 w-4" />
              <span>Meus Dados</span>
            </DropdownMenuItem>
          </DialogTrigger>
          <DropdownMenuItem
            onClick={() => signOut()}
            className="text-rose-500 dark:text-rose-400"
          >
            <LogOut className="mr-2 h-4 w-4" />
            <span>Sair</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </Dialog>
  );
}
