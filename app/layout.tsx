import type { Metadata, Viewport } from 'next';
import './globals.css';
import { cn } from "@/lib/utils";
import { RegisterSW } from "@/components/register-sw";

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#00c472',
};

export const metadata: Metadata = {
  title: 'NutriSaúde | Plano Alimentar Personalizado',
  description: 'Cardápio diário personalizado para esteatose hepática, diabetes e mais.',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'NutriSaúde',
  },
  icons: {
    icon: '/icons/icon-192.svg',
    apple: '/icons/icon-192.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={cn("font-sans")}>
      <head>
        <link rel="apple-touch-icon" href="/icons/icon-192.svg" />
        <meta name="mobile-web-app-capable" content="yes" />
      </head>
      <body>
        {children}
        <RegisterSW />
      </body>
    </html>
  );
}
