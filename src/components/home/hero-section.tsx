"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function HeroSection() {
  const t = useTranslations("home");

  return (
    <div className="flex flex-col items-center text-center py-12 md:py-20">
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
        {t("heroTitle")}
      </h1>
      <p className="text-xl md:text-2xl text-muted-foreground mb-4 max-w-2xl">
        {t("heroSubtitle")}
      </p>
      <p className="text-muted-foreground max-w-xl mb-8 leading-relaxed">
        {t("heroDescription")}
      </p>
      <Link href="/algorithms/binary-search">
        <Button size="lg" className="text-base px-8">
          {t("startLearning")}
        </Button>
      </Link>
    </div>
  );
}
