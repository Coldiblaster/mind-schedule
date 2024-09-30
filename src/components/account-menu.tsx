import { ChevronDown, LogOut, UserRoundPen } from 'lucide-react';
import Link from 'next/link';

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

export function AccountMenu() {
  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="flex select-none items-center gap-2"
          >
            <div className="flex flex-col items-start">
              <span>Joe Due</span>
            </div>
            <ChevronDown className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel className="flex flex-col">
            <span className="text-sm font-normal text-muted-foreground">
              joe_due@gmail.com
            </span>
          </DropdownMenuLabel>

          <DropdownMenuSeparator />
          <DialogTrigger asChild>
            <DropdownMenuItem>
              <UserRoundPen className="mr-2 h-4 w-4" />
              <span>Meus Dados</span>
            </DropdownMenuItem>
          </DialogTrigger>
          <DropdownMenuItem
            asChild
            className="text-rose-500 dark:text-rose-400"
          >
            <Link href="/" className="w-full">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Sair</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </Dialog>
  );
}
