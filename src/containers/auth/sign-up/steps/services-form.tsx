import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { v4 as uuidv4 } from 'uuid';

import { Icon } from '@/components/icon';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { formatCurrency, formatDuration } from '@/lib/format';
import {
  ServiceSuggestionProps,
  useGetServiceSuggestion,
} from '@/services/service/getServiceSuggestion';
import { useStepsDataStore } from '@/store/steps-data-store';

import { AddServiceModal } from './modal/add-service';
import { EditServiceModal } from './modal/edit-service';

export interface newService {
  id: number;
  title: string;
  value: number;
  time: number;
}

export function ServicesForm({
  onNext,
  onBack,
}: {
  onNext: () => void;
  onBack: () => void;
}) {
  const { updateFormData, formData } = useStepsDataStore();

  const [shouldFetch, setShouldFetch] = useState(true);

  const {
    data: serviceSuggestions,
    isLoading,
    isFetched,
  } = useGetServiceSuggestion(
    {
      businessTypeId: formData.business?.businessType.id,
      segment: formData.business?.businessType.label,
    },
    shouldFetch,
  );

  const [services, setServices] = useState<ServiceSuggestionProps[]>([]);

  const [newService, setNewService] = useState<Omit<newService, 'id'>>({
    title: '',
    value: 0,
    time: 0,
  });
  const [isOpenModalNewService, setIsOpenModalNewService] = useState(false);

  const removeService = (id: string) => {
    if (services) setServices(services.filter(service => service.id !== id));
  };

  const removeAllServices = () => {
    if (window.confirm('Tem certeza que deseja remover todos os serviços?')) {
      setServices([]);
    }
  };

  const addNewService = () => {
    if (newService.title && newService.time > 0 && newService.value > 0) {
      setServices([...services, { ...newService, id: uuidv4() }]);
      setNewService({ title: '', value: 0, time: 0 });
    } else {
      toast.error('Por favor, preencha todos os campos corretamente.');
    }
  };

  const saveServices = (services?: ServiceSuggestionProps[]) => {
    if (services) {
      updateFormData({
        services: services.map(service => ({
          ...service,
          price: service.value,
          duration: service.time,
        })),
      });
      onNext();
    }
  };

  useEffect(() => {
    if (serviceSuggestions) {
      setServices(serviceSuggestions.services);
    }
  }, [isFetched, serviceSuggestions]);

  useEffect(() => {
    if (isFetched) {
      setShouldFetch(false); // Desabilita a consulta após o primeiro carregamento
    }
  }, [isFetched]);

  return (
    <div
      className="w-full animate-fade-down"
      role="tabpanel"
      aria-label="Gerenciamento de Serviços"
    >
      <h2 className="mb-2 text-2xl font-bold">Serviços sugeridos</h2>
      <p className="mb-4 text-sm text-muted-foreground md:mb-6">
        Baseado no segmento selecionado, aqui estão alguns serviços sugeridos
        para o seu negócio. Você pode revisar, editar os detalhes ou adicionar
        novos serviços de acordo com as suas necessidades.
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

      {isLoading ? (
        <div className="flex flex-col gap-4">
          <div
            className="grid grid-cols-1 gap-2 md:grid-cols-2"
            aria-label="Lista de serviços"
          >
            {Array.from({ length: 6 }).map((_, index) => (
              <Skeleton
                key={index}
                className="h-20 border border-input bg-white dark:border-slate-900 dark:bg-black"
              />
            ))}
          </div>
        </div>
      ) : services?.length === 0 ? (
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
            {services.map(service => (
              <li
                key={service.id}
                className="relative flex flex-col items-start justify-between gap-1 border border-input bg-white p-3 text-xs transition hover:border-primary hover:bg-slate-100 hover:shadow-3xl hover:shadow-primary/25 dark:border-slate-900 dark:bg-black hover:dark:border-primary hover:dark:bg-blue-700 md:gap-2 lg:px-4 lg:text-sm"
              >
                <div className="flex w-full items-center justify-between">
                  <span className="text-sm">{service.title}</span>
                  <div className="space-x-2">
                    <EditServiceModal
                      service={service}
                      services={services}
                      setServices={setServices}
                    />

                    <button
                      onClick={() => removeService(service.id)}
                      className="rounded-full p-1 text-gray-400 hover:text-destructive focus:outline-none focus:ring-2 focus:ring-blue-500 hover:dark:text-red-500"
                      aria-label={`Remover ${service.title}`}
                    >
                      <Icon name="PiTrash" size={18} />
                    </button>
                  </div>
                </div>
                <div className="flex w-full items-center justify-between space-x-2 text-sm text-gray-400">
                  <div className="flex justify-center gap-1 text-sm">
                    <Icon name="PiCurrencyCircleDollar" size={18} />
                    {formatCurrency(service.value)}
                  </div>
                  <div className="flex justify-center gap-0.5 text-sm">
                    <Icon name="PiClock" size={18} />
                    {formatDuration(service.time)}
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
        <Button
          className="w-full max-w-28"
          isLoading={isLoading}
          onClick={() => saveServices(services)}
        >
          Continuar
        </Button>
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
