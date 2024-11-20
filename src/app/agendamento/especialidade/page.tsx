import { Icon } from '@/components/icon';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Card,
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

export default function Component() {
  const services: Service[] = [
    {
      id: 'co',
      initials: 'CO',
      name: 'consultoria',
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
      name: 'falar com a psico',
      duration: '2h',
      price: 100.0,
    },
    {
      id: 'pm',
      initials: 'PM',
      name: 'Pé + Mãos',
      duration: '30 min',
      price: 50.0,
    },
  ];

  return (
    <Card className="mx-auto w-full max-w-md p-4">
      <CardHeader>
        <CardTitle>Escolha a especialidade</CardTitle>
        <CardDescription>
          Escolha a especialidade que deseja agendar
        </CardDescription>
      </CardHeader>
      <div className="space-y-2">
        {services.map(service => (
          <Button
            key={service.id}
            variant="ghost"
            className="h-auto w-full px-4 py-3 hover:bg-muted"
          >
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>{service.initials}</AvatarFallback>
            </Avatar>

            <CardHeader className="flex-1">
              <CardTitle>{service.name}</CardTitle>
              <CardDescription>
                {service.duration} -{' '}
                <div className="text-sm">R$ {service.price.toFixed(2)}</div>
              </CardDescription>
            </CardHeader>

            <Icon
              name="PiCaretRight"
              className="h-5 w-5 shrink-0 text-muted-foreground"
            />
          </Button>
        ))}
      </div>
    </Card>
  );
}
