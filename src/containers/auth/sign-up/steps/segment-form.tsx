import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { businessTypes } from '@/data/mock/steps';
import { BusinessData, BusinessSchema } from '@/schemas/schemas-sign-up';
import { useStepsDataStore } from '@/store/steps-data-store'; // ajuste o caminho para o seu store

export function SegmentForm({ onNext }: { onNext: () => void }) {
  const { updateFormData, formData } = useStepsDataStore();

  const form = useForm<BusinessData>({
    resolver: zodResolver(BusinessSchema),
    defaultValues: {
      businessType: formData?.business?.businessType || { id: 0, label: '' },
    },
  });

  const onSubmit = (data: BusinessData) => {
    const validation = BusinessSchema.safeParse(data);
    if (validation.success) {
      updateFormData({ business: { businessType: data.businessType } });
      onNext();
    } else {
      console.error(validation.error.format());
    }
  };

  return (
    <div className="w-full animate-fade-right">
      <h2 className="mb-2 text-2xl font-bold">Segmento de atuação</h2>
      <p className="mb-6 text-sm text-muted-foreground">
        Para que você tenha um ambiente personalizado, é importante saber qual o
        seu tipo de negócio.
      </p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid w-full gap-2 md:grid-cols-2 lg:grid-cols-4 lg:gap-4">
            {businessTypes.map(type => (
              <FormField
                key={type.id}
                name="businessType"
                control={form.control}
                render={({ field: { onChange, value } }) => (
                  <FormItem>
                    <FormControl>
                      <Button
                        type="button"
                        variant={value.id === type.id ? 'secondary' : 'outline'}
                        className="w-full justify-start gap-2 px-1 text-left text-xs md:flex md:h-20 md:flex-col md:justify-center md:gap-0 md:text-center lg:px-4 lg:text-sm"
                        onClick={() => onChange(type)}
                      >
                        <span className="mb-1 text-2xl">{type.icon}</span>
                        {type.label}
                      </Button>
                    </FormControl>
                  </FormItem>
                )}
              />
            ))}
          </div>

          {form.formState.errors.businessType && (
            <p className="text-red-500">
              {form.formState.errors.businessType.message}
            </p>
          )}

          <Button
            className="mt-6 w-full"
            type="submit"
            disabled={!form.getValues('businessType')}
          >
            Continuar
          </Button>
        </form>
      </Form>
    </div>
  );
}
