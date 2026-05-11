"use client";

import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import { useLocale, useChangeLocale } from "@/components/providers/locale-provider";
import { Button } from "@/components/ui/button";
import { Sun, Moon, Languages, Menu } from "lucide-react";
import Link from "next/link";

interface TopBarProps {
  onMenuClick: () => void;
}

export function TopBar({ onMenuClick }: TopBarProps) {
  const t = useTranslations("common");
  const { theme, setTheme } = useTheme();
  const locale = useLocale();
  const { changeLocale } = useChangeLocale();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center px-4 gap-2">
        {/* Mobile menu button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={onMenuClick}
          aria-label={t("sidebarToggle")}
        >
          <Menu className="h-5 w-5" />
        </Button>

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-bold text-lg mr-auto">
          <span className="text-primary">⌨️</span>
          <span>{t("siteName")}</span>
        </Link>

        {/* Right side controls */}
        <div className="flex items-center gap-1">
          {/* Language toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => changeLocale(locale === "ru" ? "en" : "ru")}
            aria-label={t("language")}
            title={locale === "ru" ? "Switch to English" : "Переключить на русский"}
          >
            <Languages className="h-5 w-5" />
            <span className="ml-1 text-xs font-medium uppercase">
              {locale === "ru" ? "RU" : "EN"}
            </span>
          </Button>

          {/* Theme toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label={t("theme")}
          >
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </Button>
        </div>
      </div>
    </header>
  );
}
