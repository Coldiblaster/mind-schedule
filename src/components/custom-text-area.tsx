import { Control } from 'react-hook-form';

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form';
import { Textarea } from './ui/textarea';

interface CustomInputProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
  registerName: string;
  labelText?: string;
}

export const CustomTextArea = ({
  defaultValue,
  registerName,
  control,
  placeholder,
  labelText,
  disabled,
  autoFocus,
}: CustomInputProps) => {
  return (
    <FormField
      control={control}
      name={registerName}
      render={({ field }) => (
        <FormItem className="space-y-1">
          <FormLabel htmlFor={registerName} className="text-xs uppercase">
            {labelText}
          </FormLabel>
          <FormControl>
            <Textarea
              {...field}
              defaultValue={defaultValue}
              id={registerName}
              placeholder={placeholder}
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
