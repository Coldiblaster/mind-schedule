import { ChangeEvent } from 'react';
import { Control, useFormContext } from 'react-hook-form';

import { normalizeCEP, normalizePhoneNumber } from '@/schemas/mask';

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form';
import { Input } from './ui/input';

interface CustomInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
  registerName: string;
  maskName?: 'contact_phone' | 'cep';
  isFetching?: boolean;
  labelText?: string;
}

export const CustomInput = ({
  defaultValue,
  registerName,
  control,
  placeholder,
  type = 'text',
  maskName,
  isFetching,
  labelText,
  disabled,
  autoFocus,
}: CustomInputProps) => {
  const { setValue } = useFormContext();

  const changeValueMask = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    const newValue = maskName
      ? maskName.includes('contact_phone')
        ? normalizePhoneNumber(value)
        : normalizeCEP(value)
      : value;
    setValue(name, newValue);
  };

  return (
    <FormField
      control={control}
      name={registerName}
      render={({ field }) => (
        <FormItem className="space-y-1">
          <FormLabel htmlFor={registerName} className="text-xs uppercase">
            {labelText}
          </FormLabel>
          <FormControl onChange={changeValueMask}>
            <Input
              {...field}
              defaultValue={defaultValue}
              data-mask={maskName}
              id={registerName}
              placeholder={placeholder}
              isLoading={isFetching}
              type={type}
              autoComplete="off"
              disabled={disabled}
              autoFocus={autoFocus}
            />
          </FormControl>

          <FormMessage />
        </FormItem>
      )}
    />
  );
};
