import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

import { Icon } from '@/components/icon';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Label } from '@/components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';

import { MultiSelect } from './multi-select';

// Mock data
const specialties = [
  { value: '1', label: 'Psicóloga' },
  { value: '2', label: 'Terapeuta' },
  { value: '3', label: 'Fisioterapeuta' },
  { value: '4', label: 'Neurologista' },
];

const consultationTypes = [
  { value: '1', label: 'Online' },
  { value: '2', label: 'Presencial' },
  { value: '3', label: 'Ambos' },
];

const cities = [
  { value: '1', label: 'Cidade 1' },
  { value: '2', label: 'Cidade 2' },
  { value: '3', label: 'Cidade 3' },
];

const paymentMethods = [
  { value: '1', label: 'Cartão' },
  { value: '2', label: 'Dinheiro' },
  { value: '3', label: 'Pix' },
];

const period = [
  { value: '1', label: 'Manhã' },
  { value: '2', label: 'Tarde' },
  { value: '3', label: 'Noite' },
];

// Validation schema with all optional fields
const filterSchema = z.object({
  specialty: z.array(z.string()).optional(),
  consultationType: z.string().optional(),
  city: z.string().optional(),
  paymentMethod: z.string().optional(),
  date: z.date().optional(),
  period: z.array(z.string()).optional(),
});

type FilterFormValues = z.infer<typeof filterSchema>;

export function FilterOptions() {
  const [open, setOpen] = useState(false);
  const [openCalendar, setOpenCalendar] = useState(false);
  const { handleSubmit, control, watch } = useForm<FilterFormValues>({
    resolver: zodResolver(filterSchema),
  });

  // Watch all fields to enable the filter button when any field is filled
  const watchFields = watch();
  const isFilterEnabled = Object.values(watchFields).some(field => {
    if (Array.isArray(field)) {
      return field.length > 0;
    }
    return Boolean(field);
  });

  const onSubmit = (data: FilterFormValues) => {
    console.log('Filtered data:', data);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          size="sm"
          variant="outline"
          className="flex items-center space-x-2"
        >
          <Icon name="MdFilterList" size={20} />
          <span className="hidden md:inline-flex">Filtrar</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-8 md:min-w-96" align="end">
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Specialty */}
          <div className="mb-4">
            <Label className="mb-2 block">Especialidade</Label>
            <Controller
              name="specialty"
              control={control}
              render={({ field }) => (
                <MultiSelect
                  options={specialties}
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  placeholder="Escolha uma ou mais especialidades"
                  variant="inverted"
                  animation={2}
                  maxCount={3}
                />
              )}
            />
          </div>

          {/* Consultation Type */}
          <div className="mb-4">
            <Label className="mb-2 block">Tipo de consulta</Label>
            <Controller
              name="consultationType"
              control={control}
              render={({ field }) => (
                <Select
                  value={field.value}
                  onValueChange={value => {
                    field.onChange(value);
                  }}
                >
                  <SelectTrigger className="ui-select w-full">
                    <span
                      className={cn(
                        'text-xs',
                        !field.value && 'text-muted-foreground',
                      )}
                    >
                      {consultationTypes.find(
                        c => c.value.toString() === field.value,
                      )?.label || 'Tipo de consulta'}
                    </span>
                  </SelectTrigger>
                  <SelectContent className="ui-select">
                    {consultationTypes.map(type => (
                      <SelectItem
                        key={type.value}
                        value={type.value.toString()}
                      >
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </div>

          {/* City */}
          <div className="mb-4">
            <Label className="mb-2 block">Cidade</Label>
            <Controller
              name="city"
              control={control}
              render={({ field }) => (
                <Select
                  value={field.value}
                  onValueChange={value => {
                    field.onChange(value);
                  }}
                >
                  <SelectTrigger className="ui-select w-full">
                    <span
                      className={cn(
                        'text-xs',
                        !field.value && 'text-muted-foreground',
                      )}
                    >
                      {cities.find(c => c.value.toString() === field.value)
                        ?.label || 'Escolha a cidade'}
                    </span>
                  </SelectTrigger>
                  <SelectContent className="ui-select">
                    {cities.map(city => (
                      <SelectItem
                        key={city.value}
                        value={city.value.toString()}
                      >
                        {city.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </div>

          {/* Payment Method */}
          <div className="mb-4">
            <Label className="mb-2 block">Forma de pagamento</Label>
            <Controller
              name="paymentMethod"
              control={control}
              render={({ field }) => (
                <Select
                  value={field.value}
                  onValueChange={value => {
                    field.onChange(value);
                  }}
                >
                  <SelectTrigger className="ui-select w-full">
                    <span
                      className={cn(
                        'text-xs',
                        !field.value && 'text-muted-foreground',
                      )}
                    >
                      {paymentMethods.find(
                        p => p.value.toString() === field.value,
                      )?.label || 'Forma de pagamento'}
                    </span>
                  </SelectTrigger>
                  <SelectContent className="ui-select">
                    {paymentMethods.map(method => (
                      <SelectItem
                        key={method.value}
                        value={method.value.toString()}
                      >
                        {method.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </div>

          {/* Date */}
          <div className="mb-4">
            <Label className="mb-2 block">A partir de</Label>
            <Controller
              name="date"
              control={control}
              render={({ field }) => (
                <>
                  <Popover
                    open={openCalendar}
                    onOpenChange={() => setOpenCalendar(true)}
                  >
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          'w-full pl-3 text-left font-normal',
                          !field.value && 'text-muted-foreground',
                        )}
                      >
                        {field.value ? (
                          format(field.value, 'PPP', { locale: ptBR })
                        ) : (
                          <span
                            className={cn(
                              'text-xs',
                              !field.value && 'text-muted-foreground',
                            )}
                          >
                            Selecione a data
                          </span>
                        )}
                        <Icon
                          name="LuCalendar"
                          className="ml-auto h-4 w-4 opacity-50"
                        />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={date => {
                          field.onChange(date);
                          setOpenCalendar(false);
                        }}
                        disabled={date => {
                          const today = new Date();
                          today.setHours(0, 0, 0, 0);
                          return date < today;
                        }}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </>
              )}
            />
          </div>

          {/* Period */}
          <div className="mb-4">
            <Label className="mb-2 block">Período</Label>
            <Controller
              name="period"
              control={control}
              render={({ field }) => (
                <MultiSelect
                  options={period}
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  placeholder="Escolha o(s) período(s)"
                  variant="inverted"
                  animation={2}
                  maxCount={3}
                />
              )}
            />
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full"
            disabled={!isFilterEnabled} // Disable if no field is filled
          >
            Aplicar Filtros
          </Button>
        </form>
      </PopoverContent>
    </Popover>
  );
}
