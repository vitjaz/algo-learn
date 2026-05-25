"use client";

import { useTranslations } from "next-intl";
import type { DifficultyLevel } from "@/types/algorithm";
import { cn } from "@/lib/utils";

interface DifficultyBadgeProps {
  difficulty: DifficultyLevel;
}

const difficultyColors: Record<DifficultyLevel, string> = {
  easy: "bg-green-500",
  medium: "bg-yellow-500",
  hard: "bg-red-500",
};

export function DifficultyBadge({ difficulty }: DifficultyBadgeProps) {
  const t = useTranslations("algorithm.difficulty");

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-1 py-1 text-[10px] font-medium text-white",
        difficultyColors[difficulty],
      )}
    >
      {/* {t(difficulty)} */}
    </span>
  );
}
