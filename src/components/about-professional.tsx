'use client';

import dynamic from 'next/dynamic';
import { useState } from 'react';

import { useMultiStepForm } from '@/hooks/use-multistep-form';

import { CardProfessional } from './card-professional';
import { Icon } from './icon';
import { Button } from './ui/button';
import { Separator } from './ui/separator';

const LazyMap = dynamic(async () => await import('@/components/map'), {
  ssr: false,
});

interface AboutProfessionalProps {
  setIsOpen: (value: boolean) => void;
}

interface ContactInfoProps {
  phone?: string;
  cell?: string;
  onCopyPhone: () => void;
  onCopyCell: () => void;
}

const ContactInfo: React.FC<ContactInfoProps> = ({
  phone,
  cell,
  onCopyPhone,
  onCopyCell,
}) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <Icon name="LuPhone" className="h-4 w-4 text-primary" />
        <h2 className="font-semibold">Contato</h2>
      </div>
      <div className="flex flex-col gap-2">
        {phone && (
          <CopyableInfo label="Telefone" value={phone} onCopy={onCopyPhone} />
        )}
        {cell && (
          <CopyableInfo label="Celular" value={cell} onCopy={onCopyCell} />
        )}
      </div>
    </div>
  );
};

interface CopyableInfoProps {
  label: string;
  value: string;
  onCopy: () => void;
}

const CopyableInfo: React.FC<CopyableInfoProps> = ({
  label,
  value,
  onCopy,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(value).then(() => {
      onCopy(); // Chama a função de cópia passada como prop
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-muted-foreground">
        {label}: {value}
      </span>
      <button
        className="flex items-center gap-1 text-sm text-primary"
        onClick={handleCopy}
      >
        <Icon name="LuCopy" className="h-4 w-4" />
        {copied ? 'Copiado!' : 'Copiar'}
      </button>
    </div>
  );
};

export function AboutProfessional({ setIsOpen }: AboutProfessionalProps) {
  const { data, updatePropertyForm } = useMultiStepForm();
  const { professional } = data;

  const handleCopyPhone = () => {
    console.log('Telefone copiado:', professional.phone);
  };

  const handleCopyCell = () => {
    console.log('Celular copiado:', professional.cell);
  };

  if (!professional.address) return null;

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

      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-6 rounded-md bg-muted p-4 shadow-md">
          {/* Perfil do profissional */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <Icon name="LuUser" className="h-4 w-4 text-primary" />

              <h1 className="font-semibold">Perfil do profissional</h1>
            </div>
            <span className="text-sm text-muted-foreground">
              {professional.bio}
            </span>
          </div>

          {/* Especialidades */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <Icon name="LuShield" className="h-4 w-4 text-primary" />

              <h2 className="font-semibold">Especialidades</h2>
            </div>
            <span className="text-sm text-muted-foreground">
              {professional.specialties}
            </span>
          </div>

          {/* Formação acadêmica */}
          {professional.education && (
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <Icon name="LuGraduationCap" className="h-4 w-4 text-primary" />

                <h2 className="font-semibold">Formação Acadêmica</h2>
              </div>
              <ul className="list-inside list-disc text-muted-foreground">
                {professional.education.map((service, index) => (
                  <li key={index} className="text-sm">
                    {service}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Anos de Experiência */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <Icon name="LuCalendar" className="h-4 w-4 text-primary" />

              <h2 className="font-semibold">Anos de Experiência</h2>
            </div>
            <span className="text-sm text-muted-foreground">
              {professional.yearsOfExperience} anos de experiência
            </span>
          </div>

          {/* Serviços Oferecidos */}
          {professional.servicesOffered && (
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <Icon name="LuClipboardList" className="h-4 w-4 text-primary" />

                <h2 className="font-semibold">Serviços Oferecidos</h2>
              </div>
              <ul className="list-inside list-disc text-muted-foreground">
                {professional.servicesOffered.map((service, index) => (
                  <li key={index} className="text-sm">
                    {service}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Idiomas */}
          {professional.languages && (
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <Icon name="LuLanguages" className="h-4 w-4 text-primary" />

                <h2 className="font-semibold">Idiomas</h2>
              </div>
              <span className="text-sm text-muted-foreground">
                {professional.languages.join(', ')}
              </span>
            </div>
          )}

          {/* Contato */}
          <ContactInfo
            phone={professional.phone}
            cell={professional.cell}
            onCopyPhone={handleCopyPhone}
            onCopyCell={handleCopyCell}
          />

          {/* Endereço */}
          {professional.address && (
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <Icon name="LuMapPin" className="h-4 w-4 text-primary" />

                <h2 className="font-semibold">Endereço do Consultório</h2>
              </div>
              <span className="text-sm text-muted-foreground">
                {professional.address.street}, {professional.address.number} -{' '}
                {professional.address.neighborhood}, {professional.address.city}{' '}
                - {professional.address.state}, {professional.address.zipCode}
              </span>
              {professional.address.complement && (
                <span className="text-sm text-muted-foreground">
                  Complemento: {professional.address.complement}
                </span>
              )}

              <LazyMap address={professional.address} />
            </div>
          )}
        </div>
      </div>

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
