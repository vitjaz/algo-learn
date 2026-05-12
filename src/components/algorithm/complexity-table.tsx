"use client";

import { useTranslations } from "next-intl";
import type { Complexity } from "@/types/algorithm";
import { Badge } from "@/components/ui/badge";

interface ComplexityTableProps {
  complexity: Complexity;
}

export function ComplexityTable({ complexity }: ComplexityTableProps) {
  const t = useTranslations("algorithm");

  const rows = [
    { label: t("bestCase"), value: complexity.best },
    { label: t("averageCase"), value: complexity.average },
    { label: t("worstCase"), value: complexity.worst },
    { label: t("spaceComplexity"), value: complexity.space },
  ];

  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-lg font-semibold">{t("complexity")}</h2>
      <div className="grid grid-cols-2 gap-3">
        {rows.map((row) => (
          <div
            key={row.label}
            className="flex flex-col items-center gap-2 p-4 rounded-lg bg-muted/50"
          >
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider text-center">
              {row.label}
            </span>
            <Badge
              variant="secondary"
              className="text-base font-mono px-3 py-3"
            >
              {row.value}
            </Badge>
          </div>
        ))}
      </div>
    </section>
  );
}
