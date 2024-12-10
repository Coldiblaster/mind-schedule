import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { Icon } from './icon';

interface MetricCardProps {
  title: string;
  value: string;
  description: string;
  icon: React.ReactNode;
}

function MetricCard({ title, value, description, icon }: MetricCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}

export function MetricCards({ businessType }: { businessType: string }) {
  const metrics = {
    barbershop: [
      {
        title: 'Total de Clientes',
        value: '30',
        description: '+5 desde o mês passado',
        icon: <Icon name="LuUsers" className="h-4 w-4 text-muted-foreground" />,
      },
      {
        title: 'Cancelamentos',
        value: '10',
        description: '+180,1% desde o mês passado',
        icon: (
          <Icon name="LuXCircle" className="h-4 w-4 text-muted-foreground" />
        ),
      },
      {
        title: 'Receita',
        value: 'R$ 12.234',
        description: '+19% desde o mês passado',
        icon: (
          <Icon name="LuDollarSign" className="h-4 w-4 text-muted-foreground" />
        ),
      },
      {
        title: 'Horários Disponíveis Hoje',
        value: '8',
        description: 'Próximo horário em 2 horas',
        icon: (
          <Icon name="LuCalendar" className="h-4 w-4 text-muted-foreground" />
        ),
      },
    ],
    psychologist: [
      {
        title: 'Total de Pacientes',
        value: '25',
        description: '+3 desde o mês passado',
        icon: <Icon name="LuUsers" className="h-4 w-4 text-muted-foreground" />,
      },
      {
        title: 'Sessões Perdidas',
        value: '5',
        description: '-2% desde o mês passado',
        icon: (
          <Icon name="LuXCircle" className="h-4 w-4 text-muted-foreground" />
        ),
      },
      {
        title: 'Receita',
        value: 'R$ 8.500',
        description: '+15% desde o mês passado',
        icon: (
          <Icon name="LuDollarSign" className="h-4 w-4 text-muted-foreground" />
        ),
      },
      {
        title: 'Horários Disponíveis Hoje',
        value: '4',
        description: 'Próximo horário em 1 hora',
        icon: (
          <Icon name="LuCalendar" className="h-4 w-4 text-muted-foreground" />
        ),
      },
    ],
    mechanic: [
      {
        title: 'Total de Veículos',
        value: '15',
        description: '+2 desde o mês passado',
        icon: <Icon name="LuUsers" className="h-4 w-4 text-muted-foreground" />,
      },
      {
        title: 'Serviços Cancelados',
        value: '3',
        description: '-5% desde o mês passado',
        icon: (
          <Icon name="LuXCircle" className="h-4 w-4 text-muted-foreground" />
        ),
      },
      {
        title: 'Receita',
        value: 'R$ 25.750',
        description: '+25% desde o mês passado',
        icon: (
          <Icon name="LuDollarSign" className="h-4 w-4 text-muted-foreground" />
        ),
      },
      {
        title: 'Horários Disponíveis Hoje',
        value: '6',
        description: 'Próximo horário em 30 minutos',
        icon: (
          <Icon name="LuCalendar" className="h-4 w-4 text-muted-foreground" />
        ),
      },
    ],
  };

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {metrics[businessType as keyof typeof metrics].map((metric, index) => (
        <MetricCard key={index} {...metric} />
      ))}
    </div>
  );
}
