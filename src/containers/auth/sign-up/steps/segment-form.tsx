import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { BusinessData, BusinessSchema } from '@/schemas/schemas-sign-up';
import { useStepsDataStore } from '@/store/steps-data-store'; // ajuste o caminho para o seu store

const businessTypes = [
  { id: 1, icon: '✂️', label: 'Salão de Beleza' },
  { id: 2, icon: '💆', label: 'Clínica de Estética' },
  { id: 3, icon: '💈', label: 'Barbearia' },
  { id: 4, icon: '👣', label: 'Podologia' },
  { id: 5, icon: '💅', label: 'Esmalteria' },
  { id: 6, icon: '👨‍⚕️', label: 'Clínica médica' },
  { id: 7, icon: '💆‍♂️', label: 'SPA e massagem' },
  { id: 8, icon: '🐾', label: 'Pet e Veterinário' },
  { id: 9, icon: '🎨', label: 'Estúdio de tatuagem' },
  { id: 10, icon: '🦷', label: 'Clínica odontológica' },
  { id: 11, icon: '🏋️', label: 'Personal e fitness' },
  { id: 12, icon: '❓', label: 'Outros segmentos' },
];

export function SegmentForm({ onNext }: { onNext: () => void }) {
  const { updateFormData, formData } = useStepsDataStore();

  const form = useForm<BusinessData>({
    resolver: zodResolver(BusinessSchema),
    defaultValues: {
      businessType: formData?.business?.businessType || { id: 0, label: '' },
    },
  });

  const onSubmit = (data: BusinessData) => {
    console.log(data);
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
      <h2 className="mb-4 text-2xl font-bold">Segmento de atuação</h2>
      <p className="mb-6 text-gray-600">
        Para que você tenha um ambiente personalizado, é importante saber qual o
        seu tipo de negócio.
      </p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid w-full gap-2 md:grid-cols-2 lg:gap-4">
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
                        className="w-full justify-start px-1 text-left lg:px-4"
                        onClick={() => onChange(type)}
                      >
                        <span className="mr-2">{type.icon}</span>
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
