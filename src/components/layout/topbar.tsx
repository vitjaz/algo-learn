"use client";

import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import { useLocaleContext } from "@/components/providers/intl-provider";
import { Button } from "@/components/ui/button";
import { Sun, Moon, Languages } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";

export function TopBar() {
  const t = useTranslations("common");
  const { theme, setTheme } = useTheme();
  const { locale, changeLocale } = useLocaleContext();

  return (
    <header className="flex h-14 shrink-0 items-center gap-2 border-b border-border px-4">
      <SidebarTrigger className="-ml-1" />
      {/* <Separator orientation="vertical" className="mr-2 h-4" /> */}

      {/* Logo */}
      <span className="flex items-center gap-2 font-bold text-lg mr-auto tracking-tight">
        <span className="flex size-7 items-center justify-center rounded-md bg-primary text-primary-foreground text-xs font-extrabold">
          AL
        </span>
        <span className="hidden sm:inline">{t("siteName")}</span>
      </span>

      {/* Right side controls */}
      <div className="flex items-center gap-1">
        {/* Language toggle */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => changeLocale(locale === "ru" ? "en" : "ru")}
          aria-label={t("language")}
          title={
            locale === "ru" ? "Switch to English" : "Переключить на русский"
          }
        >
          <Languages className="size-4" />
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
          <Sun className="size-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute size-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        </Button>
      </div>
    </header>
  );
}
