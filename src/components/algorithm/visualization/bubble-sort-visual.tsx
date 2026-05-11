"use client";

import { useTranslations } from "next-intl";
import type { BubbleSortStep } from "@/types/algorithm";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface BubbleSortVisualProps {
  step: BubbleSortStep;
}

export function BubbleSortVisual({ step }: BubbleSortVisualProps) {
  const t = useTranslations();
  const tv = useTranslations("algorithm.visualization.legend");
  const tvControls = useTranslations("algorithm.visualization");
  const { array, comparing, swapped, sortedFrom, type } = step;
  const maxVal = Math.max(...array);

  return (
    <div className="flex flex-col items-center gap-6 p-4">
      {/* Bar visualization */}
      <div
        className="flex items-end gap-1 justify-center"
        style={{ height: "200px" }}
      >
        {array.map((value, index) => {
          const height = (value / maxVal) * 180 + 20;
          let bgColor = "bg-viz-default text-viz-default-foreground";
          let borderColor = "border-viz-default";

          if (index >= sortedFrom) {
            bgColor = "bg-viz-found text-viz-found-foreground";
            borderColor = "border-viz-found";
          }

          if (comparing && (index === comparing[0] || index === comparing[1])) {
            if (swapped) {
              bgColor = "bg-viz-swap text-viz-swap-foreground";
              borderColor = "border-viz-swap";
            } else {
              bgColor = "bg-viz-mid text-viz-mid-foreground";
              borderColor = "border-viz-mid";
            }
          }

          return (
            <motion.div
              key={index}
              layout
              className={cn(
                "flex flex-col items-center justify-end rounded-t-md border-2 border-b-0 transition-colors",
                bgColor,
                borderColor,
              )}
              style={{ width: "40px" }}
              initial={{ height: 0 }}
              animate={{ height }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <span className="text-xs font-bold mb-1">{value}</span>
            </motion.div>
          );
        })}
      </div>

      {/* Pass info */}
      {step.currentPass > 0 && (
        <div className="text-xs text-muted-foreground">
          {tvControls("pass")}: {step.currentPass}
        </div>
      )}

      {/* Step description */}
      <div className="text-center text-sm p-3 bg-muted rounded-lg max-w-md">
        <span>
          {t(`algorithms.bubble-sort.steps.${type}`, step.descriptionParams)}
        </span>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-3 text-xs">
        <div className="flex items-center gap-1">
          <div className="size-3 rounded bg-viz-default" />
          <span className="text-muted-foreground">{tv("unsorted")}</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="size-3 rounded bg-viz-mid" />
          <span className="text-muted-foreground">{tv("comparing")}</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="size-3 rounded bg-viz-swap" />
          <span className="text-muted-foreground">{tv("swapping")}</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="size-3 rounded bg-viz-found" />
          <span className="text-muted-foreground">{tv("sorted")}</span>
        </div>
      </div>
    </div>
  );
}
