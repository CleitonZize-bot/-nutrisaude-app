import type { Metadata, Viewport } from 'next';
import './globals.css';
import { cn } from "@/lib/utils";

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  title: 'NutriSaude | Nova interface',
  description: 'Primeira etapa da nova interface do NutriSaude com componentes oficiais do shadcn/ui.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={cn("font-sans")}>
      <body>{children}</body>
    </html>
  );
}
