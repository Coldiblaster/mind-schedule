import { Icon } from '@/components/icon';
import { Heading, SM, XS } from '@/components/typography';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

interface ServiceProps {
  id: string;
  initials: string;
  name: string;
  duration: string;
  price: number;
}

const services: ServiceProps[] = [
  {
    id: 'co',
    initials: 'CO',
    name: 'Avaliação Psicológica',
    duration: '1h',
    price: 60.0,
  },
  {
    id: 'cf',
    initials: 'CF',
    name: 'Corte Feminino',
    duration: '30 min',
    price: 30.0,
  },
  {
    id: 'fp',
    initials: 'FP',
    name: 'Fisioterapia Pélvica',
    duration: '2h',
    price: 100.0,
  },
  {
    id: 'pm',
    initials: 'PM',
    name: 'Pilates Mat',
    duration: '30 min',
    price: 50.0,
  },
];

export default function Specialty() {
  return (
    <Card className="mx-auto w-full max-w-md">
      <CardHeader>
        <CardTitle>Escolha a especialidade</CardTitle>
        <CardDescription>
          Escolha a especialidade que deseja agendar
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4 bg-gray-100 p-4">
        <Card className="flex items-center gap-2 p-4">
          <Icon name="LuInstagram" className="text-muted-foreground" />
          <p>Serviços oferecidos</p>
        </Card>
        <div className="flex flex-col gap-2">
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
              <hr className="my-4" />
              <SM as="400" className="text-muted-foreground">
                Realização de testes psicológicos para avaliação da
                personalidade, inteligência, habilidades emocionais, entre
                outros aspectos.
              </SM>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
