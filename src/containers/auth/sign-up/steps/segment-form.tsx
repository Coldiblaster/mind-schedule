import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { businessTypes } from '@/data/mock/steps';
import { cn } from '@/lib/utils';
import { BusinessData, BusinessSchema } from '@/schemas/schemas-sign-up';
import { useStepsDataStore } from '@/store/steps-data-store'; // ajuste o caminho para o seu store

export function SegmentForm({
  onNext,
  onBack,
}: {
  onNext: () => void;
  onBack: () => void;
}) {
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
    <div
      className="w-full animate-fade-down"
      role="tabpanel"
      aria-label="Segmento de atuação"
    >
      <h2 className="mb-2 text-2xl font-bold">Segmento de atuação</h2>
      <p className="mb-6 text-sm text-muted-foreground">
        Para que você tenha um ambiente personalizado, é importante saber qual o
        seu tipo de negócio.
      </p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid w-full grid-cols-2 gap-2 lg:grid-cols-3">
            {businessTypes.map(type => (
              <FormField
                key={type.id}
                name="businessType"
                control={form.control}
                render={({ field: { onChange, value } }) => (
                  <FormItem className="flex">
                    <FormControl>
                      <div
                        className={cn(
                          'flex w-full cursor-pointer select-none flex-col items-center justify-between gap-2 border border-input bg-white p-2 text-center text-xs transition dark:border-slate-900 dark:bg-black md:flex md:h-20 md:flex-col md:justify-center md:gap-0 md:text-center lg:px-4 lg:text-sm',
                          {
                            'border-primary bg-slate-100 shadow-3xl shadow-primary/25 dark:border-primary dark:bg-blue-700':
                              type.id === value.id,
                          },
                        )}
                        onClick={() => onChange(type)}
                      >
                        <span className="text-2xl md:mb-1">{type.icon}</span>
                        {type.label}
                      </div>
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

          <div className="mt-8 flex justify-between border-t pt-4">
            <Button variant="outline" onClick={onBack}>
              Voltar
            </Button>
            <Button type="submit" disabled={!form.getValues('businessType')}>
              Continuar
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
