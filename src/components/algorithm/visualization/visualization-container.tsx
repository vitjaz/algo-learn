"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import type { BinarySearchStep, BubbleSortStep } from "@/types/algorithm";
import { VisualizationControls, getSpeedMs, type Speed } from "./visualization-controls";
import { BinarySearchVisual } from "./binary-search-visual";
import { BubbleSortVisual } from "./bubble-sort-visual";

interface VisualizationContainerProps {
  steps: BinarySearchStep[] | BubbleSortStep[];
  algorithmSlug: string;
}

export function VisualizationContainer({
  steps,
  algorithmSlug,
}: VisualizationContainerProps) {
  const t = useTranslations("algorithm.visualization");
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState<Speed>("normal");
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const step = steps[currentStep];

  const clearPlayback = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const handlePlay = useCallback(() => {
    setIsPlaying(true);
  }, []);

  const handlePause = useCallback(() => {
    setIsPlaying(false);
    clearPlayback();
  }, [clearPlayback]);

  const handleStepForward = useCallback(() => {
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  }, [steps.length]);

  const handleStepBack = useCallback(() => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  }, []);

  const handleReset = useCallback(() => {
    setIsPlaying(false);
    clearPlayback();
    setCurrentStep(0);
  }, [clearPlayback]);

  const handleSpeedChange = useCallback((newSpeed: Speed) => {
    setSpeed(newSpeed);
  }, []);

  // Auto-advance when playing
  useEffect(() => {
    if (isPlaying) {
      clearPlayback();
      intervalRef.current = setInterval(() => {
        setCurrentStep((prev) => {
          if (prev >= steps.length - 1) {
            setIsPlaying(false);
            clearPlayback();
            return prev;
          }
          return prev + 1;
        });
      }, getSpeedMs(speed));
    } else {
      clearPlayback();
    }

    return clearPlayback;
  }, [isPlaying, speed, steps.length, clearPlayback]);

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">{t("title")}</h3>
      <div className="bg-card rounded-xl border border-border overflow-hidden">
        {algorithmSlug === "binary-search" ? (
          <BinarySearchVisual step={step as BinarySearchStep} />
        ) : (
          <BubbleSortVisual step={step as BubbleSortStep} />
        )}
      </div>
      <VisualizationControls
        isPlaying={isPlaying}
        currentStep={currentStep}
        totalSteps={steps.length}
        speed={speed}
        onPlay={handlePlay}
        onPause={handlePause}
        onStepForward={handleStepForward}
        onStepBack={handleStepBack}
        onReset={handleReset}
        onSpeedChange={handleSpeedChange}
      />
    </div>
  );
}
