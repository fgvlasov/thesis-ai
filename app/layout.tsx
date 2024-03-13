import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';

import { ToasterProvider } from '@/components/toaster-provider';

import './globals.css';

const font = Montserrat({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Thesises',
  description: 'AI Platform',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={font.className}>
        <ToasterProvider />

        {children}
      </body>
    </html>
  );
}
