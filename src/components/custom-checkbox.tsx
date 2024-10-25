import { Checkbox } from './ui/checkbox';
import { FormControl, FormField, FormItem, FormMessage } from './ui/form';

interface CustomCheckboxProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  registerName: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: any;
  labelText?: string;
}

export const CustomCheckBox = ({
  registerName,
  control,
  labelText,
}: CustomCheckboxProps) => {
  return (
    <FormField
      control={control}
      name={registerName}
      render={({ field }) => (
        <FormItem className="space-y-1">
          <FormControl>
            <div className="flex items-center gap-4">
              <Checkbox
                id={field.name}
                checked={field.value} // Define o valor inicial como defaultValue
                onChange={field.onChange} // Atualiza o valor no formulário
              />

              {labelText && (
                <label
                  htmlFor={field.name}
                  className="min-w-32 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {labelText}
                </label>
              )}
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
