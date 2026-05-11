"use client";

import { useTranslations } from "next-intl";
import { Badge } from "@/components/ui/badge";

interface AlgorithmDescriptionProps {
  slug: string;
}

export function AlgorithmDescription({ slug }: AlgorithmDescriptionProps) {
  const t = useTranslations();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">
          {t(`algorithms.${slug}.title`)}
        </h1>
        <Badge variant="secondary" className="w-fit">
          {t(`categories.${slug === "binary-search" ? "search" : "sorting"}`)}
        </Badge>
      </div>

      <div className="flex flex-col gap-2">
        <h2 className="text-lg font-semibold">{t("algorithm.description")}</h2>
        <p className="text-muted-foreground leading-relaxed">
          {t(`algorithms.${slug}.description`)}
        </p>
      </div>

      <div className="flex flex-col gap-2">
        <h2 className="text-lg font-semibold">{t("algorithm.whyItMatters")}</h2>
        <p className="text-muted-foreground leading-relaxed">
          {t(`algorithms.${slug}.whyItMatters`)}
        </p>
      </div>
    </div>
  );
}
