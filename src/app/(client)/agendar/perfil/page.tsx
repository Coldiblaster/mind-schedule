'use client';

import { MagicStar, Notepad2, Profile } from 'iconsax-react';
import { useState } from 'react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';

interface Service {
  id: string;
  initials: string;
  name: string;
  duration: string;
  price: number;
  rank?: number;
}

const services: Service[] = [
  {
    id: 'co',
    initials: 'CO',
    name: 'Avaliação Psicológica',
    duration: '1h',
    price: 60.0,
    rank: 3,
  },
  {
    id: 'cf',
    initials: 'CF',
    name: 'Corte Feminino',
    duration: '30 min',
    price: 30.0,
    rank: 4.5,
  },
];

export default function Perfil() {
  const [activeTab, setActiveTab] = useState<
    'information' | 'services' | 'contact'
  >('information');

  const renderStars = (rank: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <MagicStar
        key={index}
        variant={
          index < Math.floor(rank)
            ? 'Bold'
            : index < rank
              ? 'TwoTone'
              : 'Outline'
        }
        size={16}
        className={cn(
          'text-gray-400',
          index < Math.floor(rank) && 'text-[#FF9920]',
        )}
      />
    ));
  };

  return (
    <Card className="mx-auto w-full max-w-md" data-animation={activeTab}>
      <CardHeader>
        <CardTitle>Escolha a especialidade</CardTitle>
        <CardDescription>
          Escolha a especialidade que deseja agendar
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4 bg-gray-100 p-4">
        <Tabs defaultValue="signIn" className="w-full" value={activeTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger
              value="information"
              onClick={() => setActiveTab('information')}
            >
              Informações
            </TabsTrigger>
            <TabsTrigger
              value="services"
              onClick={() => setActiveTab('services')}
            >
              Serviços
            </TabsTrigger>
            <TabsTrigger
              value="contact"
              onClick={() => setActiveTab('contact')}
            >
              Contato
            </TabsTrigger>
          </TabsList>
          <TabsContent
            className="flex flex-col gap-2 group-data-[animation=signIn]:animate-fade-right group-data-[animation=signUp]:animate-fade-left"
            value="information"
          >
            <Card className="flex flex-col gap-2 p-4">
              <div className="flex items-center gap-2">
                <Profile variant="TwoTone" size={24} />
                <p>Informações</p>
              </div>
              <div className="flex justify-center">
                <p className="text-xs text-muted-foreground">
                  Psicólogo com 5 anos de experiência em atendimentos clínicos,
                  especializado em escuta ativa e acolhimento. Trabalha com
                  técnicas terapêuticas baseadas em abordagens como...
                </p>
              </div>
            </Card>
            <Card className="flex flex-col gap-4 p-4">
              <div className="flex items-center gap-2">
                <Notepad2 variant="TwoTone" size={24} />
                <p>Avaliações</p>
              </div>
              {services.map(service => (
                <Card key={service.id} className="flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Avatar>
                        <AvatarImage
                          src="https://github.com/shadcn.png"
                          alt="@shadcn"
                        />
                        <AvatarFallback>{service.initials}</AvatarFallback>
                      </Avatar>
                    </div>
                    <div className="flex-1 px-2">
                      <h2 className="text-lg">{service.name}</h2>
                      <p className="text-xs text-muted-foreground">
                        Sugestão de 2 sessoes
                      </p>
                    </div>
                    <div className="flex items-center gap-1">
                      {renderStars(service?.rank ?? 0)}
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Realização de testes psicológicos para avaliação da
                    personalidade, inteligência, habilidades emocionais, entre
                    outros aspectos.
                  </p>
                  <hr />
                </Card>
              ))}
              <Button variant="link">Ver mais...</Button>
            </Card>
          </TabsContent>
          <TabsContent
            className="group-data-[animation=signIn]:animate-fade-right group-data-[animation=signUp]:animate-fade-left"
            value="services"
          >
            Serviços
          </TabsContent>
          <TabsContent
            className="group-data-[animation=signIn]:animate-fade-right group-data-[animation=signUp]:animate-fade-left"
            value="contact"
          >
            Contato
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Continue</Button>
      </CardFooter>
    </Card>
  );
}
