"use client";

import { NextIntlClientProvider } from "next-intl";
import { type ReactNode, useState, createContext, useContext, useSyncExternalStore } from "react";

// Import both locales statically for client-side switching
import ruMessages from "@/i18n/ru.json";
import enMessages from "@/i18n/en.json";

const allMessages: Record<string, Record<string, unknown>> = {
  ru: ruMessages,
  en: enMessages,
};

const LOCALE_COOKIE = "locale";
const DEFAULT_LOCALE = "ru";

function getCookieLocale(): string {
  if (typeof document === "undefined") return DEFAULT_LOCALE;
  const match = document.cookie.match(
    new RegExp(`(?:^|; )${LOCALE_COOKIE}=([^;]*)`)
  );
  const value = match ? decodeURIComponent(match[1]) : null;
  return value && ["ru", "en"].includes(value) ? value : DEFAULT_LOCALE;
}

function setCookieLocale(locale: string) {
  document.cookie = `${LOCALE_COOKIE}=${locale};path=/;max-age=31536000`;
}

// No-op subscribe since cookies don't fire events
const emptySubscribe = () => () => {};

function useCookieLocale() {
  return useSyncExternalStore(emptySubscribe, getCookieLocale, () => DEFAULT_LOCALE);
}

interface LocaleContextValue {
  locale: string;
  changeLocale: (locale: string) => void;
}

const LocaleContext = createContext<LocaleContextValue>({
  locale: DEFAULT_LOCALE,
  changeLocale: () => {},
});

export function useLocaleContext() {
  return useContext(LocaleContext);
}

interface IntlProviderProps {
  children: ReactNode;
}

export function IntlProvider({ children }: IntlProviderProps) {
  const cookieLocale = useCookieLocale();
  const [overrideLocale, setOverrideLocale] = useState<string | null>(null);

  // Use override if user switched, otherwise use cookie
  const locale = overrideLocale ?? cookieLocale;

  const changeLocale = (newLocale: string) => {
    if (newLocale === locale) return;
    setCookieLocale(newLocale);
    setOverrideLocale(newLocale);
  };

  return (
    <NextIntlClientProvider
      locale={locale}
      messages={allMessages[locale]}
      timeZone="Europe/Moscow"
    >
      <LocaleContext.Provider value={{ locale, changeLocale }}>
        {children}
      </LocaleContext.Provider>
    </NextIntlClientProvider>
  );
}
