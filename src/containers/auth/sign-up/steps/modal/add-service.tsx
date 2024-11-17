'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ServiceSuggestionProps } from '@/services/service/getServiceSuggestion';

import { FormService } from './form-service';

export interface newService {
  id: number;
  title: string;
  value: number;
  time: number;
  description: string;
}

interface AddServiceProps {
  services: ServiceSuggestionProps[];
  setServices: (service: ServiceSuggestionProps[]) => void;
  isOpenModalNewService: boolean;
  setIsOpenModalNewService: (value: boolean) => void;
}

export function AddServiceModal({
  services,
  setServices,
  isOpenModalNewService,
  setIsOpenModalNewService,
}: AddServiceProps) {
  return (
    <Dialog
      open={isOpenModalNewService}
      onOpenChange={() => {
        setIsOpenModalNewService(false);
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Adicionar Novo Serviço</DialogTitle>
        </DialogHeader>
        <FormService
          typeForm="add"
          services={services}
          setServices={setServices}
          isOpen={isOpenModalNewService}
          setIsOpen={setIsOpenModalNewService}
        />
      </DialogContent>
    </Dialog>
  );
}
