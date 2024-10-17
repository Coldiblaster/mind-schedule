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

import { EditServiceModal } from './modal/edit-service';

export interface Service {
  id: number;
  name: string;
  price: number;
  duration: number;
}

export function ServicesForm({
  onNext,
  onBack,
}: {
  onNext: () => void;
  onBack: () => void;
}) {
  const [services, setServices] = useState<Service[]>([
    { id: 1, name: 'Corte Feminino', price: 30, duration: 30 },
    { id: 2, name: 'Manicure', price: 50, duration: 45 },
    { id: 3, name: 'Corte Masculino', price: 100, duration: 30 },
    { id: 4, name: 'Pé + Mãos', price: 50, duration: 30 },
    { id: 5, name: 'Pé + Mãos', price: 50, duration: 30 },
    { id: 6, name: 'Pé + Mãos', price: 50, duration: 30 },
    { id: 7, name: 'Pé + Mãos', price: 50, duration: 30 },
    { id: 8, name: 'Pé + Mãos', price: 50, duration: 30 },
  ]);

  const [newService, setNewService] = useState<Omit<Service, 'id'>>({
    name: '',
    price: 0,
    duration: 0,
  });

  const removeService = (id: number) => {
    setServices(services.filter(service => service.id !== id));
  };

  const removeAllServices = () => {
    if (window.confirm('Tem certeza que deseja remover todos os serviços?')) {
      setServices([]);
    }
  };

  const addNewService = () => {
    if (newService.name && newService.price > 0 && newService.duration > 0) {
      const newId = Math.max(...services.map(s => s.id), 0) + 1;
      setServices([...services, { ...newService, id: newId }]);
      setNewService({ name: '', price: 0, duration: 0 });
    } else {
      alert('Por favor, preencha todos os campos corretamente.');
    }
  };

  return (
    <div
      className="w-full animate-fade-right"
      role="region"
      aria-label="Gerenciamento de Serviços"
    >
      <h2 className="mb-4 text-2xl font-bold">Valores</h2>
      <p className="mb-6 text-muted-foreground">
        Adicione os serviços que você oferece e seus respectivos valores.
      </p>
      <div className="text-end">
        <Button
          variant="link"
          className="text-sm text-primary hover:text-blue-300 hover:no-underline focus:outline-none"
        >
          Pular e cadastrar depois
        </Button>
      </div>

      {services.length === 0 ? (
        <div
          className={`flex flex-col items-center justify-center rounded-lg p-8`}
        >
          <p className="mb-4 text-center text-lg">
            Você ainda não tem serviços cadastrados. Que tal começar adicionando
            seu primeiro serviço?
          </p>
          <Button
            onClick={addNewService}
            className="flex items-center space-x-2"
          >
            <Icon name="PiPlusCircle" size={20} />
            <span>Adicionar Novo Serviço</span>
          </Button>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <ul className="grid grid-cols-2 gap-4" aria-label="Lista de serviços">
            {services.map(service => (
              <li
                key={service.id}
                className="flex items-center justify-between rounded-lg border border-input bg-slate-100 p-3 dark:bg-gray-800"
              >
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => removeService(service.id)}
                    className="rounded-full p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    aria-label={`Remover ${service.name}`}
                  >
                    <Icon name="LuX" size={18} />
                  </button>
                  <span>{service.name}</span>
                </div>
                <div className="flex items-center space-x-4 text-sm text-gray-400">
                  <span>{service.price} reais</span>
                  <span>{service.duration} minutos</span>

                  <EditServiceModal
                    service={service}
                    services={services}
                    setServices={setServices}
                  />
                </div>
              </li>
            ))}
          </ul>
          <div className="flex justify-between text-sm">
            <Button
              onClick={removeAllServices}
              variant="link"
              aria-label="Remover todos os serviços"
              className="text-sm text-gray-400 hover:text-white hover:no-underline focus:outline-none"
            >
              Remover todos
            </Button>

            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="link"
                  aria-label="Adicionar novo serviço"
                  className="text-sm text-primary hover:text-blue-300 hover:no-underline focus:outline-none"
                >
                  Adicionar mais
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-gray-800 text-white">
                <DialogHeader>
                  <DialogTitle>Adicionar Novo Serviço</DialogTitle>
                </DialogHeader>
                <form
                  onSubmit={e => {
                    e.preventDefault();
                    addNewService();
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
          </div>
        </div>
      )}

      <div className="mt-4 flex justify-between">
        <Button variant="ghost" onClick={onBack}>
          Voltar
        </Button>
        <Button onClick={onNext}>Continuar</Button>
      </div>
    </div>
  );
}
