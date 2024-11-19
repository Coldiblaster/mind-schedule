import { useInView } from 'framer-motion';
import Image from 'next/image';
import { useRef } from 'react';

import { CompanyLogo } from '@/components/company-logo';
import { Caption, Display2 } from '@/components/typography';

export const LandingPage = () => {
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);

  const isInView1 = useInView(ref1, { once: true, amount: 0.5 });
  const isInView2 = useInView(ref2, { once: true, amount: 0.5 });
  const isInView3 = useInView(ref3, { once: true, amount: 0.5 });

  return (
    <main
      id="landing-page"
      className="relative flex w-full animate-fade flex-col items-center pb-32"
    >
      <div className="relative flex h-[calc(100vh+170px)] w-full flex-col">
        <div className="to-dark absolute top-0 h-full w-full bg-primary bg-gradient-to-b from-primary clip-polygon-clip dark:bg-primary">
          <div className="absolute -left-[550px] -top-[550px] h-[960px] w-[960px] rounded-full bg-gradient-balls-top-left" />
          <div className="absolute -right-[450px] -top-[300px] h-[1024px] w-[1024px] rounded-full bg-gradient-balls-top-right" />
          <div className="absolute -bottom-[550px] -left-[550px] h-[960px] w-[960px] rounded-full bg-gradient-balls-bottom-left" />
        </div>

        <section className="relative z-10 flex min-h-svh flex-col items-center justify-center gap-10 text-white md:gap-20">
          <div className="flex animate-fade flex-col items-center gap-3 animate-delay-300">
            <CompanyLogo width={140} height={140} />
            <Caption as="100" className="mt-5 text-center text-5xl md:text-7xl">
              Mind Schedule
            </Caption>
          </div>
          <div className="flex w-full animate-fade-up flex-col px-4 text-center animate-delay-500 animate-duration-500 md:max-w-[600px]">
            <h1 className="text-2xl font-bold md:text-3xl">
              Simplifique seu tempo, potencialize seus resultados
            </h1>
            <p className="mt-4 text-sm lg:text-lg">
              Transforme sua rotina e conquiste mais clientes!
            </p>
            <p className="text-sm md:mt-2 lg:text-lg">
              Revolucione sua gestão de tempo e transforme cada agendamento em
              uma oportunidade de crescimento para seu negócio.
            </p>
          </div>
          <div className="bottom-10 flex flex-col items-center gap-4 md:absolute">
            <span>Saiba mais</span>
            <div className="relative flex h-9 w-6 animate-pulse items-center justify-center rounded-3xl border-2 border-white">
              <div className="absolute top-1 h-2 w-1 animate-bounce rounded-3xl bg-white animate-duration-1000">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-65" />
              </div>
            </div>
          </div>
        </section>
      </div>

      <section ref={ref1} className="relative -mt-32 w-full">
        <div className="mx-auto flex animate-fade-down flex-col gap-12 md:flex-row md:items-center">
          <div
            className={`${isInView1 ? 'w-72 animate-fade-right animate-delay-200 lg:w-1/2' : 'hidden'}`}
          >
            <Image
              src="/home/image-left.svg"
              alt="Gestão"
              className="h-auto w-full"
              width={370}
              height={362}
            />
          </div>
          <div
            className={`${isInView1 ? 'w-full animate-fade-down p-4 animate-delay-700 lg:max-w-[330px]' : 'hidden'}`}
          >
            <Display2 as="700" className="text-foreground">
              Facilite os agendamentos!
            </Display2>
            <p className="mt-4 text-sm text-muted-foreground lg:text-lg">
              Nossa plataforma inteligente automatiza seus agendamentos, elimina
              conflitos de horários e oferece uma experiência excepcional para
              seus clientes, permitindo que você foque no que realmente importa:
              o sucesso do seu negócio.
            </p>
          </div>
        </div>
      </section>

      <section ref={ref2} className="relative z-10 mt-16 lg:mt-32">
        <div className="mx-auto flex flex-col-reverse items-center gap-12 md:flex-row">
          <div
            className={`${isInView2 ? 'animate-fade-right p-4 text-right animate-delay-300 lg:w-1/2' : 'hidden'}`}
          >
            <Display2 as="700" className="text-foreground">
              Agilidade e eficiência!
            </Display2>
            <p className="mt-4 text-sm text-muted-foreground lg:text-lg">
              Gerencie agendamentos com eficiência, otimize atendimentos e
              aumente a satisfação dos seus clientes.
            </p>
          </div>
          <div
            className={`${isInView2 ? 'w-72 animate-fade-left self-end animate-delay-500 lg:w-1/2' : 'hidden'}`}
          >
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

      <section className="relative" ref={ref3}>
        <Image
          src="home/rocket.svg"
          alt="Rocket"
          className={`${isInView3 ? '-z-10 mx-auto mb-8 h-auto w-screen animate-fade-up xl:-mt-[140px]' : 'hidden'} `}
          width={1000}
          height={1000}
        />

        <div
          className={`${isInView3 ? 'relative mx-auto flex h-full w-full animate-fade-up flex-col items-center gap-6 p-4 animate-delay-[2000ms]' : 'hidden'}`}
        >
          <Display2 as="700" className="text-foreground">
            Vamos voar juntos! 🚀
          </Display2>
          <p className="max-w-lg text-center text-sm text-muted-foreground lg:text-lg">
            Com a Mind Schedule, você tem tudo o que precisa para decolar e
            conquistar o sucesso!
          </p>
          {/* <div className="mt-8">
            <Button size="lg">Criar conta grátis</Button>
          </div> */}
        </div>
      </section>
    </main>
  );
};
