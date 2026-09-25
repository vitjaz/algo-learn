"use client";

import { useTranslations } from "next-intl";
import type { BSTNode, BSTStep } from "@/types/algorithm";
import { motion } from "framer-motion";

interface BSTVisualProps {
  step: BSTStep;
}

interface LayoutNode {
  x: number;
  y: number;
  node: BSTNode;
}

function computeLayout(
  root: BSTNode | null,
  width: number,
  _height: number,
  nodeRadius: number,
): LayoutNode[] {
  const nodes: LayoutNode[] = [];
  if (!root) return nodes;

  const levelHeight = 70;
  const availableWidth = width - nodeRadius * 4;

  function traverse(node: BSTNode, depth: number, left: number, right: number) {
    const x = (left + right) / 2;
    const y = depth * levelHeight + nodeRadius + 20;
    nodes.push({ x, y, node });
    if (node.left) traverse(node.left, depth + 1, left, x);
    if (node.right) traverse(node.right, depth + 1, x, right);
  }

  traverse(root, 0, nodeRadius * 2, availableWidth + nodeRadius * 2);
  return nodes;
}

function getEdges(nodes: LayoutNode[]): { from: LayoutNode; to: LayoutNode }[] {
  const map = new Map<number, LayoutNode>();
  for (const n of nodes) map.set(n.node.id, n);
  const edges: { from: LayoutNode; to: LayoutNode }[] = [];
  for (const n of nodes) {
    if (n.node.left) {
      const to = map.get(n.node.left.id);
      if (to) edges.push({ from: n, to });
    }
    if (n.node.right) {
      const to = map.get(n.node.right.id);
      if (to) edges.push({ from: n, to });
    }
  }
  return edges;
}

const VIZ_COLORS = {
  default: {
    fill: "oklch(0.55 0.18 255)",
    stroke: "oklch(0.55 0.18 255)",
    text: "oklch(0.98 0 0)",
  },
  mid: {
    fill: "oklch(0.75 0.16 85)",
    stroke: "oklch(0.75 0.16 85)",
    text: "oklch(0.2 0.04 85)",
  },
  range: {
    fill: "oklch(0.55 0.2 300)",
    stroke: "oklch(0.55 0.2 300)",
    text: "oklch(0.98 0 0)",
  },
  found: {
    fill: "oklch(0.65 0.17 155)",
    stroke: "oklch(0.65 0.17 155)",
    text: "oklch(0.98 0 0)",
  },
};

export function BSTVisual({ step }: BSTVisualProps) {
  const t = useTranslations();
  const tv = useTranslations("algorithm.visualization.legend");
  const { tree, currentNodeId, type } = step;

  const width = 640;
  const height = 320;
  const nodeRadius = 22;

  const nodes = tree ? computeLayout(tree, width, height, nodeRadius) : [];
  const edges = getEdges(nodes);

  const isSearchPhase = type.startsWith("search") || type === "inserted";

  function getNodeColors(n: LayoutNode) {
    const isCurrent = n.node.id === currentNodeId;
    const isParent = n.node.id === step.parentNodeId;
    const isFound = type === "searchFound" && isCurrent;

    if (isFound) return VIZ_COLORS.found;
    if (isCurrent) return VIZ_COLORS.mid;
    if (isParent) return VIZ_COLORS.range;
    return VIZ_COLORS.default;
  }

  return (
    <div className="flex flex-col items-center gap-6 p-4">
      {/* Target display */}
      <div className="text-center">
        <div className="text-sm text-muted-foreground">
          {isSearchPhase
            ? t("algorithms.bst.steps.searchTarget", {
                value: step.targetValue,
              })
            : t("algorithms.bst.steps.insertTitle")}
        </div>
        <div className="text-3xl font-bold text-primary mt-1">
          {isSearchPhase ? step.targetValue : ""}
        </div>
      </div>

      {/* SVG Tree visualization */}
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full max-w-xl rounded-lg bg-muted/30"
        style={{ height: `${height}px` }}
      >
        {/* Edges */}
        {edges.map((edge, i) => (
          <motion.line
            key={`edge-${i}`}
            x1={edge.from.x}
            y1={edge.from.y}
            x2={edge.to.x}
            y2={edge.to.y}
            stroke="var(--foreground)"
            strokeOpacity={0.45}
            strokeWidth={2}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: i * 0.05 }}
          />
        ))}

        {/* Nodes */}
        {nodes.length === 0 && (
          <text
            x={width / 2}
            y={height / 2}
            textAnchor="middle"
            dominantBaseline="central"
            className="fill-muted-foreground text-sm"
          >
            {t("algorithms.bst.steps.emptyTree")}
          </text>
        )}
        {nodes.map((n) => {
          const colors = getNodeColors(n);
          return (
            <g key={n.node.id}>
              <motion.circle
                cx={n.x}
                cy={n.y}
                r={nodeRadius}
                fill={colors.fill}
                stroke={colors.stroke}
                strokeWidth={2}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              />
              <text
                x={n.x}
                y={n.y}
                textAnchor="middle"
                dominantBaseline="central"
                fill={colors.text}
                className="text-xs font-bold"
              >
                {n.node.value}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Step description */}
      <div className="text-center text-sm p-3 bg-muted rounded-lg max-w-md">
        <span>{t(`algorithms.bst.steps.${type}`, step.descriptionParams)}</span>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs">
        <div className="flex items-center gap-1">
          <div
            className="size-3 rounded-full"
            style={{ backgroundColor: VIZ_COLORS.default.fill }}
          />
          <span className="text-muted-foreground">{tv("default")}</span>
        </div>
        <div className="flex items-center gap-1">
          <div
            className="size-3 rounded-full"
            style={{ backgroundColor: VIZ_COLORS.mid.fill }}
          />
          <span className="text-muted-foreground">{tv("current")}</span>
        </div>
        <div className="flex items-center gap-1">
          <div
            className="size-3 rounded-full"
            style={{ backgroundColor: VIZ_COLORS.range.fill }}
          />
          <span className="text-muted-foreground">{tv("parent")}</span>
        </div>
        <div className="flex items-center gap-1">
          <div
            className="size-3 rounded-full"
            style={{ backgroundColor: VIZ_COLORS.found.fill }}
          />
          <span className="text-muted-foreground">{tv("found")}</span>
        </div>
      </div>
    </div>
  );
}
