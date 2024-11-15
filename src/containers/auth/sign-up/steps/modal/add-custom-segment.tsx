'use client';

import { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { BusinessTypeProps } from '@/services/business-type/business-type';

interface AddCustomSegmentProps {
  businessTypes: BusinessTypeProps[];
  setBusinessTypes: (value: BusinessTypeProps[]) => void;
  isOpenModalCustomSegment: boolean;
  setIsOpenModalCustomSegment: (value: boolean) => void;
  addingNewSegmentCompleted: () => void;
}

export function AddCustomSegmentModal({
  isOpenModalCustomSegment,
  setIsOpenModalCustomSegment,
  businessTypes,
  setBusinessTypes,
  addingNewSegmentCompleted,
}: AddCustomSegmentProps) {
  const [newSegment, setNewSegment] = useState<
    Omit<BusinessTypeProps, 'id' | 'icon'>
  >({
    label: '',
  });

  const addNewCustomSegment = () => {
    const newBusinessTypes = businessTypes.map(item =>
      item.id === 21 ? { ...item, label: newSegment.label } : item,
    );
    setBusinessTypes(newBusinessTypes);
    addingNewSegmentCompleted();
  };

  return (
    <Dialog
      open={isOpenModalCustomSegment}
      onOpenChange={() => {
        setIsOpenModalCustomSegment(false);
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Adicionar um Novo Segmento de Serviço</DialogTitle>
        </DialogHeader>
        <form
          onSubmit={e => {
            e.preventDefault();
            addNewCustomSegment();
            setIsOpenModalCustomSegment(false);
          }}
          className="space-y-4"
        >
          <div className="flex flex-col gap-2">
            <Label htmlFor="new-name">Nome do Segmento</Label>
            <Input
              id="new-name"
              value={newSegment.label}
              onChange={e =>
                setNewSegment({
                  label: e.target.value,
                })
              }
              required
            />
            <p className="text-xs text-gray-500 dark:text-gray-300">
              Informe o nome do novo segmento de serviço que deseja adicionar.
            </p>
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
