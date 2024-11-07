import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { CustomInput } from '@/components/custom-input';
import { Icon } from '@/components/icon';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { LocationData, LocationSchema } from '@/schemas/schemas-sign-up';
import { useGetAddress } from '@/services/cep';
import { useStepsDataStore } from '@/store/steps-data-store';

export function LocationForm({
  onNext,
  onBack,
}: {
  onNext: () => void;
  onBack: () => void;
}) {
  const { updateFormData, formData } = useStepsDataStore();
  const [fieldsDisabled, setFieldsDisabled] = useState({
    city: '',
    neighborhood: '',
    state: '',
    street: '',
  });

  const form = useForm<LocationData>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    resolver: zodResolver(LocationSchema),
    defaultValues: {
      cep: formData.location?.cep || '',
      city: formData.location?.city || '',
      neighborhood: formData.location?.neighborhood || '',
      number: formData.location?.number || '',
      state: formData.location?.state || '',
      street: formData.location?.street || '',
      complement: formData.location?.complement || '',
    },
  });

  const { data, isFetching, isSuccess } = useGetAddress(
    form.getValues('cep').replace(/\D/g, ''),
  );

  const onSubmit = (data: LocationData) => {
    const validation = LocationSchema.safeParse(data);
    if (validation.success) {
      updateFormData({ location: data });
      onNext();
    } else {
      console.error(validation.error.format());
    }
  };

  useEffect(() => {
    if (isSuccess) {
      const { city, neighborhood, state, street } = data;

      form.setValue('city', city);
      form.setValue('neighborhood', neighborhood);
      form.setValue('state', state);
      form.setValue('street', street);

      setFieldsDisabled({
        city,
        neighborhood,
        state,
        street,
      });
    }
  }, [isFetching, isSuccess]);

  return (
    <div
      className="w-full animate-fade-down"
      role="tabpanel"
      aria-label="Local de atuação"
    >
      <h2 className="mb-2 text-2xl font-bold">Localização</h2>
      <p className="mb-4 text-sm text-muted-foreground md:mb-6">
        Insira o endereço do seu negócio para que seus clientes possam
        encontrá-lo.
      </p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="mb-4 grid gap-4 md:grid-cols-3">
            <CustomInput
              control={form.control}
              registerName="cep"
              placeholder="18200-020"
              type="text"
              maskName="cep"
              labelText="CEP:"
              isFetching={isFetching}
              autoFocus
            />
          </div>
          <div className="mb-8 grid gap-4 md:grid-cols-3">
            {isFetching && (
              <div className="flex items-center space-x-2 text-purple-500 animate-duration-1000">
                <Icon name="LuLoader2" className="h-4 w-4 animate-spin" />
                <span className="animate-pulse">Buscando endereço...</span>
              </div>
            )}
            {isSuccess && (
              <>
                <CustomInput
                  control={form.control}
                  registerName="street"
                  placeholder="nome da rua completo"
                  labelText="Rua:"
                  disabled={Boolean(fieldsDisabled.city)}
                />
                <CustomInput
                  control={form.control}
                  registerName="number"
                  labelText="N°"
                />
                <CustomInput
                  control={form.control}
                  registerName="complement"
                  labelText="Complemento"
                />
                <CustomInput
                  control={form.control}
                  registerName="neighborhood"
                  labelText="Bairro"
                  disabled={Boolean(fieldsDisabled.neighborhood)}
                />
                <CustomInput
                  control={form.control}
                  registerName="city"
                  labelText="Cidade"
                  disabled={Boolean(fieldsDisabled.city)}
                />

                <CustomInput
                  control={form.control}
                  registerName="state"
                  labelText="Estado"
                  disabled={Boolean(fieldsDisabled.state)}
                />
              </>
            )}
          </div>
          {isSuccess && (
            <div className="mt-8 flex justify-between border-t pt-4">
              <Button variant="outline" onClick={onBack}>
                Voltar
              </Button>
              <Button type="submit" disabled={!isSuccess}>
                Continuar
              </Button>
            </div>
          )}
        </form>
      </Form>
    </div>
  );
}
