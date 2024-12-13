'use client';


import CreditCardForm from '@/components/credit-card';
import { Icon } from '@/components/icon';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function PaymentMethods() {
  return (
    <Card className="mx-auto w-full max-w-3xl">
      <CardHeader>
        <CardTitle>Pagamento com cartão de crédito</CardTitle>
        <CardDescription>
          Preencha os campos abaixo para realizar o pagamento
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4 bg-gray-100 p-4">
        <Card className="flex flex-col gap-2 p-4">
          <div className="flex items-center gap-2">
            <Icon name="PiCalendarThin" className="text-muted-foreground" />
            <p>Data do agendamento</p>
          </div>
          <div className="flex justify-center">
            <CreditCardForm />
          </div>
        </Card>
      </CardContent>

      <CardFooter>
        <Button className="w-full" size="lg">
          Agendar
        </Button>
      </CardFooter>
    </Card>
  );
}
