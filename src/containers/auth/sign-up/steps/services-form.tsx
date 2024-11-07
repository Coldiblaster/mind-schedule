import { useState } from 'react';

import { Icon } from '@/components/icon';
import { Button } from '@/components/ui/button';
import { formatCurrency, formatDuration } from '@/lib/format';

import { AddServiceModal } from './modal/add-service';
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
    { id: 2, name: 'Manicure', price: 50000, duration: 45 },
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
  const [isOpenModalNewService, setIsOpenModalNewService] = useState(false);

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
      className="w-full animate-fade-down"
      role="tabpanel"
      aria-label="Gerenciamento de Serviços"
    >
      <h2 className="mb-2 text-2xl font-bold">Serviços</h2>
      <p className="mb-4 text-sm text-muted-foreground md:mb-6">
        Adicione os serviços que você oferece e seus respectivos valores.
      </p>

      <div className="text-end">
        <Button
          variant="link"
          className="text-sm text-primary hover:text-blue-300 hover:no-underline focus:outline-none"
          onClick={onNext}
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
            onClick={() => setIsOpenModalNewService(true)}
            className="flex items-center space-x-2"
          >
            <Icon name="PiPlusCircle" size={20} />
            <span>Adicionar Novo Serviço</span>
          </Button>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <ul
            className="grid grid-cols-1 gap-2 md:grid-cols-2"
            aria-label="Lista de serviços"
          >
            {/* <div
              className={cn(
                "flex w-full cursor-pointer select-none flex-col items-center justify-between gap-2 border border-input bg-white p-2 text-center text-xs transition dark:border-slate-900 dark:bg-black md:flex md:h-20 md:flex-col md:justify-center md:gap-0 md:text-center lg:px-4 lg:text-sm",
                {
                  "border-primary bg-slate-100 shadow-3xl shadow-primary/25 dark:border-primary dark:bg-blue-700":
                    type.id === value.id,
                },
              )}
              onClick={() => onChange(type)}
            >
              <span className="text-2xl md:mb-1">{type.icon}</span>
              {type.label}
            </div> */}
            {services.map(service => (
              <li
                key={service.id}
                className="relative flex flex-col items-start justify-between gap-1 border border-input bg-white p-3 text-xs transition hover:border-primary hover:bg-slate-100 hover:shadow-3xl hover:shadow-primary/25 dark:border-slate-900 dark:bg-black hover:dark:border-primary hover:dark:bg-blue-700 md:gap-2 lg:px-4 lg:text-sm"
              >
                <div className="flex w-full items-center justify-between">
                  <span className="text-sm">{service.name}</span>
                  <div className="space-x-2">
                    <EditServiceModal
                      service={service}
                      services={services}
                      setServices={setServices}
                    />

                    <button
                      onClick={() => removeService(service.id)}
                      className="rounded-full p-1 text-gray-400 hover:text-destructive focus:outline-none focus:ring-2 focus:ring-blue-500 hover:dark:text-red-500"
                      aria-label={`Remover ${service.name}`}
                    >
                      <Icon name="PiTrash" size={18} />
                    </button>
                  </div>
                </div>
                <div className="flex w-full items-center justify-between space-x-2 text-sm text-gray-400">
                  <div className="flex justify-center gap-1 text-sm">
                    <Icon name="PiCurrencyCircleDollar" size={18} />
                    {formatCurrency(service.price)}
                  </div>
                  <div className="flex justify-center gap-0.5 text-sm">
                    <Icon name="PiClock" size={18} />
                    {formatDuration(service.duration)}
                  </div>
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

            <Button
              onClick={() => setIsOpenModalNewService(true)}
              variant="link"
              aria-label="Adicionar novo serviço"
              className="text-sm text-primary hover:text-blue-300 hover:no-underline focus:outline-none"
            >
              Adicionar mais
            </Button>
          </div>
        </div>
      )}

      <div className="mt-8 flex justify-between border-t pt-4">
        <Button variant="outline" onClick={onBack}>
          Voltar
        </Button>
        <Button onClick={onNext}>Continuar</Button>
      </div>

      <AddServiceModal
        addNewService={addNewService}
        newService={newService}
        setNewService={setNewService}
        isOpenModalNewService={isOpenModalNewService}
        setIsOpenModalNewService={setIsOpenModalNewService}
      />
    </div>
  );
}
