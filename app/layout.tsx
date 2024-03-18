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
        <div className="max-w-5xl mx-auto">
          <h1 className="text-6xl font-bold uppercase text-center my-20 mx-10 text-gradient">
            Generate thesis with AI
          </h1>
          <p className=" text-center my-20 mx-10">
            We help to student generating three thesis ideas, giving you links
            to find the same between other thesises and articles.
          </p>
          <div className="px-4 lg:px-8">{children}</div>
        </div>
      </body>
    </html>
  );
}
