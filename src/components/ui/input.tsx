import * as React from 'react';

import { cn } from '@/lib/utils';

import { Icon, IconName } from '../icon';

export interface IInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: IconName;
  isLoading?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, IInputProps>(
  ({ className, type, icon, isLoading, ...props }, ref) => {
    return (
      <div className="relative flex items-center">
        <input
          type={type}
          className={cn(
            `${icon ? 'pl-3 pr-8' : 'px-3'} flex h-10 w-full rounded-xl border border-input bg-white py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:border-primary focus-visible:shadow-3xl focus-visible:shadow-primary/25 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 dark:bg-black disabled:dark:border-slate-800`,
            className,
          )}
          ref={ref}
          {...props}
        />

        {icon && <Icon className="absolute right-3" name={icon} />}
        {isLoading && (
          <Icon
            className="absolute right-3 animate-spin animate-duration-1000"
            name="PiSpinnerGap"
          />
        )}
      </div>
    );
  },
);
Input.displayName = 'Input';

export { Input };
