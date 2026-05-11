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
  const tv = useTranslations("algorithm.visualization.legend");
  const { array, target, left, right, mid, found, type } = step;

  return (
    <div className="flex flex-col items-center gap-6 p-4">
      {/* Target display */}
      <div className="text-center">
        {/* <span className="text-sm text-muted-foreground">
          {type === "initial"
            ? t("algorithms.binary-search.steps.initial", { target })
            : `Target: ${target}`}
        </span> */}
        <div className="text-3xl font-bold text-primary mt-1">{target}</div>
      </div>

      {/* Array visualization */}
      <div className="flex items-end gap-1 flex-wrap justify-center">
        {array.map((value, index) => {
          let bgColor = "bg-viz-default text-viz-default-foreground";
          let borderColor = "border-viz-default";

          if (found && mid === index) {
            bgColor = "bg-viz-found text-viz-found-foreground";
            borderColor = "border-viz-found";
          } else if (mid === index) {
            bgColor = "bg-viz-mid text-viz-mid-foreground";
            borderColor = "border-viz-mid";
          } else if (index >= left && index <= right) {
            bgColor = "bg-viz-range text-viz-range-foreground";
            borderColor = "border-viz-range";
          }

          return (
            <motion.div
              key={index}
              layout
              className={cn(
                "flex flex-col items-center justify-center w-12 h-12 rounded-lg border-2 font-mono text-sm font-bold transition-colors",
                bgColor,
                borderColor,
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
          L = <span className="font-mono font-bold text-viz-range">{left}</span>
        </span>
        <span>
          R ={" "}
          <span className="font-mono font-bold text-viz-range">{right}</span>
        </span>
        {mid !== null && (
          <span>
            M = <span className="font-mono font-bold text-viz-mid">{mid}</span>
          </span>
        )}
      </div>

      {/* Step description */}
      <div className="text-center text-sm p-3 bg-muted rounded-lg max-w-md">
        {type !== "initial" && type !== "notFound" && type !== "found" && (
          <span>
            {t(
              `algorithms.binary-search.steps.${type}`,
              step.descriptionParams,
            )}
          </span>
        )}
        {(type === "initial" || type === "notFound" || type === "found") && (
          <span>
            {t(
              `algorithms.binary-search.steps.${type}`,
              step.descriptionParams,
            )}
          </span>
        )}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-3 text-xs">
        <div className="flex items-center gap-1">
          <div className="size-3 rounded bg-viz-range" />
          <span className="text-muted-foreground">{tv("range")}</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="size-3 rounded bg-viz-mid" />
          <span className="text-muted-foreground">{tv("mid")}</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="size-3 rounded bg-viz-found" />
          <span className="text-muted-foreground">{tv("found")}</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="size-3 rounded bg-muted" />
          <span className="text-muted-foreground">{tv("eliminated")}</span>
        </div>
      </div>
    </div>
  );
}
