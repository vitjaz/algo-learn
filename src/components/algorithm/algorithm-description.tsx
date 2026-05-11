"use client";

import { useTranslations } from "next-intl";

interface AlgorithmDescriptionProps {
  slug: string;
}

export function AlgorithmDescription({ slug }: AlgorithmDescriptionProps) {
  const t = useTranslations();

  return (
    <div className="space-y-4">
      <h1 className="text-2xl md:text-3xl font-bold">
        {t(`algorithms.${slug}.title`)}
      </h1>
      <div className="space-y-3">
        <div>
          <h2 className="text-lg font-semibold mb-1">
            {t("algorithm.description")}
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            {t(`algorithms.${slug}.description`)}
          </p>
        </div>
        <div>
          <h2 className="text-lg font-semibold mb-1">
            {t("algorithm.whyItMatters")}
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            {t(`algorithms.${slug}.whyItMatters`)}
          </p>
        </div>
      </div>
    </div>
  );
}
