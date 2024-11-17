import { useState } from 'react';

import { Icon } from '@/components/icon';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { ServiceSuggestionProps } from '@/services/service/getServiceSuggestion';

import { FormService } from './form-service';

interface EditServiceProps {
  services: ServiceSuggestionProps[];
  service: ServiceSuggestionProps;
  setServices: (service: ServiceSuggestionProps[]) => void;
}

export function EditServiceModal({
  services,
  setServices,
  service,
}: EditServiceProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button
          onClick={() => setIsOpen(true)}
          className="rounded-full p-1 hover:text-green-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label={`Editar ${service.title}`}
        >
          <Icon size={18} name="MdOutlineEdit" />
        </button>
      </DialogTrigger>

      <DialogContent className="bg-background text-foreground">
        <DialogHeader>
          <DialogTitle>Editar Serviço: {service.title}</DialogTitle>
        </DialogHeader>
        <FormService
          service={service}
          services={services}
          setServices={setServices}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          typeForm="edit"
        />
      </DialogContent>
    </Dialog>
  );
}
