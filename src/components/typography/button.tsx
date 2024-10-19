import { Saira_Condensed } from 'next/font/google';

export type ButtonProps = React.ComponentProps<'div'>;

const saira = Saira_Condensed({
  subsets: ['latin'],
  weight: ['100', '300', '600', '700'],
});

export const ButtonXL = ({
  children,
  className = '',
  ...rest
}: ButtonProps) => {
  return (
    <div
      {...rest}
      className={`${saira.className} text-[1.375em] font-bold uppercase leading-[.85em] ${className}`}
    >
      {children}
    </div>
  );
};

export const ButtonLG = ({
  children,
  className = '',
  ...rest
}: ButtonProps) => {
  return (
    <div
      {...rest}
      className={`${saira.className} text-[1.250em] font-light uppercase leading-[.85em] ${className}`}
    >
      {children}
    </div>
  );
};

export const ButtonMD = ({
  children,
  className = '',
  ...rest
}: ButtonProps) => {
  return (
    <div
      {...rest}
      className={`${saira.className} text-base font-thin uppercase ${className}`}
    >
      {children}
    </div>
  );
};

export const ButtonSM = ({
  children,
  className = '',
  ...rest
}: ButtonProps) => {
  return (
    <div
      {...rest}
      className={`${saira.className} text-sm font-semibold uppercase ${className}`}
    >
      {children}
    </div>
  );
};
