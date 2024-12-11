import { Icon } from '@/components/icon';
import { Heading, MD, SM } from '@/components/typography';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

interface ScheduleProps {
  id: string;
  initials: string;
  name: string;
  description: string;
  duration: string;
  price: number;
  date: string;
  hour: string;
}

const services: ScheduleProps[] = [
  {
    id: 'co',
    initials: 'CO',
    name: 'Psico Vida - Psicologo',
    description: 'Avaliação Psicologica',
    duration: '1h',
    price: 60.0,
    date: '10/12',
    hour: '08:00',
  },
  {
    id: 'co',
    initials: 'CO',
    name: 'Psico Vida - Psicologo',
    description: 'Avaliação Psicologica',
    duration: '1h',
    price: 60.0,
    date: '10/12',
    hour: '08:00',
  },
];

export default function ScheduleSuccess() {
  return (
    <Card className="mx-auto w-full max-w-md">
      <CardHeader>
        <CardTitle>Escolha a especialidade</CardTitle>
        <CardDescription>
          Escolha a especialidade que deseja agendar
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4 bg-gray-100 p-4">
        <div className="flex flex-col gap-2">
          {services.map(service => (
            <Card key={service.id} className="relative p-4">
              <div className="flex items-center gap-4">
                <Icon
                  name="PiIdentificationBadgeThin"
                  className="self-start text-primary"
                />
                <div className="flex-1">
                  <Heading as="h5">{service.name}</Heading>
                  <MD as="400" className="text-muted-foreground">
                    Avaliação Psicológica
                  </MD>
                  <SM as="400" className="text-muted-foreground">
                    1 hora - R$ 60,00
                  </SM>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <MD as="400" className="text-muted-foreground">
                    {service.date}
                  </MD>
                  <Heading as="h4">{service.hour}</Heading>
                </div>
              </div>
              <hr className="my-4" />
              <div className="flex gap-4">
                <Button className="w-full">Agendar</Button>
                <Button variant="outline" size="icon" className="group/trash">
                  <Icon
                    name="PiTrashThin"
                    className="group-hover/trash:text-destructive"
                  />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
