'use client';

import Image from 'next/image';
import { useState } from 'react';

import { ProfessionalProps } from '@/data/mock/professional';
import { cn } from '@/lib/utils';

import { AboutProfessional } from './about-professional';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogTitle } from './ui/dialog';

interface CardProfessionalProps extends Partial<ProfessionalProps> {
  className?: string;
  classNameAvatar?: string;
  professionalDetails?: boolean;
}

export function CardProfessional({
  avatar,
  name,
  specialty,
  advice,
  className,
  classNameAvatar,
  professionalDetails,
}: CardProfessionalProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={cn(
        'flex items-center gap-4 rounded-lg p-3 text-sm transition-colors',
        className,
      )}
    >
      {avatar && (
        <div
          className={cn(
            'relative h-14 w-14 min-w-14 md:h-20 md:max-h-20 md:w-20 md:max-w-20',
            classNameAvatar,
          )}
        >
          <Image
            src={avatar}
            alt="Foto do especialista"
            fill
            className="rounded-full object-cover object-center"
          />
        </div>
      )}

      <div className="flex flex-col items-start gap-2 text-start">
        <div className="flex flex-col text-start">
          <h2 className="w-[140px] truncate font-bold sm:w-[250px]">{name}</h2>
          <span className="font-medium text-muted-foreground">
            {specialty} {advice && `- ${advice}`}
          </span>
        </div>

        {professionalDetails && (
          <Button onClick={() => setIsOpen(true)} size="xs">
            Sobre o Profissional
          </Button>
        )}
      </div>

      <Dialog
        open={isOpen}
        onOpenChange={() => {
          setIsOpen(false);
        }}
      >
        <DialogContent
          className=""
          aria-describedby="Modal de busca de endereços"
        >
          <DialogTitle />
          <AboutProfessional setIsOpen={setIsOpen} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
