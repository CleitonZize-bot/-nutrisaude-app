import type { Metadata } from 'next';
import './globals.css';
import { cn } from "@/lib/utils";

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
