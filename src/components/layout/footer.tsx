"use client";

import { useTranslations } from "next-intl";
import { Heart } from "lucide-react";

export function Footer() {
  const t = useTranslations("common");

  return (
    <footer className="border-t border-border py-6 px-4 mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-sm text-muted-foreground">
        <div className="flex items-center gap-1">
          {t("madeWithLove")}
          <Heart className="h-4 w-4 text-red-500 fill-red-500" />
        </div>
        <a
          href="https://t.me/algo_learn"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-foreground transition-colors"
        >
          Telegram
        </a>
      </div>
    </footer>
  );
}
