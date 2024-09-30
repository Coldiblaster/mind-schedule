'use client';

import { Brain } from 'lucide-react';
import Link from 'next/link';

import { ThemeToggle } from '@/components/theme/theme-toggle';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function Home() {
  return (
    <div className="animate-fade p-8 animate-delay-150 animate-duration-500">
      <div className="absolute right-0 top-8 flex w-full justify-between gap-2 px-8 md:right-8 md:w-auto md:gap-4">
        <div className="flex items-center gap-2 md:hidden">
          <Brain className="h-5 w-5" />
          <span className="font-semibold">mind.schedule</span>
        </div>

        <div className="flex items-center gap-1 md:gap-4">
          <Button variant="ghost" asChild>
            <Link href="/sign-up">Criar conta</Link>
          </Button>
          <ThemeToggle />
        </div>
      </div>
      <div className="flex max-w-[350px] flex-col justify-center gap-6">
        <div className="flex flex-col gap-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">Login</h1>
          <p className="text-sm text-muted-foreground">
            Insira seu e-mail cadastrado para acessar sua conta.
          </p>
        </div>

        <form className="w-full space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Seu e-mail</Label>
            <Input id="email" type="email" />
          </div>

          <Button className="w-full" type="submit" asChild>
            <Link href="/dashboard">Acessar painel</Link>
          </Button>
        </form>
      </div>
    </div>
  );
}
