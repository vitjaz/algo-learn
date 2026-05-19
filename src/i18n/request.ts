import { getRequestConfig } from "next-intl/server";
import { cookies } from "next/headers";
import { loadI18nTranslations } from "next-intl-split/load";

export default getRequestConfig(async () => {
  let locale = "ru";

  try {
    const store = await cookies();
    const cookieLocale = store.get("locale")?.value;
    if (cookieLocale && ["ru", "en"].includes(cookieLocale)) {
      locale = cookieLocale;
    }
  } catch {
    // cookies() not available during static generation, use default
  }

  const messages = loadI18nTranslations("./src/i18n/dictionaries", locale);

  return {
    locale,
    messages,
    timeZone: "Europe/Moscow",
  };
});
