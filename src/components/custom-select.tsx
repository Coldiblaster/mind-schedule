import { Control } from 'react-hook-form';

import { FormControl, FormField, FormItem, FormMessage } from './ui/form';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

interface CustomSelectProps
  extends React.InputHTMLAttributes<HTMLSelectElement> {
  defaultValue: string;
  registerName: string;
  // eslint-disable-next-line
  control: Control<any>;
  labelText: string;
  options: { value: string; label: string }[];
}

export const CustomSelect = ({
  defaultValue,
  registerName,
  control,
  labelText,
  options,
}: CustomSelectProps) => {
  return (
    <FormField
      control={control}
      name={registerName}
      defaultValue={defaultValue}
      render={({ field }) => (
        <FormItem className="space-y-1">
          {labelText && (
            <label htmlFor={registerName} className="sr-only">
              {labelText}
            </label>
          )}
          <FormControl>
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione..." />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {options.map(option => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
