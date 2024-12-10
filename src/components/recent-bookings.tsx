import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Booking {
  name: string;
  email: string;
  time: string;
  service: string;
  avatar?: string;
}

export function RecentBookings({ businessType }: { businessType: string }) {
  const bookings: Record<string, Booking[]> = {
    barbershop: [
      {
        name: 'João Silva',
        email: 'joao@exemplo.com',
        time: '14:30',
        service: 'Corte de Cabelo + Barba',
      },
      {
        name: 'Miguel Santos',
        email: 'miguel@exemplo.com',
        time: '15:00',
        service: 'Penteado',
      },
    ],
    psychologist: [
      {
        name: 'Sara Oliveira',
        email: 'sara@exemplo.com',
        time: '13:00',
        service: 'Sessão de Terapia',
      },
      {
        name: 'Emma Rodrigues',
        email: 'emma@exemplo.com',
        time: '16:00',
        service: 'Consulta Inicial',
      },
    ],
    mechanic: [
      {
        name: 'Roberto Wilson',
        email: 'roberto@exemplo.com',
        time: '10:00',
        service: 'Troca de Óleo',
      },
      {
        name: 'David Miller',
        email: 'david@exemplo.com',
        time: '11:30',
        service: 'Inspeção de Freios',
      },
    ],
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Agendamentos Recentes</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {bookings[businessType as keyof typeof bookings].map(
            (booking, index) => (
              <div key={index} className="flex items-center">
                <Avatar className="h-9 w-9">
                  <AvatarImage src={booking.avatar} alt="Avatar" />
                  <AvatarFallback>
                    {booking.name
                      .split(' ')
                      .map(n => n[0])
                      .join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="ml-4 space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {booking.name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {booking.email}
                  </p>
                </div>
                <div className="ml-auto text-right text-sm">
                  <p className="font-medium">{booking.time}</p>
                  <p className="text-muted-foreground">{booking.service}</p>
                </div>
              </div>
            ),
          )}
        </div>
      </CardContent>
    </Card>
  );
}
