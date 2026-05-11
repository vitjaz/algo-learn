"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Play, Pause, SkipForward, SkipBack, RotateCcw } from "lucide-react";

export type Speed = "slow" | "normal" | "fast";

interface VisualizationControlsProps {
  isPlaying: boolean;
  currentStep: number;
  totalSteps: number;
  speed: Speed;
  onPlay: () => void;
  onPause: () => void;
  onStepForward: () => void;
  onStepBack: () => void;
  onReset: () => void;
  onSpeedChange: (speed: Speed) => void;
}

export function VisualizationControls({
  isPlaying,
  currentStep,
  totalSteps,
  speed,
  onPlay,
  onPause,
  onStepBack,
  onStepForward,
  onReset,
  onSpeedChange,
}: VisualizationControlsProps) {
  const t = useTranslations("algorithm.visualization");

  return (
    <div className="flex flex-col gap-4 p-4 bg-muted/30 rounded-lg">
      {/* Step counter */}
      <div className="text-sm text-muted-foreground text-center font-medium">
        {t("step")} {currentStep + 1} {t("of")} {totalSteps}
      </div>

      {/* Playback controls */}
      <div className="flex items-center justify-center gap-2">
        <Button
          variant="outline"
          size="icon"
          onClick={onReset}
          aria-label={t("reset")}
          title={t("reset")}
        >
          <RotateCcw className="size-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={onStepBack}
          disabled={currentStep === 0 || isPlaying}
          aria-label={t("stepBack")}
          title={t("stepBack")}
        >
          <SkipBack className="size-4" />
        </Button>
        {isPlaying ? (
          <Button
            variant="default"
            size="icon"
            onClick={onPause}
            aria-label={t("pause")}
            title={t("pause")}
          >
            <Pause className="size-4" />
          </Button>
        ) : (
          <Button
            variant="default"
            size="icon"
            onClick={onPlay}
            disabled={currentStep >= totalSteps - 1}
            aria-label={t("play")}
            title={t("play")}
          >
            <Play className="size-4" />
          </Button>
        )}
        <Button
          variant="outline"
          size="icon"
          onClick={onStepForward}
          disabled={currentStep >= totalSteps - 1 || isPlaying}
          aria-label={t("stepForward")}
          title={t("stepForward")}
        >
          <SkipForward className="size-4" />
        </Button>
      </div>

      {/* Speed controls */}
      <div className="flex items-center justify-center gap-2">
        <span className="text-xs text-muted-foreground">{t("speed")}:</span>
        <ToggleGroup
          variant="outline"
          size="sm"
          value={[speed]}
          onValueChange={(value: string[]) => {
            if (value.length > 0) onSpeedChange(value[0] as Speed);
          }}
        >
          {(["slow", "normal", "fast"] as Speed[]).map((s) => (
            <ToggleGroupItem key={s} value={s}>
              {t(
                `speed${s.charAt(0).toUpperCase() + s.slice(1)}` as
                  | "speedSlow"
                  | "speedNormal"
                  | "speedFast",
              )}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </div>
    </div>
  );
}

export function getSpeedMs(speed: Speed): number {
  const speedMs: Record<Speed, number> = {
    slow: 1500,
    normal: 800,
    fast: 300,
  };
  return speedMs[speed];
}
