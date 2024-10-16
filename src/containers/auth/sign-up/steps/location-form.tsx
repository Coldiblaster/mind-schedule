import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { Icon } from '@/components/icon';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
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

  const { data, isFetching, isSuccess } = useGetAddress(form.getValues('cep'));

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
          <div className="mb-4 grid gap-4 md:grid-cols-2">
            <FormField
              name="cep"
              control={form.control}
              render={({ field: { onChange, value } }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="CEP"
                      onChange={onChange}
                      value={value}
                      autoComplete="none"
                      isLoading={isFetching}
                      type="number"
                      maxLength={8}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            {isFetching && (
              <div className="flex items-center space-x-2 text-purple-500 animate-duration-1000">
                <Icon name="LuLoader2" className="h-4 w-4 animate-spin" />
                <span className="animate-pulse">Buscando endereço...</span>
              </div>
            )}
            {isSuccess && (
              <>
                <FormField
                  name="street"
                  control={form.control}
                  render={({ field: { onChange, value } }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="Rua"
                          onChange={onChange}
                          value={value}
                          autoComplete="none"
                          disabled={Boolean(fieldsDisabled.street)}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="number"
                  control={form.control}
                  render={({ field: { onChange, value } }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="N°"
                          onChange={onChange}
                          value={value}
                          autoComplete="none"
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="neighborhood"
                  control={form.control}
                  render={({ field: { onChange, value } }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="Bairro"
                          onChange={onChange}
                          value={value}
                          autoComplete="none"
                          disabled={Boolean(fieldsDisabled.neighborhood)}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="city"
                  control={form.control}
                  render={({ field: { onChange, value } }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="Cidade"
                          onChange={onChange}
                          value={value}
                          autoComplete="none"
                          disabled={Boolean(fieldsDisabled.city)}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="state"
                  control={form.control}
                  render={({ field: { onChange, value } }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="Estado"
                          onChange={onChange}
                          value={value}
                          autoComplete="none"
                          disabled={Boolean(fieldsDisabled.state)}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  name="complement"
                  control={form.control}
                  render={({ field: { onChange, value } }) => (
                    <FormItem className="mb-4">
                      <FormControl>
                        <Input
                          placeholder="Complemento"
                          autoComplete="none"
                          onChange={onChange}
                          value={value}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}
          </div>

          <div className="flex justify-between">
            <Button variant="ghost" onClick={onBack}>
              Voltar
            </Button>
            <Button type="submit" disabled={!isSuccess}>
              Continuar
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
