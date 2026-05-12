"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function HeroSection() {
  const t = useTranslations("home");

  return (
    <div className="relative flex flex-col items-center text-center py-16 md:py-24 gap-6 overflow-hidden">
      {/* Background decoration */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)",
          backgroundSize: "24px 24px",
        }}
      />
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[500px] rounded-full bg-primary/5 blur-3xl" />

      {/* Content */}
      <div className="relative flex flex-col items-center gap-6 animate-fade-in">
        <Badge
          variant="secondary"
          className="text-xs sm:text-sm px-3 sm:px-4 py-1 text-center leading-snug whitespace-normal h-auto max-w-xs sm:max-w-none"
        >
          {t("heroSubtitle")}
        </Badge>
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
          {t("heroTitle")}
        </h1>
        <p className="text-base sm:text-lg text-muted-foreground max-w-2xl leading-relaxed">
          {t("heroDescription")}
        </p>
        <Link href="/algorithms/binary-search">
          <Button size="lg" className="text-base px-8 gap-2">
            {t("startLearning")}
            <ArrowRight className="size-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
