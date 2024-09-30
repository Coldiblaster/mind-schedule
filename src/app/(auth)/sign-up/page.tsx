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

        <div className="flex items-center gap-2 md:gap-4">
          <Button variant="ghost" asChild>
            <Link href="/">Fazer login</Link>
          </Button>

          <ThemeToggle />
        </div>
      </div>

      <div className="flex max-w-[350px] flex-col justify-center gap-6">
        <div className="flex flex-col gap-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Criar conta grátis
          </h1>
          <p className="text-sm text-muted-foreground">
            Crie sua conta e agende sua consulta com facilidade.
          </p>
        </div>

        <form className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="managerName">Seu nome</Label>
            <Input id="managerName" type="text" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Seu e-mail</Label>
            <Input id="email" type="email" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Seu celular</Label>
            <Input id="phone" type="tel" />
          </div>

          <Button className="w-full" type="submit">
            Finalizar cadastro
          </Button>

          <p className="px-6 text-center text-sm leading-relaxed text-muted-foreground">
            Ao continuar, você concorda com nossos{' '}
            <a href="" className="underline underline-offset-4">
              termos de serviço
            </a>{' '}
            e{' '}
            <a href="" className="underline underline-offset-4">
              políticas de privacidade
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
