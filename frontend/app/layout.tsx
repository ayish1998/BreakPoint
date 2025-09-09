import './globals.css';
import { ThemeProvider } from 'next-themes';
import type { ReactNode } from 'react';
import { Inter, JetBrains_Mono } from 'next/font/google';
import AppShell from '../components/AppShell';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const jetbrains = JetBrains_Mono({ subsets: ['latin'], variable: '--font-jbm' });

export const metadata = {
  title: 'BreakPoint — Stress management for developers',
  description: 'Breathe, reflect, and focus. A developer-friendly stress relief toolkit.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`min-h-screen antialiased ${inter.variable} ${jetbrains.variable}`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <AppShell>
            {children}
          </AppShell>
        </ThemeProvider>
      </body>
    </html>
  );
}

