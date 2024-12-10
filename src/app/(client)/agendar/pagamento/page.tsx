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
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

export default function PaymentMethod() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Forma de pagamento</CardTitle>
        <CardDescription>
          Escolha a forma de pagamento que deseja utilizar
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        <RadioGroup defaultValue="card" className="grid grid-cols-3 gap-4">
          <div>
            <RadioGroupItem
              value="card"
              id="card"
              className="peer sr-only"
              aria-label="Card"
            />
            <Label
              htmlFor="card"
              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-4 peer-data-[state=checked]:border-primary hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="mb-3 h-6 w-6"
              >
                <rect width="20" height="14" x="2" y="5" rx="2" />
                <path d="M2 10h20" />
              </svg>
              Cartão de crédito
            </Label>
          </div>

          <div>
            <RadioGroupItem
              value="paypal"
              id="paypal"
              className="peer sr-only"
              aria-label="Paypal"
            />
            <Label
              htmlFor="paypal"
              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-4 peer-data-[state=checked]:border-primary hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary"
            >
              <Icon name="PiPaypalLogo" className="mb-3 h-6 w-6" />
              Paypal
            </Label>
          </div>

          <div>
            <RadioGroupItem
              value="apple"
              id="apple"
              className="peer sr-only"
              aria-label="Apple"
            />
            <Label
              htmlFor="apple"
              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-4 peer-data-[state=checked]:border-primary hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary"
            >
              <Icon name="PiAppleLogo" className="mb-3 h-6 w-6" />
              Apple
            </Label>
          </div>
        </RadioGroup>
        <CreditCardForm />
      </CardContent>
      <CardFooter>
        <Button className="w-full">Continue</Button>
      </CardFooter>
    </Card>
  );
}
