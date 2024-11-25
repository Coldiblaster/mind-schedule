'use client';

import { Icon } from '@/components/icon';
import { ThemeToggle } from '@/components/theme/theme-toggle';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function Page({
  params,
}: {
  params: { professionalName: string };
}) {
  console.log(params);
  return (
    <div className="flex min-h-screen flex-col justify-between gap-4 px-4 py-6">
      <div className="flex h-full flex-col gap-4 md:flex-row">
        <Card className="h-full bg-background md:w-[360px] md:border md:p-6">
          <div className="absolute right-4 top-4">
            <ThemeToggle />
          </div>
          <CardContent className="p-0">
            <div className="flex flex-col items-center">
              <Avatar className="mb-4 h-32 w-32 border-4 border-white shadow-lg">
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback className="text-2xl">VB</AvatarFallback>
              </Avatar>
              <div className="flex w-full flex-col gap-2 md:gap-6">
                <div>
                  <p>Psicóloga</p>

                  <h1 className="text-2xl font-bold">Verônica Bastazin</h1>
                </div>

                <div className="flex justify-between">
                  <div className="flex items-center gap-2">
                    <Icon name="PiMapPin" className="h-5 w-5 text-gray-500" />
                    <span className="text-sm">São Paulo, SP</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Icon
                      name="PiStarFill"
                      className="h-5 w-5 text-yellow-400"
                    />

                    <span className="text-sm font-medium">4.8</span>
                  </div>
                </div>

                <Button className="hidden w-full bg-blue-500 hover:bg-blue-600 md:flex">
                  Agendar com Verônica
                </Button>
              </div>

              {/* <div className="w-full space-y-3 text-left">
                <div className="flex items-center gap-2">
                  <Icon name="PiMapPin" className="h-5 w-5 text-gray-500" />
                  <span className="text-sm">São Paulo, SP</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="PiPhone" className="h-5 w-5 text-gray-500" />
                  <span className="text-sm">+55 (11) 99999-9999</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="PiMailbox" className="h-5 w-5 text-gray-500" />
                  <span className="text-sm">veronica@example.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="PiGlobe" className="h-5 w-5 text-gray-500" />
                  <span className="text-sm">www.veronicabastazin.com</span>
                </div>
              </div> */}
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="information" className="mt-12 w-full">
          <TabsList className="mb-6 h-10 w-full">
            <TabsTrigger value="information" className="flex-1">
              Informações
            </TabsTrigger>
            <TabsTrigger value="services" className="flex-1">
              Serviços
            </TabsTrigger>
            <TabsTrigger value="contact" className="flex-1">
              Contato
            </TabsTrigger>
          </TabsList>
          <TabsContent value="information" className="space-y-8">
            <Card>
              <CardContent className="p-4">
                <div className="mb-4 flex items-center gap-2">
                  <Icon name="PiInfo" className="h-6 w-6 text-blue-500" />
                  <h2 className="text-xl font-semibold">Informações</h2>
                </div>
                <p className="text-gray-600">
                  Psicóloga com 5 anos de experiência em atendimentos clínicos,
                  especializada em escuta ativa e acolhimento. Trabalha com
                  técnicas terapêuticas baseadas em abordagens como Terapia
                  Cognitivo-Comportamental (TCC), Psicanálise e Mindfulness.
                  Atende adolescentes e adultos, oferecendo suporte em questões
                  relacionadas a ansiedade, depressão, relacionamentos e
                  desenvolvimento pessoal. Formada pela Universidade de São
                  Paulo (USP), com pós-graduação em Psicologia Clínica e
                  diversos cursos de especialização em terapias modernas e
                  técnicas de intervenção.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="mb-4 flex items-center gap-2">
                  <Icon name="PiStar" className="h-6 w-6 text-blue-500" />
                  <h2 className="text-xl font-semibold">Avaliações</h2>
                </div>
                <div className="space-y-6">
                  <div className="flex gap-4 border-b pb-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src="/placeholder.svg" />
                      <AvatarFallback>CB</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="mb-1 flex items-start justify-between">
                        <div>
                          <p className="font-medium">Coldblaster</p>
                          <p className="text-sm text-gray-500">
                            Terapia de Casal
                          </p>
                        </div>
                        <div className="flex gap-0.5">
                          {[...Array(5)].map((_, i) => (
                            <Icon
                              key={i}
                              name="PiStar"
                              className="h-4 w-4 fill-yellow-400 text-yellow-400"
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-gray-600">
                        Ótima experiência! A psicóloga foi acolhedora e nos
                        ajudou a melhorar a comunicação no relacionamento. Suas
                        técnicas e insights foram fundamentais para resolvermos
                        conflitos de longa data.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4 border-b pb-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src="/placeholder.svg" />
                      <AvatarFallback>JB</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="mb-1 flex items-start justify-between">
                        <div>
                          <p className="font-medium">JBrunetto</p>
                          <p className="text-sm text-gray-500">
                            Orientação Vocacional
                          </p>
                        </div>
                        <div className="flex gap-0.5">
                          {[...Array(4)].map((_, i) => (
                            <Icon
                              key={i}
                              name="PiStar"
                              className="h-4 w-4 fill-yellow-400 text-yellow-400"
                            />
                          ))}

                          <Icon
                            name="PiStar"
                            className="h-4 w-4 text-gray-300"
                          />
                        </div>
                      </div>
                      <p className="text-gray-600">
                        Encontrei muita clareza sobre minhas opções de carreira.
                        A abordagem foi prática e motivadora! A Dra. Verônica
                        utilizou testes vocacionais modernos e discussões
                        profundas que me ajudaram a entender melhor minhas
                        habilidades e interesses.
                      </p>
                    </div>
                  </div>

                  <Button variant="outline" className="w-full">
                    Ver mais avaliações
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="services">
            <Card>
              <CardContent className="p-4">
                <h2 className="mb-4 text-xl font-semibold">
                  Serviços Oferecidos
                </h2>
                <ul className="space-y-4">
                  {[
                    'Terapia Individual',
                    'Terapia de Casal',
                    'Orientação Vocacional',
                    'Atendimento Online',
                    'Grupos de Apoio',
                  ].map((service, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <Icon name="PiCheck" className="h-5 w-5 text-green-500" />

                      <span>{service}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="contact">
            <Card>
              <CardContent className="p-4">
                <div className="w-full space-y-3 text-left">
                  <div className="flex items-center gap-2">
                    <Icon name="PiPhone" className="h-5 w-5 text-gray-500" />
                    <span className="text-sm">+55 (11) 99999-9999</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Icon name="PiMailbox" className="h-5 w-5 text-gray-500" />
                    <span className="text-sm">veronica@example.com</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Icon name="PiGlobe" className="h-5 w-5 text-gray-500" />
                    <span className="text-sm">www.veronicabastazin.com</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <Button className="w-full bg-blue-500 hover:bg-blue-600 md:hidden">
        Agendar com Verônica
      </Button>
    </div>
  );
}
