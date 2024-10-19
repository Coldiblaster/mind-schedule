import { cva } from 'class-variance-authority';
import { Gluten, Ubuntu } from 'next/font/google';
import { type ComponentProps, createElement } from 'react';

const ubuntu = Ubuntu({
  subsets: ['latin'],
  display: 'swap',
  weight: ['300', '400', '500', '700'],
});

const gluten = Gluten({
  subsets: ['latin'],
  display: 'swap',
  weight: ['600', '400', '100'],
});

export interface IHeadingProps extends ComponentProps<'div'> {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

export interface IDisplay extends ComponentProps<'div'> {
  as?: '300' | '400' | '500' | '700';
}
export interface ICaption extends ComponentProps<'div'> {
  as?: '600' | '400' | '100';
}

export const Heading = (props: IHeadingProps) => {
  return createElement(props.as || 'h2', {
    ...props,
    className: cva([props.className, ubuntu.className], {
      variants: {
        as: {
          h1: 'text-lg font-semibold leading-[1em] md:text-[4rem] lg:text-[5rem]',
          h2: 'text-lg font-bold uppercase leading-[.8em] md:text-[2.4rem] lg:text-[2.875rem]',
          h3: 'text-lg font-extrabold leading-[.9em] md:text-[2rem] lg:text-[2.25rem]',
          h4: 'text-base font-semibold leading-[.8em] md:text-[1.5rem]',
          h5: 'text-base font-bold leading-[.9em] md:text-[1.25rem]',
          h6: 'font-semibold uppercase',
        },
      },
    })({
      as: props.as,
    }),
  });
};

export const Display1 = (props: IDisplay) => {
  return (
    <h3
      {...props}
      className={cva(
        [ubuntu.className, props.className, 'text-4xl md:text-6xl lg:text-7xl'],
        {
          variants: {
            as: {
              '300': 'font-light',
              '400': 'font-normal',
              '500': 'font-medium',
              '700': 'font-bold',
            },
          },
        },
      )({ as: props.as })}
    >
      {props.children}
    </h3>
  );
};

export const Display2 = (props: IDisplay) => {
  return (
    <h4
      {...props}
      className={cva(
        [ubuntu.className, props.className, 'text-xl md:text-2xl lg:text-3xl'],
        {
          variants: {
            as: {
              '300': 'font-light',
              '400': 'font-normal',
              '500': 'font-medium',
              '700': 'font-bold',
            },
          },
        },
      )({ as: props.as })}
    >
      {props.children}
    </h4>
  );
};

export const Caption = (props: ICaption) => {
  return (
    <h1
      className={cva([props.className, gluten.className, 'text-7xl'], {
        variants: {
          as: {
            '100': 'font-thin',
            '400': 'font-normal',
            '600': 'font-semibold',
          },
        },
      })({ as: props.as })}
    >
      {props.children}
    </h1>
  );
};
