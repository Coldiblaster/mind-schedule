import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

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
  const { updateFormData } = useStepsDataStore();

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
    }
  }, [isFetching, isSuccess]);

  return (
    <div className="animate-fade-left">
      <h2 className="mb-4 text-2xl font-bold">Localização</h2>
      <p className="mb-6 text-gray-600">
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
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
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
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

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

          <div className="flex justify-between">
            <Button variant="ghost" onClick={onBack}>
              Voltar
            </Button>
            <Button type="submit">Continuar</Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
