"use client";

import { useTranslations } from "next-intl";
import type { MergeSortStep } from "@/types/algorithm";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface MergeSortVisualProps {
  step: MergeSortStep;
}

export function MergeSortVisual({ step }: MergeSortVisualProps) {
  const t = useTranslations();
  const tv = useTranslations("algorithm.visualization.legend");
  const {
    array,
    range,
    leftRange,
    rightRange,
    leftIndex,
    rightIndex,
    placing,
    sortedIndices,
    type,
  } = step;
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

          // Sorted elements
          if (sortedIndices.includes(index)) {
            bgColor = "bg-viz-found text-viz-found-foreground";
            borderColor = "border-viz-found";
          }

          // Left half highlight
          if (leftRange && index >= leftRange[0] && index <= leftRange[1]) {
            bgColor = "bg-viz-range text-viz-range-foreground";
            borderColor = "border-viz-range";
          }

          // Right half highlight
          if (rightRange && index >= rightRange[0] && index <= rightRange[1]) {
            bgColor = "bg-viz-range text-viz-range-foreground";
            borderColor = "border-viz-range";
          }

          // Comparing element from left half
          if (
            leftIndex !== null &&
            leftRange &&
            index === leftRange[0] + leftIndex
          ) {
            bgColor = "bg-viz-mid text-viz-mid-foreground";
            borderColor = "border-viz-mid";
          }

          // Comparing element from right half
          if (
            rightIndex !== null &&
            rightRange &&
            index === rightRange[0] + rightIndex
          ) {
            bgColor = "bg-viz-mid text-viz-mid-foreground";
            borderColor = "border-viz-mid";
          }

          // Placing element
          if (placing !== null && index === placing) {
            bgColor = "bg-viz-swap text-viz-swap-foreground";
            borderColor = "border-viz-swap";
          }

          // Dim elements outside current range
          const isInRange = index >= range[0] && index <= range[1];
          const isOutsideRange = !isInRange && !sortedIndices.includes(index);

          return (
            <motion.div
              key={index}
              layout
              className={cn(
                "flex flex-col items-center justify-end rounded-t-md border-2 border-b-0 transition-colors",
                bgColor,
                borderColor,
                isOutsideRange && "opacity-30",
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

      {/* Range info */}
      {type !== "initial" && type !== "sorted" && (
        <div className="text-xs text-muted-foreground">
          {t("algorithm.visualization.range")}: [{range[0]}..{range[1]}]
          {leftRange && (
            <span className="ml-3">
              L: [{leftRange[0]}..{leftRange[1]}]
            </span>
          )}
          {rightRange && (
            <span className="ml-3">
              R: [{rightRange[0]}..{rightRange[1]}]
            </span>
          )}
        </div>
      )}

      {/* Step description */}
      <div className="text-center text-sm p-3 bg-muted rounded-lg max-w-md">
        <span>{t(step.descriptionKey, step.descriptionParams)}</span>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs">
        <div className="flex items-center gap-1">
          <div className="size-3 rounded bg-viz-default" />
          <span className="text-muted-foreground">{tv("unsorted")}</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="size-3 rounded bg-viz-range" />
          <span className="text-muted-foreground">{tv("range")}</span>
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
