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
    <div className="space-y-3">
      <h2 className="text-lg font-semibold">{t("complexity")}</h2>
      <div className="grid grid-cols-2 gap-3">
        {rows.map((row) => (
          <div
            key={row.label}
            className="flex flex-col items-center p-3 bg-card rounded-lg border border-border"
          >
            <span className="text-xs text-muted-foreground mb-1">
              {row.label}
            </span>
            <Badge variant="secondary" className="text-sm font-mono">
              {row.value}
            </Badge>
          </div>
        ))}
      </div>
    </div>
  );
}
