import './globals.css';

import { ClerkProvider } from '@clerk/nextjs';
import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';

import { Providers } from './providers';

const font = Roboto({
  subsets: ['latin'],
  display: 'swap',
  weight: ['300', '400', '500', '700'],
});

export const metadata: Metadata = {
  title: 'my.mind',
  description:
    'Agende com facilidade e eficiência, otimize seu atendimento e aumente a satisfação dos clientes.',
  keywords:
    'agendamento, plataforma de agendamento, eficiência, otimização de atendimento, gestão de agenda, aumentar clientes',
  robots: 'index, follow',
  openGraph: {
    title: 'Agende com eficiência e conquiste clientes!',
    description:
      'Transforme sua rotina com nossa plataforma de agendamento intuitiva.',
    images: ['https://www.mymind.com/logo/my-mind.svg'],
    url: 'URL_do_seu_site',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Agende com eficiência e ganhe clientes!',
    description:
      'Agende de forma simples e aumente a satisfação dos seus clientes.',
    images: ['https://www.mymind.com/logo/my-mind.svg'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="pt-br" className={font.className}>
        <body className="antialiased">
          <Providers>{children}</Providers>
        </body>
      </html>
    </ClerkProvider>
  );
}
