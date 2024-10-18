import { Gluten } from 'next/font/google';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { CompanyLogo } from '@/components/company-logo';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const gluten = Gluten({
  subsets: ['latin'],
  display: 'swap',
  weight: ['100'],
});

export const LandingPage = () => {
  const router = useRouter();
  const goToRegister = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    router.push('/?register=true');
  };
  return (
    <main
      id="landing-page"
      className="relative flex w-full flex-col items-center pb-32"
    >
      <div className="relative flex h-[calc(100vh+170px)] w-full flex-col items-center justify-center">
        <div className="to-dark absolute top-0 h-full w-full bg-primary bg-gradient-to-b from-primary clip-polygon-clip dark:bg-primary">
          <div className="absolute -left-[550px] -top-[550px] h-[960px] w-[960px] rounded-full bg-gradient-balls-top-left" />
          <div className="absolute -right-[450px] -top-[300px] h-[1024px] w-[1024px] rounded-full bg-gradient-balls-top-right" />
          <div className="absolute -bottom-[550px] -left-[550px] h-[960px] w-[960px] rounded-full bg-gradient-balls-bottom-left" />
        </div>

        <section className="absolute top-0 flex min-h-screen flex-col items-center justify-center text-white">
          <div className="mt-auto flex flex-col items-center">
            <div className="flex flex-col items-center gap-3 text-lg">
              <CompanyLogo width={140} height={140} />
              <span className={cn(gluten.className, 'mt-5 text-7xl')}>
                my.mind
              </span>
            </div>
            <div className="mt-[10vh] flex flex-col items-center gap-4">
              <span>Saiba mais</span>
              <div className="relative flex h-9 w-6 animate-pulse items-center justify-center rounded-3xl border-2 border-white animate-duration-1000">
                <div className="absolute top-1 h-2 w-1 animate-bounce rounded-3xl bg-white animate-duration-1000">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-65" />
                </div>
              </div>
            </div>
          </div>
          <div className="flex w-full flex-col px-4 py-11 md:max-w-[600px]">
            <h1 className="text-2xl font-bold lg:text-3xl">
              Agende fácil seu dia!
            </h1>
            <p className="mt-4 text-sm lg:text-lg">
              Transforme sua rotina e conquiste mais clientes!
            </p>
            <p className="mt-4 text-sm lg:text-lg">
              Gerencie agendamentos com eficiência, otimize atendimentos e
              aumente a satisfação dos seus clientes.
            </p>
          </div>
        </section>
      </div>

      <section className="relative -mt-32 w-full">
        <div className="mx-auto flex flex-col gap-12 md:flex-row md:items-center">
          <div className="w-72 lg:w-1/2">
            <Image
              src="/home/image-left.svg"
              alt="Gestão"
              className="h-auto w-full"
              width={370}
              height={362}
            />
          </div>
          <div className="w-full p-4 lg:max-w-[330px]">
            <h2 className="text-2xl font-bold text-foreground lg:text-3xl">
              Facilite os agendamentos!
            </h2>
            <p className="mt-4 text-sm text-muted-foreground lg:text-lg">
              Facilite a vida dos seus clientes com agendamentos online e
              personalizados.
            </p>
          </div>
        </div>
      </section>

      <section className="relative z-10 mt-16 lg:mt-32">
        <div className="mx-auto flex flex-col-reverse items-center gap-12 md:flex-row">
          <div className="p-4 text-right lg:w-1/2">
            <h2 className="text-2xl font-bold text-foreground lg:text-3xl">
              Agilidade e eficiência!
            </h2>
            <p className="mt-4 text-sm text-muted-foreground lg:text-lg">
              Com o cliente agendando online, você tem mais tempo para focar no
              que realmente importa: o atendimento.
            </p>
          </div>
          <div className="lg:w-1/2">
            <Image
              src="home/image-right.svg"
              alt="Eficiência"
              className="h-auto w-full"
              width={370}
              height={434}
            />
          </div>
        </div>
      </section>

      <section className="relative">
        <Image
          src="home/rocket.svg"
          alt="Rocket"
          className="-z-10 mx-auto mb-8 h-auto w-screen xl:-mt-[140px]"
          width={1000}
          height={1000}
        />

        <div className="relative mx-auto flex h-full w-full flex-col items-center gap-6 p-4">
          <h2 className="text-2xl font-bold text-foreground lg:text-3xl">
            Vamos voar juntos! 🚀
          </h2>
          <p className="max-w-lg text-center text-sm text-muted-foreground lg:text-lg">
            Com a my.mind, você tem tudo o que precisa para decolar e conquistar
            o sucesso!
          </p>
          <div className="mt-8">
            <Button onClick={() => goToRegister()}>Criar conta grátis</Button>
          </div>
        </div>
      </section>
    </main>
  );
};
