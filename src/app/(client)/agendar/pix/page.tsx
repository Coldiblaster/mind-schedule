'use client';

import { useState } from 'react';
import { PiCopyThin, PiCreditCardThin } from 'react-icons/pi';
import QRCode from 'react-qr-code';

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

export default function Pix() {
  const [copied, setCopied] = useState(false);
  const pixCode =
    '00020126330014BR.GOV.BCB.PIX0114+55999999999952040000530398654051235.455802BR5908EXEMPLO6010SAO PAULO62070503***63047B44';

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(pixCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <Card className="mx-auto w-full max-w-md">
      <CardHeader>
        <CardTitle>Pagamento</CardTitle>
        <CardDescription>
          Você só será cobrado após o pedido final
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4 bg-gray-100 p-4">
        <Card className="flex flex-col gap-2 p-4">
          <div className="flex items-center gap-2">
            <PiCreditCardThin size={24} className="text-muted-foreground" />
            <p>Pagamento via PIX</p>
          </div>
        </Card>
        <Card className="relative p-4">
          <Badge
            variant="destructive"
            className="absolute -right-1 -top-1 rounded-xl"
          >
            -10%
          </Badge>
          <div className="mt-2 flex items-center justify-between">
            <div>
              <h2 className="text-lg">Avaliação Psicologica</h2>
            </div>

            <div className="font-bold">R$ 200,00</div>
          </div>
          <div className="mt-1 flex justify-between">
            <p className="text-xs text-muted-foreground">Desconto</p>
            <p className="text-xs text-destructive">-R$ 20,00</p>
          </div>
          <hr className="my-4" />

          <div className="mt-1 flex justify-between">
            <p className="font-bold">Total a pagar</p>
            <p className="text-xl font-bold">R$ 180,00</p>
          </div>
        </Card>
        <Card className="mx-auto w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle>Escaneie o QR Code</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex justify-center">
              <div className="rounded-lg bg-white p-4">
                <QRCode
                  value={pixCode}
                  size={150}
                  style={{ height: 'auto', maxWidth: '100%', width: '100%' }}
                  viewBox={`0 0 256 256`}
                />
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-sm font-medium">Cartão de crédito</div>
              <div className="relative">
                <div className="break-all rounded-lg bg-muted p-3 pr-12 text-sm">
                  {pixCode}
                </div>
                <Button
                  size="icon"
                  variant="ghost"
                  className="absolute right-1 top-1/2 -translate-y-1/2"
                  onClick={copyToClipboard}
                >
                  <PiCopyThin size={16} />
                  <span className="sr-only">Copy PIX code</span>
                </Button>
              </div>
              {copied && (
                <div className="text-center text-sm text-muted-foreground">
                  Código copiado!
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </CardContent>
      <CardFooter>
        <Button isLoading className="w-full" size="lg">
          Aguardando pagamento
        </Button>
      </CardFooter>
    </Card>
  );
}
