import './globals.css';

import { ptBR } from '@clerk/localizations';
import { ClerkProvider } from '@clerk/nextjs';
import type { Metadata, Viewport } from 'next';
import { Roboto } from 'next/font/google';

import { Providers } from './providers';

const font = Roboto({
  subsets: ['latin'],
  display: 'swap',
  weight: ['300', '400', '500', '700'],
});

export const viewport: Viewport = {
  themeColor: 'black',
  initialScale: 1,
  width: 'device-width',
  height: 'device-height',
  minimumScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: 'Mind Schedule',
  description:
    'Agende com facilidade e eficiência, otimize seu atendimento e aumente a satisfação dos clientes.',
  keywords:
    'agendamento, plataforma de agendamento, eficiência, otimização de atendimento, gestão de agenda, aumentar clientes',
  robots: 'index, follow',
  openGraph: {
    title: 'Agende com eficiência e conquiste clientes!',
    description:
      'Transforme sua rotina com nossa plataforma de agendamento intuitiva.',
    images: ['https://www.mind-schedule.com/logos/mind-schedule.svg'],
    url: 'https://www.mind-schedule.com.br/',
    siteName: 'Mind Schedule',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Agende com eficiência e ganhe clientes!',
    description:
      'Agende de forma simples e aumente a satisfação dos seus clientes.',
    images: ['https://www.mind-schedule.com.br/logos/mind-schedule.svg'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider localization={ptBR}>
      <html lang="pt-br" className={font.className}>
        <body className="antialiased">
          <Providers>{children}</Providers>
        </body>
      </html>
    </ClerkProvider>
  );
}
