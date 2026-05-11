"use client";

import { useTranslations } from "next-intl";
import type { BinarySearchStep } from "@/types/algorithm";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface BinarySearchVisualProps {
  step: BinarySearchStep;
}

export function BinarySearchVisual({ step }: BinarySearchVisualProps) {
  const t = useTranslations();
  const { array, target, left, right, mid, found, type } = step;

  return (
    <div className="flex flex-col items-center gap-6 p-4">
      {/* Target display */}
      <div className="text-center">
        <span className="text-sm text-muted-foreground">
          {type === "initial"
            ? t("algorithms.binary-search.steps.initial", { target })
            : `Target: ${target}`}
        </span>
        <div className="text-3xl font-bold text-primary mt-1">{target}</div>
      </div>

      {/* Array visualization */}
      <div className="flex items-end gap-1 flex-wrap justify-center">
        {array.map((value, index) => {
          let bgColor = "bg-muted text-muted-foreground"; // default/eliminated
          let borderColor = "border-border";

          if (found && mid === index) {
            bgColor = "bg-green-500 text-white";
            borderColor = "border-green-600";
          } else if (mid === index) {
            bgColor = "bg-yellow-500 text-white";
            borderColor = "border-yellow-600";
          } else if (index >= left && index <= right) {
            bgColor = "bg-blue-500 text-white";
            borderColor = "border-blue-600";
          }

          return (
            <motion.div
              key={index}
              layout
              className={cn(
                "flex flex-col items-center justify-center w-12 h-12 rounded-lg border-2 font-mono text-sm font-bold transition-colors",
                bgColor,
                borderColor
              )}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.2, delay: index * 0.02 }}
            >
              <span>{value}</span>
              <span className="text-[10px] opacity-70">{index}</span>
            </motion.div>
          );
        })}
      </div>

      {/* Pointer indicators */}
      <div className="flex gap-4 text-xs text-muted-foreground">
        <span>
          L = <span className="font-mono font-bold text-blue-500">{left}</span>
        </span>
        <span>
          R = <span className="font-mono font-bold text-blue-500">{right}</span>
        </span>
        {mid !== null && (
          <span>
            M = <span className="font-mono font-bold text-yellow-500">{mid}</span>
          </span>
        )}
      </div>

      {/* Step description */}
      <div className="text-center text-sm p-3 bg-muted rounded-lg max-w-md">
        {type !== "initial" && type !== "notFound" && type !== "found" && (
          <span>
            {t(`algorithms.binary-search.steps.${type}`, step.descriptionParams)}
          </span>
        )}
        {(type === "initial" || type === "notFound" || type === "found") && (
          <span>
            {t(`algorithms.binary-search.steps.${type}`, step.descriptionParams)}
          </span>
        )}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-3 text-xs">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded bg-blue-500" />
          <span className="text-muted-foreground">Range</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded bg-yellow-500" />
          <span className="text-muted-foreground">Mid</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded bg-green-500" />
          <span className="text-muted-foreground">Found</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded bg-muted" />
          <span className="text-muted-foreground">Eliminated</span>
        </div>
      </div>
    </div>
  );
}
