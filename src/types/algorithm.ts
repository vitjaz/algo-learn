export type CategoryId = "search" | "sorting";

export interface Category {
  id: CategoryId;
  slug: string;
  algorithms: string[];
}

export interface Complexity {
  best: string;
  average: string;
  worst: string;
  space: string;
}

export interface LeetCodeTask {
  number: number;
  title: string;
  difficulty: "easy" | "medium" | "hard";
  url: string;
}

export interface AlgorithmMeta {
  slug: string;
  category: CategoryId;
  complexity: Complexity;
  leetcodeTasks: LeetCodeTask[];
  codeExamples: {
    typescript: string;
    python: string;
  };
}

// --- Visualization Step Types ---

export type BinarySearchStepType =
  | "initial"
  | "compare"
  | "found"
  | "goRight"
  | "goLeft"
  | "notFound";

export interface BinarySearchStep {
  type: BinarySearchStepType;
  array: number[];
  target: number;
  left: number;
  right: number;
  mid: number | null;
  found: boolean;
  descriptionKey: string;
  descriptionParams: Record<string, string | number>;
}

export type BubbleSortStepType =
  | "initial"
  | "compare"
  | "swap"
  | "noSwap"
  | "passComplete"
  | "sorted";

export interface BubbleSortStep {
  type: BubbleSortStepType;
  array: number[];
  comparing: [number, number] | null;
  swapped: boolean;
  sortedFrom: number;
  currentPass: number;
  descriptionKey: string;
  descriptionParams: Record<string, string | number>;
}

export type QuickSortStepType =
  | "initial"
  | "selectPivot"
  | "compare"
  | "swap"
  | "noSwap"
  | "noSwapGreater"
  | "pivotPlaced"
  | "sorted";

export interface QuickSortStep {
  type: QuickSortStepType;
  array: number[];
  range: [number, number];
  pivotIndex: number;
  comparing: number | null;
  swapping: [number, number] | null;
  sortedIndices: number[];
  descriptionKey: string;
  descriptionParams: Record<string, string | number>;
}

export type MergeSortStepType =
  | "initial"
  | "split"
  | "compare"
  | "place"
  | "mergeComplete"
  | "sorted";

export interface MergeSortStep {
  type: MergeSortStepType;
  array: number[];
  range: [number, number];
  leftRange: [number, number] | null;
  rightRange: [number, number] | null;
  leftIndex: number | null;
  rightIndex: number | null;
  placing: number | null;
  sortedIndices: number[];
  descriptionKey: string;
  descriptionParams: Record<string, string | number>;
}
