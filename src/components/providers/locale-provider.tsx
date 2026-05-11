"use client";

import { useLocale as useNextIntlLocale } from "next-intl";
import { useLocaleContext } from "./intl-provider";

export function useLocale() {
  return useNextIntlLocale();
}

export function useChangeLocale() {
  const { changeLocale } = useLocaleContext();
  return { changeLocale };
}
