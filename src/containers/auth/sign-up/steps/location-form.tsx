import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { CustomInput } from '@/components/custom-input';
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
  const { updateFormData } = useStepsDataStore();
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
      cep: '',
      city: '',
      neighborhood: '',
      number: '',
      state: '',
      street: '',
      complement: '',
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
    <div className="animate-fade-left">
      <h2 className="mb-4 text-2xl font-bold">Localização</h2>
      <p className="mb-6 text-muted-foreground">
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
          <div className="mb-4 grid gap-4 md:grid-cols-3">
            {isFetching && <div>Buscando endereço...</div>}
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
            <div className="flex justify-between">
              <Button variant="ghost" onClick={onBack}>
                Voltar
              </Button>
              <Button type="submit" disabled={isFetching}>
                Continuar
              </Button>
            </div>
          )}
        </form>
      </Form>
    </div>
  );
}
