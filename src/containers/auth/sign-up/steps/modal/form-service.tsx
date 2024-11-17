import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { CustomInput } from '@/components/custom-input';
import { CustomTextArea } from '@/components/custom-text-area';
import { Icon } from '@/components/icon';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { formatCurrency } from '@/lib/format';
import { ServiceData, ServiceSchema } from '@/schemas/schemas-sign-up';
import { ServiceSuggestionProps } from '@/services/service/getServiceSuggestion';

interface EditServiceProps {
  services: ServiceSuggestionProps[];
  service?: ServiceSuggestionProps;
  setServices: (service: ServiceSuggestionProps[]) => void;
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  typeForm: 'add' | 'edit';
}

const ServiceSchemaWithoutId = ServiceSchema.omit({
  id: true,
});

export function FormService({
  services,
  setServices,
  service,
  isOpen,
  setIsOpen,
  typeForm,
}: EditServiceProps) {
  const form = useForm<ServiceData>({
    reValidateMode: 'onChange',
    resolver: zodResolver(ServiceSchemaWithoutId),
    defaultValues: {
      title: service?.title || '',
      value: service?.value || 0,
      time: service?.time || 0,
      description: service?.description || '',
    },
  });

  const onSubmit = (data: ServiceData) => {
    if (typeForm === 'edit') {
      const updatedService = {
        ...service,
        ...data,
        value: Number(data.value), // Garantir que o valor seja numérico ao enviar
      };

      setServices(
        services.map(s => (s.id === updatedService.id ? updatedService : s)),
      );
    } else {
      const newService = data;
      setServices([...services, { ...newService }]);
    }

    setIsOpen(false);
  };

  // Manipulando a mudança de preço
  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/\D/g, '');

    const formattedValue = rawValue ? Number(rawValue) / 100 : 0;
    return formattedValue;
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button
          onClick={() => setIsOpen(true)}
          className="rounded-full p-1 hover:text-green-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label={`${typeForm === 'add' ? 'Adicionar novo serviços' : `Editar ${service?.title}`}`}
        >
          <Icon size={18} name="MdOutlineEdit" />
        </button>
      </DialogTrigger>

      <DialogContent className="bg-background text-foreground">
        <DialogHeader>
          <DialogTitle>
            {typeForm === 'add'
              ? 'Adicionar novo serviços'
              : `Editar ${service?.title}`}
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <CustomInput
              id="title"
              required
              control={form.control}
              registerName="title"
              labelText="Nome do serviço"
            />

            <FormField
              control={form.control}
              name="value"
              render={({ field: { value, onChange } }) => (
                <FormItem className="space-y-1">
                  <FormLabel htmlFor="value" className="text-xs uppercase">
                    Preço (em reais)
                  </FormLabel>
                  <FormControl>
                    <Input
                      value={formatCurrency(value)}
                      onChange={e => onChange(handlePriceChange(e))}
                      defaultValue={0}
                      id="value"
                      autoComplete="off"
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="time"
              render={({ field: { value, onChange } }) => (
                <FormItem className="space-y-1">
                  <FormLabel htmlFor="time" className="text-xs uppercase">
                    Duração (em minutos)
                  </FormLabel>
                  <FormControl>
                    <Input
                      value={Number(value)}
                      onChange={e => onChange(Number(e.target.value))}
                      defaultValue={0}
                      id="time"
                      autoComplete="off"
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <CustomTextArea
              id="description"
              required
              control={form.control}
              registerName="description"
              maxLength={500}
              labelText="Descrição do serviço"
            />

            <div className="mr-2 text-right">
              <span className="text-xs">
                {form.watch('description').length} / 500 caracteres
              </span>
            </div>

            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              Salvar
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
