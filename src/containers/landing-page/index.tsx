import Image from 'next/image';

import { Icon } from '@/components/icon';
import { Button } from '@/components/ui/button';

export const LandingPage = () => (
  <main className="relative flex w-full flex-col items-center pb-32">
    <div className="relative flex h-[calc(100vh+170px)] w-full flex-col items-center justify-center">
      {/* Background with circles */}
      <div className="absolute top-0 h-full w-full bg-background clip-polygon-clip">
        <div className="absolute -left-[550px] -top-[550px] h-[960px] w-[960px] rounded-full bg-primary/40"></div>
        <div className="absolute -right-[450px] -top-[300px] h-[1024px] w-[1024px] rounded-full bg-primary/40"></div>
        <div className="absolute -bottom-[550px] -left-[550px] h-[960px] w-[960px] rounded-full bg-primary/40"></div>
      </div>

      {/* Hero Section */}
      <section className="absolute top-0 flex min-h-screen flex-col items-center justify-center text-foreground">
        <div className="mt-auto flex flex-col items-center">
          <div className="flex items-center gap-3 text-lg text-foreground">
            <Icon name="LuBrain" className="h-5 w-5" />
            <span className="font-semibold">mind.schedule</span>
          </div>
          <div className="mt-[10vh] flex flex-col items-center gap-4">
            <span>Scroll down</span>
            <div className="relative flex h-8 w-6 items-center justify-center rounded-3xl border-2 border-muted-foreground">
              <div className="absolute top-2 h-2 w-1 animate-bounce rounded-3xl bg-muted-foreground"></div>
            </div>
          </div>
        </div>
        <div className="flex w-full max-w-[450px] flex-col px-4 py-11">
          <h1 className="text-3xl font-bold">Welcome</h1>
          <p className="mt-4">
            Qualem igitur hominem natura inchoavit? De ingenio eius in his
            disputationibus, non de moribus quaeritur.Qua tu etiam inprudens
            utebare non numquam. Itaque contra est, ac dicitis
          </p>
        </div>
      </section>
    </div>

    {/* Content Sections */}
    <section className="relative -mt-20 w-full">
      <div className="mx-auto flex flex-col items-center gap-12 lg:flex-row">
        {/* Left Side Content */}
        <div className="lg:w-1/2">
          <Image
            src="/home/image-left.svg"
            alt="Inovação"
            className="h-auto w-full"
            width={370}
            height={362}
          />
        </div>
        <div className="p-4 lg:max-w-[330px]">
          <h2 className="text-3xl font-bold text-foreground">
            Inovação em gestão!
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Qualem igitur hominem natura inchoavit? De ingenio eius in his
            disputationibus, non de moribus quaeritur.
          </p>
        </div>
      </div>
    </section>

    <section className="relative z-10">
      <div className="mx-auto flex flex-col-reverse items-center gap-12 lg:flex-row">
        {/* Right Side Content */}
        <div className="p-4 text-right lg:w-1/2">
          <h2 className="text-3xl font-bold text-foreground">
            Agilidade e eficiência!
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Qualem igitur hominem natura inchoavit? De ingenio eius in his
            disputationibus, non de moribus quaeritur.
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

    {/* Rocket Section */}
    <section className="relative">
      <Image
        src="home/rocket.svg"
        alt="Rocket"
        className="-z-10 mx-auto -mt-[140px] mb-8 h-auto w-screen"
        width={1000}
        height={1000}
      />

      <div className="relative mx-auto flex h-full w-full flex-col items-center gap-6 p-4">
        <h2 className="text-3xl font-bold text-foreground">
          Vamos voar juntos em seus projetos
        </h2>
        <p className="max-w-lg text-center text-lg text-muted-foreground">
          Qualem igitur hominem natura inchoavit? De ingenio eius in his
          disputationibus, non de moribus quaeritur.Qua tu etiam inprudens
          utebare non numquam. Itaque contra est, ac dicitis
        </p>
        <div className="mt-8">
          <Button>Create Free Account</Button>
        </div>
      </div>
    </section>
  </main>
);
