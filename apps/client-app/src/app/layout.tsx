import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ReactNode } from 'react';

import MainNav from '@/components/MainNav';
import { Toaster } from '@/components/ui/toaster';

import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'SeuPC',
  description: 'Site SeuPC',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`flex flex-row ${inter.className}`}>
        <MainNav />
        <div className="w-full min-h-screen">
          {children}
        </div>
        <Toaster />
      </body>
    </html>
  );
}
