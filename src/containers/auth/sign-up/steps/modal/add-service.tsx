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

import { newService } from '../services-form';

interface AddServiceProps {
  newService: Omit<newService, 'id'>;
  setNewService: (newService: Omit<newService, 'id'>) => void;
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
              value={newService.title}
              onChange={e =>
                setNewService({ ...newService, title: e.target.value })
              }
              required
            />
          </div>
          <div>
            <Label htmlFor="new-price">Preço (em reais)</Label>
            <Input
              id="new-price"
              type="number"
              value={newService.value}
              onChange={e =>
                setNewService({
                  ...newService,
                  value: Number(e.target.value),
                })
              }
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
              value={newService.time}
              onChange={e =>
                setNewService({
                  ...newService,
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
            Adicionar
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
