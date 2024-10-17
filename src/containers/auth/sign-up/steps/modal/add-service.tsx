'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { Service } from '../services-form';

interface AddServiceProps {
  newService: Omit<Service, 'id'>;
  setNewService: (newService: Omit<Service, 'id'>) => void;
  addNewService: () => void;
  isOpenModalNewService: boolean;
  setIsOpenModalNewService: (value: boolean) => void;
}

export function AddServiceModal({
  addNewService,
  newService,
  setNewService,
  isOpenModalNewService,
  setIsOpenModalNewService,
}: AddServiceProps) {
  console.log('isOpenModalNewService', isOpenModalNewService);
  return (
    <Dialog
      open={isOpenModalNewService}
      onOpenChange={() => {
        setIsOpenModalNewService(false);
      }}
    >
      {/* <DialogTrigger asChild>
        <Button
          variant="link"
          aria-label="Adicionar novo serviço"
          className="text-sm text-primary hover:text-blue-300 hover:no-underline focus:outline-none"
        >
          Adicionar mais
        </Button>
      </DialogTrigger> */}
      <DialogContent className="bg-gray-800 text-white">
        <DialogHeader>
          <DialogTitle>Adicionar Novo Serviço</DialogTitle>
        </DialogHeader>
        <form
          onSubmit={e => {
            e.preventDefault();
            addNewService();
            setIsOpenModalNewService(false);
          }}
          className="space-y-4"
        >
          <div>
            <Label htmlFor="new-name">Nome do serviço</Label>
            <Input
              id="new-name"
              value={newService.name}
              onChange={e =>
                setNewService({ ...newService, name: e.target.value })
              }
              className="bg-gray-700 text-white"
              required
            />
          </div>
          <div>
            <Label htmlFor="new-price">Preço (em reais)</Label>
            <Input
              id="new-price"
              type="number"
              value={newService.price}
              onChange={e =>
                setNewService({
                  ...newService,
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
            <Label htmlFor="new-duration">Duração (em minutos)</Label>
            <Input
              id="new-duration"
              type="number"
              value={newService.duration}
              onChange={e =>
                setNewService({
                  ...newService,
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
            Adicionar
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
