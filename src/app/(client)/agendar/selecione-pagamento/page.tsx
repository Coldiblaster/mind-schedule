'use client';

import { Icon } from '@/components/icon';
import { Heading, SM } from '@/components/typography';
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
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

interface PaymentMethodsProps {
  id: string;
  name: string;
  description?: string;
  icon: React.ReactNode;
}

const methodsPayments: PaymentMethodsProps[] = [
  {
    id: 'pix',
    name: 'PIX',
    description: 'Pague no PIX e garanta seu desconto',
    icon: <Icon name="PiQrCodeThin" size="24" />,
  },
  {
    id: 'card',
    name: 'Cartão de crédito',
    description: 'Pague em até 4x com o cartão de créidto',
    icon: <Icon name="PiCreditCardThin" size="24" />,
  },
  {
    id: 'money',
    name: 'Pagamento em dinheiro',
    description: 'Pague direto com o profissional',
    icon: <Icon name="PiCurrencyDollarSimpleThin" size="24" />,
  },
];

export default function PaymentSelected() {
  return (
    <Card className="mx-auto w-full max-w-md">
      <CardHeader>
        <CardTitle>Forma de pagamento</CardTitle>
        <CardDescription>
          Escolha a forma de pagamento que deseja utilizar
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4 bg-gray-100 p-4">
        <RadioGroup defaultValue="card" className="grid grid-cols-1 gap-4">
          {methodsPayments.map(method => (
            <Card key={method.id} className="relative">
              {method.id === 'pix' && (
                <Badge
                  variant="destructive"
                  className="absolute -right-1 -top-2 rounded-xl"
                >
                  -30%
                </Badge>
              )}
              <RadioGroupItem
                value={method.id}
                id={method.id}
                className="peer sr-only"
                aria-label={method.name}
              />
              <Label
                htmlFor={method.id}
                className="flex cursor-pointer items-center gap-2 rounded-xl border-2 border-muted p-4 font-normal peer-data-[state=checked]:border-primary hover:border-muted-foreground/20 hover:text-accent-foreground [&:has([data-state=checked])]:border-primary"
              >
                {method.icon}
                <div>
                  <Heading as="h5">{method.name}</Heading>

                  <SM as="400" className="text-muted-foreground">
                    Sugestão de 2 sessoes
                  </SM>
                </div>
              </Label>
              <Icon
                name="PiCircleLight"
                className="absolute right-3 top-1/2 -translate-y-1/2 peer-data-[state=checked]:hidden"
              />
              <Icon
                name="PiCheckCircleFill"
                className="absolute right-3 top-1/2 hidden -translate-y-1/2 text-primary peer-data-[state=checked]:block"
              />
            </Card>
          ))}
        </RadioGroup>
      </CardContent>
      <CardFooter>
        <Button className="w-full" size="lg">
          Continue
        </Button>
      </CardFooter>
    </Card>
  );
}
