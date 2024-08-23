import type { Metadata } from 'next';

import AppBar from '@/components/AppBar';

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <AppBar />
      {children}
    </>
  );
}
