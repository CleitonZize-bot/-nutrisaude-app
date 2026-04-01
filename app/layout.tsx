import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import '../css/style.css';

export const metadata: Metadata = {
  title: 'NutriSaude',
  description: 'Plano alimentar personalizado com onboarding em React e Next.js.',
  manifest: '/manifest.json',
  icons: {
    icon: '/icons/icon-192.svg',
    apple: '/icons/icon-192.svg',
  },
};

export const viewport: Viewport = {
  themeColor: '#080f14',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
