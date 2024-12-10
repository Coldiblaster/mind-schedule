import { PiInstagramLogoDuotone } from 'react-icons/pi';

import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

interface Service {
  id: string;
  initials: string;
  name: string;
  duration: string;
  price: number;
}

export default function Specialty() {
  const services: Service[] = [
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
          <PiInstagramLogoDuotone size={24} className="text-muted-foreground" />
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
                  <h2 className="text-lg">{service.name}</h2>
                  <p className="text-xs text-muted-foreground">
                    Sugestão de 2 sessoes
                  </p>
                </div>
                <div className="flex items-center gap-1">
                  <div className="text-xl font-bold">R$ {service.price}/</div>
                  <div className="text-sm font-medium text-muted-foreground">
                    {service.duration}
                  </div>
                </div>
              </div>
              <hr className="my-4" />
              <p className="text-xs text-muted-foreground">
                Realização de testes psicológicos para avaliação da
                personalidade, inteligência, habilidades emocionais, entre
                outros aspectos.
              </p>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
