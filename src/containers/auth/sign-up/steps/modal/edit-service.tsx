import { useState } from 'react';

import { Icon } from '@/components/icon';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ServiceSuggestionProps } from '@/services/getServices';

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
  const [editingService, setEditingService] =
    useState<ServiceSuggestionProps | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const editService = (service: ServiceSuggestionProps) => {
    setEditingService(service);
  };

  const saveEditedService = () => {
    if (editingService) {
      setServices(
        services.map(s => (s.id === editingService.id ? editingService : s)),
      );
      setEditingService(null);
      setIsOpen(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button
          onClick={() => editService(service)}
          className="rounded-full p-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label={`Editar ${service.title}`}
        >
          <Icon size={18} name="MdOutlineEdit" />
        </button>
      </DialogTrigger>

      <DialogContent className="bg-background text-foreground">
        <DialogHeader>
          <DialogTitle>Editar Serviço: {editingService?.title}</DialogTitle>
        </DialogHeader>
        <form
          onSubmit={e => {
            e.preventDefault();
            saveEditedService();
          }}
          className="space-y-4"
        >
          <div>
            <Label htmlFor="edit-name">Nome do serviço</Label>
            <Input
              id="edit-name"
              value={editingService?.title || ''}
              onChange={e =>
                setEditingService({
                  ...editingService!,
                  title: e.target.value,
                })
              }
              required
            />
          </div>
          <div>
            <Label htmlFor="edit-price">Preço (em reais)</Label>
            <Input
              id="edit-price"
              type="number"
              value={editingService?.value || 0}
              onChange={e =>
                setEditingService({
                  ...editingService!,
                  value: Number(e.target.value),
                })
              }
              min="0"
              step="0.01"
              required
            />
          </div>
          <div>
            <Label htmlFor="edit-duration">Duração (em minutos)</Label>
            <Input
              id="edit-duration"
              type="number"
              value={editingService?.time || 0}
              onChange={e =>
                setEditingService({
                  ...editingService!,
                  time: Number(e.target.value),
                })
              }
              min="1"
              required
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700"
          >
            Salvar
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
