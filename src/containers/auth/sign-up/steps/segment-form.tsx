import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { BusinessProps, BusinessSchema } from '@/schemas/schemas-sign-up';
import {
  BusinessTypeProps,
  useGetBusinessType,
} from '@/services/business-type/business-type';
import { useStepsDataStore } from '@/store/steps-data-store'; // ajuste o caminho para o seu store

import { AddCustomSegmentModal } from './modal/add-custom-segment';

export function SegmentForm({
  onNext,
  title,
}: {
  onNext: () => void;
  title: string;
}) {
  const { updateFormData, formData } = useStepsDataStore();
  const { data, isPending } = useGetBusinessType();

  const [businessTypes, setBusinessTypes] = useState<BusinessTypeProps[]>([]);

  const [isOpenModalCustomSegment, setIsOpenModalCustomSegment] =
    useState(false);

  const form = useForm<BusinessProps>({
    resolver: zodResolver(BusinessSchema),
    defaultValues: {
      businessType: formData?.business?.businessType || { id: 0, label: '' },
    },
  });

  const onSubmit = (data: BusinessProps) => {
    const validation = BusinessSchema.safeParse(data);

    if (validation.success) {
      const segmentSelected = businessTypes.find(
        item => item.id === data.businessType.id,
      );

      if (segmentSelected) {
        updateFormData({ business: { businessType: segmentSelected } });
      } else {
        updateFormData({ business: { businessType: data.businessType } });
      }

      onNext();
    } else {
      console.error(validation.error.format());
    }
  };

  const addNewSegment = () => {
    setIsOpenModalCustomSegment(true);
  };

  const addingNewSegmentCompleted = () => {
    toast.success('Novo segmento adicionado com sucesso.');
  };

  useEffect(() => {
    if (data) {
      if (formData.business && formData.business.businessType.id === 21) {
        setBusinessTypes(
          data.businessTypes.map(item =>
            item.id === 21 && formData.business
              ? { ...item, label: formData.business.businessType.label }
              : item,
          ),
        );
      } else setBusinessTypes(data.businessTypes);
    }
  }, [isPending, data]);

  return (
    <div
      className="w-full animate-fade-down"
      role="tabpanel"
      aria-label="Segmento de atuação"
    >
      <h2 className="mb-2 text-2xl font-bold">{title}</h2>
      <p className="mb-6 text-sm text-muted-foreground">
        Para que você tenha um ambiente personalizado, é importante saber qual o
        seu tipo de negócio.
      </p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid w-full grid-cols-2 gap-2 transition lg:grid-cols-3">
            {isPending || !businessTypes ? (
              <>
                {Array.from({ length: 21 }).map((_, index) => (
                  <Skeleton
                    key={index}
                    className="h-[74px] border border-input bg-white dark:border-slate-900 dark:bg-black md:h-20"
                  />
                ))}
              </>
            ) : (
              <>
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
                            onClick={() => {
                              if (type.id === 21) addNewSegment();
                              onChange(type);
                            }}
                          >
                            <span className="text-2xl md:mb-1">
                              {type.icon}
                            </span>
                            {type.label}
                          </div>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                ))}
              </>
            )}
          </div>

          {form.formState.errors.businessType && (
            <p className="text-red-500">
              {form.formState.errors.businessType.message}
            </p>
          )}

          <div className="mt-8 flex justify-end border-t pt-4">
            <Button type="submit" disabled={!form.getValues('businessType')}>
              Continuar
            </Button>
          </div>
        </form>
      </Form>

      <AddCustomSegmentModal
        isOpenModalCustomSegment={isOpenModalCustomSegment}
        setIsOpenModalCustomSegment={setIsOpenModalCustomSegment}
        businessTypes={businessTypes}
        setBusinessTypes={setBusinessTypes}
        addingNewSegmentCompleted={addingNewSegmentCompleted}
      />
    </div>
  );
}
