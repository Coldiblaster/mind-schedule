'use client';

import { useState } from 'react';

import { Icon, IconProps } from '@/components/icon';
import { Heading, SM, XS } from '@/components/typography';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
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
  rank: number;
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

interface SocialMediaProps {
  id: string;
  name: string;
  username: string;
  icon: IconProps['name'];
}

const socialMedias: SocialMediaProps[] = [
  {
    id: 'instagram',
    name: 'Instagram',
    username: '@veronicaa_ramos',
    icon: 'PiInstagramLogoThin',
  },
  {
    id: 'facebook',
    name: 'Facebook',
    username: 'Verônica Ramos',
    icon: 'PiFacebookLogoThin',
  },
];

export default function Perfil() {
  const [activeTab, setActiveTab] = useState<
    'information' | 'services' | 'contact'
  >('information');

  return (
    <Card className="mx-auto w-full max-w-md" data-animation={activeTab}>
      <CardHeader className="relative">
        <div className="flex items-center gap-4">
          <Avatar className="h-12 w-12">
            <AvatarImage src="/placeholder.svg" />
            <AvatarFallback>JB</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle>Psico Vida - Psicóloga</CardTitle>
            <CardDescription>Verônica Ramos</CardDescription>
          </div>
        </div>
        <div className="absolute right-3 top-3 flex items-center gap-2">
          <Icon name="PiStarFill" size={16} className="text-[#FF9920]" />
          <SM as="400" className="text-muted-foreground">
            4.8
          </SM>
        </div>
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
                <Icon name="PiUserThin" size={24} />
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
                <Icon name="PiNoteThin" size={24} />
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
                      {[1, 2, 3, 4, 5].map((_, i) => (
                        <Icon
                          key={i}
                          name={
                            i < Math.floor(service.rank)
                              ? 'PiStarFill'
                              : 'PiStar'
                          }
                          size={16}
                          className={cn(
                            'text-gray-400',
                            i < Math.floor(service.rank) && 'text-[#FF9920]',
                          )}
                        />
                      ))}
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
            <div className="flex flex-col gap-2">
              <Card className="flex items-center gap-2 p-4">
                <Icon
                  name="PiReadCvLogoThin"
                  className="text-muted-foreground"
                />
                <p>Serviços oferecidos</p>
              </Card>
              {services.map(service => (
                <Card key={service.id} className="relative p-4">
                  <Badge
                    variant="destructive"
                    className="absolute -right-1 -top-1 rounded-xl"
                  >
                    -30%
                  </Badge>
                  <div className="flex items-center justify-between">
                    <div>
                      <Heading as="h5">{service.name}</Heading>
                      <SM as="400" className="text-muted-foreground">
                        Sugestão de 2 sessoes
                      </SM>
                    </div>
                    <div className="flex items-center gap-1">
                      <Heading as="h4">R$ {service.price}/</Heading>

                      <XS as="700" className="text-muted-foreground">
                        {service.duration}
                      </XS>
                    </div>
                  </div>
                  <hr className="my-2" />
                  <SM as="400" className="text-muted-foreground">
                    Realização de testes psicológicos para avaliação da
                    personalidade, inteligência, habilidades emocionais, entre
                    outros aspectos.
                  </SM>
                </Card>
              ))}
            </div>
          </TabsContent>
          <TabsContent
            className="group-data-[animation=signIn]:animate-fade-right group-data-[animation=signUp]:animate-fade-left"
            value="contact"
          >
            <div className="flex flex-col gap-2">
              <Card className="flex items-center gap-2 p-4">
                <Icon name="PiLinkThin" className="text-muted-foreground" />
                <p>Nossas redes sociais</p>
              </Card>
              {socialMedias.map(social => (
                <Card key={social.id} className="flex flex-col gap-4 p-4">
                  <div className="flex gap-2">
                    <Icon
                      name={social.icon}
                      className="text-muted-foreground"
                    />
                    <p>{social.name}</p>
                  </div>
                  <div className="flex gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage
                        src="https://github.com/shadcn.png"
                        alt="@shadcn"
                      />
                      {/* <AvatarFallback>{social.initials}</AvatarFallback> */}
                    </Avatar>
                    <p>{social.username}</p>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter>
        <Button variant="default" className="w-full" size="lg">
          Continue
        </Button>
      </CardFooter>
    </Card>
  );
}
