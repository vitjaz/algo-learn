"use client";

import { useTranslations } from "next-intl";
import type { InsertionSortStep } from "@/types/algorithm";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface InsertionSortVisualProps {
  step: InsertionSortStep;
}

export function InsertionSortVisual({ step }: InsertionSortVisualProps) {
  const t = useTranslations();
  const tv = useTranslations("algorithm.visualization.legend");
  const {
    array,
    keyIndex,
    comparing,
    shifting,
    inserting,
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

          // Key element (current element being inserted)
          if (index === keyIndex) {
            bgColor = "bg-viz-range text-viz-range-foreground";
            borderColor = "border-viz-range";
          }

          // Comparing element
          if (comparing !== null && index === comparing) {
            bgColor = "bg-viz-mid text-viz-mid-foreground";
            borderColor = "border-viz-mid";
          }

          // Shifting element
          if (shifting !== null && index === shifting) {
            bgColor = "bg-viz-swap text-viz-swap-foreground";
            borderColor = "border-viz-swap";
          }

          // Inserting element
          if (inserting !== null && index === inserting) {
            bgColor = "bg-viz-swap text-viz-swap-foreground";
            borderColor = "border-viz-swap";
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

      {/* Step description */}
      <div className="text-center text-sm p-3 bg-muted rounded-lg max-w-md">
        <span>
          {t(`algorithms.insertion-sort.steps.${type}`, step.descriptionParams)}
        </span>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs">
        <div className="flex items-center gap-1">
          <div className="size-3 rounded bg-viz-default" />
          <span className="text-muted-foreground">{tv("unsorted")}</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="size-3 rounded bg-viz-range" />
          <span className="text-muted-foreground">{tv("key")}</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="size-3 rounded bg-viz-mid" />
          <span className="text-muted-foreground">{tv("comparing")}</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="size-3 rounded bg-viz-swap" />
          <span className="text-muted-foreground">{tv("shifting")}</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="size-3 rounded bg-viz-found" />
          <span className="text-muted-foreground">{tv("sorted")}</span>
        </div>
      </div>
    </div>
  );
}
