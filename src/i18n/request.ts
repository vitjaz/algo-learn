import { getRequestConfig } from "next-intl/server";
import { cookies } from "next/headers";

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

  return {
    locale,
    messages: (await import(`./${locale}.json`)).default,
    timeZone: "Europe/Moscow",
  };
});
