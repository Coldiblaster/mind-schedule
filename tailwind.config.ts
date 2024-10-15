/* eslint-disable @typescript-eslint/no-var-requires */
import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/containers/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      container: {
        center: true,
        padding: '2rem',
        screens: {
          '2xl': '1400px',
        },
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
      clipPath: {
        'polygon-clip': 'polygon(0 0, 100% 0, 100% 100vh, 0% 100%)',
      },
      backgroundImage: {
        'gradient-balls-top-left':
          'linear-gradient(320deg, rgb(41 8 72 / 13%) 15%, rgba(8, 39, 72, 0) 50%)',
        'gradient-balls-top-right':
          'linear-gradient(55deg, rgba(8, 39, 72, 0.133) 20%, rgba(8, 39, 72, 0) 60%)',
        'gradient-balls-bottom-left':
          'linear-gradient(200deg, rgba(8, 39, 72, 0.133) 30%, rgba(8, 39, 72, 0) 60%)',
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'),
    require('tailwindcss-animated'),
    require('tailwind-scrollbar')({
      nocompatible: true,
      preferredStrategy: 'pseudoelements',
    }),
    function ({
      addUtilities,
    }: {
      addUtilities: (
        utilities: Record<string, string | Record<string, string>>,
      ) => void;
    }) {
      addUtilities({
        '.clip-polygon-clip': {
          clipPath: 'polygon(0 0, 100% 0, 100% 100vh, 0% 100%)',
          '-webkit-clip-path': 'polygon(0 0, 100% 0, 100% 100vh, 0% 100%)',
        },
      });
    }, // Aqui estamos informando que é um plugin do Tailwind
  ],
};

export default config;
