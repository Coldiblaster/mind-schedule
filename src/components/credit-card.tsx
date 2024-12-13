'use client';

import valid from 'card-validator';
import { useState } from 'react';

import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

import { Icon, IconProps } from './icon';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

export default function CreditCardForm() {
  const [cardNumber, setCardNumber] = useState('•••• •••• •••• ••••');
  const [cardName, setCardName] = useState('NOME DO CARTÃO');
  const [expiryDate, setExpiryDate] = useState<number>();
  const [expiryYear, setExpiryYear] = useState<number>();
  const [flag, setFlag] = useState('FaCreditCard');
  const [isCardFlipped, setIsCardFlipped] = useState(false);
  const [cvv, setCvv] = useState('');

  const generateFlagName = (flagName: string) => {
    if (!flagName) return '';
    return flagName
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join('');
  };

  const generateFlagIcon = (flagName: string) => {
    if (!flagName) return '';

    const getName = generateFlagName(flagName);

    switch (getName) {
      case 'Visa':
        return 'FaCcVisa';
      case 'Mastercard':
        return 'FaCcMastercard';
      case 'AmericanExpress':
        return 'FaCcAmex';
      case 'Discover':
        return 'FaCcDiscover';
      case 'Jcb':
        return 'FaCcJcb';
      case 'DinersClub':
        return 'FaCcDinersClub';
      case 'Maestro':
        return 'FaCcMastercard';
      case 'AmazonPay':
        return 'FaCcAmazonPay';
      case 'Paypal':
      default:
        return 'FaCreditCard';
    }
  };

  const formatCardNumber = (value: string) => {
    // Remove espaços e caracteres não numéricos
    const cardNumberFormatted = value
      .replace(/\s+/g, '')
      .replace(/[^0-9]/gi, '');

    // Valida o número do cartão
    const cardNumberValid = valid.number(cardNumberFormatted);

    // Define a bandeira do cartão (flag) se válida
    const flagName = cardNumberValid?.card?.type;
    console.log('cardNumberValid', cardNumberValid);
    console.log('flagName', flagName);
    setFlag(flagName ? generateFlagIcon(flagName) : 'FaCreditCard');

    // Formata o número do cartão em grupos de 4 dígitos
    const matches = cardNumberFormatted.match(/\d{4,16}/g);
    if (!matches) return value;

    // Divida a string em grupos de 4 e junte com espaços
    const formatted = matches[0].match(/.{1,4}/g)?.join(' ') || value;

    return formatted;
  };

  return (
    <div className="flex w-full flex-col items-center justify-center gap-6 md:flex-row">
      <Card className="w-full max-w-md rounded-xl bg-white p-6 shadow-md">
        <form className="space-y-4">
          <div>
            <Label htmlFor="cardNumber">Número do Cartão</Label>
            <Input
              id="cardNumber"
              placeholder="1234 5678 9012 3456"
              maxLength={19}
              autoFocus
              onChange={e =>
                setCardNumber(
                  formatCardNumber(e.target.value) || '•••• •••• •••• ••••',
                )
              }
            />
          </div>
          <div>
            <Label htmlFor="cardName">Nome do Titular</Label>
            <Input
              id="cardName"
              placeholder="Nome como está no cartão"
              onChange={e =>
                setCardName(e.target.value.toUpperCase() || 'NOME DO TITULAR')
              }
            />
          </div>
          <div className="flex gap-4">
            <div className="w-full">
              <Label htmlFor="expiryDate">Data de Validade</Label>
              <div className="flex gap-2">
                <div className="">
                  <Select>
                    <SelectTrigger id="month" aria-label="Month">
                      <SelectValue placeholder="Mês" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 12 }, (_, i) => (
                        <SelectItem
                          key={i}
                          value={`${i}`}
                          onChange={() => setExpiryDate(i)}
                        >
                          {i}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="">
                  <Select>
                    <SelectTrigger id="year" aria-label="Year">
                      <SelectValue placeholder="Ano" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 10 }, (_, i) => (
                        <SelectItem
                          key={i}
                          value={`${new Date().getFullYear() + i}`}
                          onChange={() => setExpiryYear(i)}
                        >
                          {new Date().getFullYear() + i}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            <div className="w-1/3">
              <Label htmlFor="cvv">CVV</Label>
              <Input
                id="cvv"
                placeholder="123"
                maxLength={4}
                onChange={e => setCvv(e.target.value)}
                onFocus={() => setIsCardFlipped(true)}
                onBlur={() => setIsCardFlipped(false)}
              />
            </div>
          </div>
        </form>
      </Card>

      <div
        className={cn(
          'relative h-56 w-full max-w-96 transition-transform duration-500 [transform-style:preserve-3d]',
          isCardFlipped && 'rotate-y-180',
        )}
      >
        {/* Frente do cartão */}
        <Card
          className={cn(
            'backface-hidden absolute flex h-full w-full flex-col justify-between rounded-xl bg-gradient-to-br from-primary via-purple-500 to-pink-500 p-6 text-white shadow-xl',
            isCardFlipped && 'rotate-y-180',
          )}
        >
          <div className="flex items-start justify-between">
            <div className="flex flex-col">
              <div className="mb-1 text-xl font-bold">Cartão Virtual</div>
              <div className="text-xs">Cartão Platinum</div>
            </div>
            <Icon name="PiWifiHigh" className="h-8 w-8 rotate-90" />
          </div>
          <div className="my-auto flex justify-between">
            <div className="font-mono text-2xl tracking-wider">
              {cardNumber}
            </div>
            <Icon name={flag as IconProps['name']} className="mb-1 h-8 w-8" />
          </div>
          <div className="flex items-end justify-between">
            <div>
              <div className="mb-1 text-xs uppercase">Nome do Titular</div>
              <div className="font-mono text-sm">{cardName}</div>
            </div>
            <div className="text-right">
              <div className="mb-1 text-xs uppercase">Validade</div>
              <div className="font-mono text-sm">
                {expiryDate || 'MM'}/{expiryYear || 'YY'}
              </div>
            </div>
          </div>
        </Card>

        {/* Verso do cartão */}
        <Card
          className={cn(
            'backface-hidden rotate-y-180 absolute flex h-full w-full flex-col justify-between rounded-xl bg-gradient-to-br from-gray-700 to-gray-900 py-6 text-white shadow-xl',
            isCardFlipped && 'rotate-y-0',
          )}
        >
          <div className="mb-4 h-10 w-full flex-shrink-0 bg-black/40"></div>
          <div className="flex justify-end px-6">
            <div className="font-mono w-14 bg-white text-center text-lg text-gray-700">
              {cvv || '000'}
            </div>
          </div>
          <div className="mt-4 px-6">
            <div className="mt-2 flex justify-between">
              <div className="h-4 w-12 rounded bg-gray-700"></div>
              <div className="h-4 w-16 rounded bg-gray-700"></div>
            </div>
          </div>
          <div className="mt-4 px-6 text-gray-300">
            <div className="mt-2 h-2 w-full rounded bg-gray-700"></div>
            <div className="mt-2 h-2 w-3/4 rounded bg-gray-700"></div>
            <div className="mt-2 h-2 w-3/4 rounded bg-gray-700"></div>
          </div>
        </Card>
      </div>
    </div>
  );
}
