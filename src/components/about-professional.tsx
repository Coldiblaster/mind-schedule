'use client';

import { Phone, Smartphone } from 'lucide-react';
import dynamic from 'next/dynamic';

import { useMultiStepForm } from '@/hooks/multistep-form';

import { CardProfessional } from './card-professional';
import { Button } from './ui/button';
import { Separator } from './ui/separator';

const LazyMap = dynamic(async () => await import('@/components/map'), {
  ssr: false,
});

interface AboutProfessionalProps {
  setIsOpen: (value: boolean) => void;
}

export function AboutProfessional({ setIsOpen }: AboutProfessionalProps) {
  const { data, updatePropertyForm } = useMultiStepForm();

  const { professional } = data;

  if (!professional.address) return null;

  const { street, number, complement, neighborhood, city, state, zipCode } =
    professional.address;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-4 md:flex-row">
        <CardProfessional
          avatar={professional.avatar}
          specialty={professional.specialty}
          name={professional.name}
          advice={professional.advice}
          className="p-0"
        />

        <Separator className="hidden md:flex" orientation="vertical" />

        <Separator className="md:hidden" orientation="horizontal" />

        <div className="flex w-full flex-col items-start justify-center">
          <span className="text-sm">
            <strong>Atendimento:</strong> {professional.typeOfService}
          </span>
          <span className="text-sm">
            <strong>Consulta:</strong> {professional.price}
          </span>
        </div>
      </div>

      <Separator />

      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <h1 className="font-bold">Perfil do profissional</h1>
          <span className="text-sm">{professional.specialties}</span>
        </div>
        <div className="flex flex-col gap-2">
          <h1 className="font-bold">Contato</h1>
          <div className="flex gap-4">
            {professional.phone && (
              <div className="flex items-center gap-2 text-sm font-bold">
                <Phone size={20} />
                <span>{professional.phone}</span>
              </div>
            )}
            {professional.cell && (
              <div className="flex items-center gap-1 text-sm font-bold">
                <Smartphone size={20} />
                <span>{professional.cell}</span>
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <h1 className="font-bold">Endereço do consultório</h1>
          <span className="text-sm">
            {`${street}, ${number}${complement ? ` - ${complement}` : ''} - ${neighborhood}, ${city} - ${state}${zipCode ? `, ${zipCode}` : ''}`}
          </span>

          <LazyMap address={professional.address} />
        </div>
      </div>

      <Separator />

      <div className="flex flex-col justify-end gap-2 sm:flex-row md:gap-4">
        <Button
          size="sm"
          variant="ghost"
          onClick={() => {
            updatePropertyForm({ stepNumber: 1 });
            setIsOpen(false);
          }}
        >
          Escolher outro profissional
        </Button>
        <Button size="sm" onClick={() => setIsOpen(false)}>
          Ver disponibilidade
        </Button>
      </div>
    </div>
  );
}
