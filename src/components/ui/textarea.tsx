/* eslint-disable prettier/prettier */
import * as React from 'react';

import { cn } from '@/lib/utils';

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> { }

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          `
            flex min-h-[80px] max-h-60 w-full rounded-xl border border-input
            bg-white  px-3 py-2 text-sm ring-offset-background
            placeholder:text-muted-foreground focus-visible:border-primary
            focus-visible:shadow-3xl focus-visible:shadow-primary/25
            focus-visible:outline-none disabled:cursor-not-allowed
            disabled:opacity-50 dark:bg-black disabled:dark:border-slate-800
          `,
          className,
        )}

        ref={ref}
        {...props}
      />
    );
  },
);
Textarea.displayName = 'Textarea';

export { Textarea };
