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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: any;
  labelText: string;
  options: { value: string; label: string }[];
}

export const CustomSelect = ({
  defaultValue,
  registerName,
  control,
  options,
}: CustomSelectProps) => {
  return (
    <FormField
      control={control}
      name={registerName}
      defaultValue={defaultValue} // Passa o valor padrão para o FormField
      render={({ field }) => (
        <FormItem className="space-y-1">
          <FormControl>
            <Select
              value={field.value || defaultValue} // Define o valor inicial como defaultValue
              onValueChange={field.onChange} // Atualiza o valor no formulário
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione..." />{' '}
                {/* Placeholder opcional */}
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
