import { type ComponentProps } from 'react';

export type BodyProps = ComponentProps<'div'> & {
  as: '700' | '400' | '300' | '200';
  children?: React.ReactNode | string;
  className?: string;
};

export const LG = ({ as, children, className = '', ...rest }: BodyProps) => {
  return (
    <>
      {as === '700' && (
        <div {...rest} className={`font-bold md:text-xl ${className}`}>
          {children}
        </div>
      )}
      {as === '400' && (
        <div {...rest} className={`md:text-xl ${className}`}>
          {children}
        </div>
      )}
      {as === '200' && (
        <div {...rest} className={`font-thin md:text-xl ${className}7`}>
          {children}
        </div>
      )}
    </>
  );
};

export const MD = ({ as, children, className = '', ...rest }: BodyProps) => {
  return (
    <>
      {as === '700' && (
        <div
          {...rest}
          className={`text-sm font-bold md:text-base ${className}`}
        >
          {children}
        </div>
      )}
      {as === '400' && (
        <div {...rest} className={`text-sm md:text-base ${className}`}>
          {children}
        </div>
      )}
      {as === '300' && (
        <div
          {...rest}
          className={`text-sm font-light md:text-base ${className}`}
        >
          {children}
        </div>
      )}
    </>
  );
};

export const SM = ({ as, children, className = '', ...rest }: BodyProps) => {
  return (
    <>
      {as === '700' && (
        <div {...rest} className={`${className} text-sm font-bold`}>
          {children}
        </div>
      )}
      {as === '400' && (
        <div {...rest} className={`${className} text-sm`}>
          {children}
        </div>
      )}
    </>
  );
};
export const XS = ({ as, children, className = '', ...rest }: BodyProps) => {
  return (
    <>
      {as === '700' && (
        <div {...rest} className={`${className} text-xs font-bold`}>
          {children}
        </div>
      )}
      {as === '400' && (
        <div {...rest} className={`${className} text-xs leading-4`}>
          {children}
        </div>
      )}
    </>
  );
};
