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

import { Service } from '../services-form';

interface EditServiceProps {
  services: Service[];
  service: Service;
  setServices: (service: Service[]) => void;
}

export function EditServiceModal({
  services,
  setServices,
  service,
}: EditServiceProps) {
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const editService = (service: Service) => {
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
          className="rounded-full p-1 text-blue-400 hover:text-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label={`Editar ${service.name}`}
        >
          <Icon size={18} name="MdEdit" />
        </button>
      </DialogTrigger>

      <DialogContent className="bg-gray-800 text-white">
        <DialogHeader>
          <DialogTitle>Editar Serviço: {editingService?.name}</DialogTitle>
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
              value={editingService?.name || ''}
              onChange={e =>
                setEditingService({
                  ...editingService!,
                  name: e.target.value,
                })
              }
              className="bg-gray-700 text-white"
              required
            />
          </div>
          <div>
            <Label htmlFor="edit-price">Preço (em reais)</Label>
            <Input
              id="edit-price"
              type="number"
              value={editingService?.price || 0}
              onChange={e =>
                setEditingService({
                  ...editingService!,
                  price: Number(e.target.value),
                })
              }
              className="bg-gray-700 text-white"
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
              value={editingService?.duration || 0}
              onChange={e =>
                setEditingService({
                  ...editingService!,
                  duration: Number(e.target.value),
                })
              }
              className="bg-gray-700 text-white"
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
