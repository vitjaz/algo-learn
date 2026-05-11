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
  const { array, comparing, swapped, sortedFrom, type } = step;
  const maxVal = Math.max(...array);

  return (
    <div className="flex flex-col items-center gap-6 p-4">
      {/* Bar visualization */}
      <div className="flex items-end gap-1 justify-center" style={{ height: "200px" }}>
        {array.map((value, index) => {
          const height = (value / maxVal) * 180 + 20;
          let bgColor = "bg-blue-500";
          let borderColor = "border-blue-600";

          if (index >= sortedFrom) {
            bgColor = "bg-green-500";
            borderColor = "border-green-600";
          }

          if (comparing && (index === comparing[0] || index === comparing[1])) {
            if (swapped) {
              bgColor = "bg-red-500";
              borderColor = "border-red-600";
            } else {
              bgColor = "bg-yellow-500";
              borderColor = "border-yellow-600";
            }
          }

          return (
            <motion.div
              key={index}
              layout
              className={cn(
                "flex flex-col items-center justify-end rounded-t-md border-2 border-b-0 transition-colors",
                bgColor,
                borderColor
              )}
              style={{ width: "40px" }}
              initial={{ height: 0 }}
              animate={{ height }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <span className="text-xs font-bold text-white mb-1">{value}</span>
            </motion.div>
          );
        })}
      </div>

      {/* Pass info */}
      {step.currentPass > 0 && (
        <div className="text-xs text-muted-foreground">
          Pass: {step.currentPass}
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
          <div className="w-3 h-3 rounded bg-blue-500" />
          <span className="text-muted-foreground">Unsorted</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded bg-yellow-500" />
          <span className="text-muted-foreground">Comparing</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded bg-red-500" />
          <span className="text-muted-foreground">Swapping</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded bg-green-500" />
          <span className="text-muted-foreground">Sorted</span>
        </div>
      </div>
    </div>
  );
}
