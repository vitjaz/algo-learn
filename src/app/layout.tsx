import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { IntlProvider } from "@/components/providers/intl-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AppShell } from "@/components/layout/app-shell";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://algo-learn.alexeev-blog.ru";

export const metadata: Metadata = {
  title: "Algo Learn — Изучайте алгоритмы через визуализации",
  description:
    "Интерактивные визуализации алгоритмов и структур данных для веб-разработчиков. Бинарный поиск, сортировка пузырьком, быстрая сортировка и другие.",
  openGraph: {
    title: "Algo Learn — Изучайте алгоритмы через визуализации",
    description:
      "Интерактивные визуализации алгоритмов и структур данных для веб-разработчиков.",
    url: SITE_URL,
    siteName: "Algo Learn",
    locale: "ru_RU",
    type: "website",
    images: [
      {
        url: `${SITE_URL}/api/og?title=Algo%20Learn&desc=${encodeURIComponent("Изучайте алгоритмы через интерактивные визуализации")}`,
        width: 1200,
        height: 630,
        alt: "Algo Learn — интерактивные визуализации алгоритмов",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Algo Learn — Изучайте алгоритмы через визуализации",
    description:
      "Интерактивные визуализации алгоритмов и структур данных для веб-разработчиков.",
    images: [
      `${SITE_URL}/api/og?title=Algo%20Learn&desc=${encodeURIComponent("Изучайте алгоритмы через интерактивные визуализации")}`,
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-[family-name:var(--font-geist-sans)] antialiased`}
      >
        <ThemeProvider>
          <IntlProvider>
            <TooltipProvider>
              <AppShell>{children}</AppShell>
            </TooltipProvider>
          </IntlProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
