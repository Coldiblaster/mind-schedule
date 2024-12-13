/* eslint-disable prettier/prettier */
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

import { Icon } from "../icon";

const buttonVariants = cva(
  "inline-flex gap-2 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 items-center justify-center whitespace-nowrap rounded-xl text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-60",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground hover:bg-gradient-to-l dark:to-teal-400/90",
        gradient:
          "bg-gradient-to-r from-primary from-30% to-teal-500 to-100% text-primary-foreground hover:bg-gradient-to-l dark:to-teal-400/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        success:
          "hover:bg-emarald-500/90 bg-emerald-500 text-white dark:bg-emerald-600 dark:hover:bg-emerald-600/80",
        outline:
          "border border-input bg-background hover:bg-background/50 hover:text-accent-foreground dark:border-gray-800 dark:bg-background/40",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-6 py-2",
        sm: "h-9 px-4",
        xs: "h-8 px-2.5 text-xs",
        lg: "h-12 px-8",
        icon: "h-10 w-10 rounded-full shrink-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  isLoading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, isLoading, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(
          "hover:brightness-90",
          buttonVariants({ variant, size, className }),
        )}
        ref={ref}
        {...props}
        disabled={isLoading || props.disabled}
      >
        {isLoading ? (
          <>
            <Icon
              name="PiCircleNotch"
              size={30}
              className="animate-spin animate-duration-700"
            />
            Aguarde...
          </>
        ) : (
          props.children
        )}
      </Comp>
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
