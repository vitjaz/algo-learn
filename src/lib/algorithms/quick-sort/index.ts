import type { AlgorithmMeta } from "@/types/algorithm";
import type { ExtendedContentConfig } from "@/types/extended-content";
import { generateQuickSortSteps } from "./steps";

export const meta: AlgorithmMeta = {
  slug: "quick-sort",
  category: "sorting",
  difficulty: "medium",
  complexity: {
    best: "O(nlogn)",
    average: "O(nlogn)",
    worst: "O(n²)",
    space: "O(logn)",
  },
  leetcodeTasks: [
    {
      number: 912,
      title: "Sort an Array",
      difficulty: "medium",
      url: "https://leetcode.com/problems/sort-an-array/",
    },
    {
      number: 215,
      title: "Kth Largest Element in an Array",
      difficulty: "medium",
      url: "https://leetcode.com/problems/kth-largest-element-in-an-array/",
    },
    {
      number: 973,
      title: "K Closest Points to Origin",
      difficulty: "medium",
      url: "https://leetcode.com/problems/k-closest-points-to-origin/",
    },
    {
      number: 347,
      title: "Top K Frequent Elements",
      difficulty: "medium",
      url: "https://leetcode.com/problems/top-k-frequent-elements/",
    },
  ],
  codeExamples: {
    typescript: `function quickSort(arr: number[], low = 0, high = arr.length - 1): void {
  if (low < high) {
    const pivotIndex = partition(arr, low, high);
    quickSort(arr, low, pivotIndex - 1);
    quickSort(arr, pivotIndex + 1, high);
  }
}

function partition(arr: number[], low: number, high: number): number {
  const pivot = arr[high];
  let i = low - 1;

  for (let j = low; j < high; j++) {
    if (arr[j] <= pivot) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }

  // Place pivot in its final position
  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
  return i + 1;
}

// Usage example
const unsorted = [38, 27, 43, 3, 9, 82, 10];
const sorted = [...unsorted]; // Copy to avoid mutating original
quickSort(sorted);
console.log(sorted); // [3, 9, 10, 27, 38, 43, 82]`,
    python: `def quick_sort(arr: list[int], low: int = 0, high: int | None = None) -> None:
    if high is None:
        high = len(arr) - 1

    if low < high:
        pivot_index = partition(arr, low, high)
        quick_sort(arr, low, pivot_index - 1)
        quick_sort(arr, pivot_index + 1, high)


def partition(arr: list[int], low: int, high: int) -> int:
    pivot = arr[high]
    i = low - 1

    for j in range(low, high):
        if arr[j] <= pivot:
            i += 1
            arr[i], arr[j] = arr[j], arr[i]

    # Place pivot in its final position
    arr[i + 1], arr[high] = arr[high], arr[i + 1]
    return i + 1


# Usage example
unsorted = [38, 27, 43, 3, 9, 82, 10]
sorted_arr = unsorted.copy()  # Copy to avoid mutating original
quick_sort(sorted_arr)
print(sorted_arr)  # [3, 9, 10, 27, 38, 43, 82]`,
  },
};

export const generateSteps = generateQuickSortSteps;

export const defaultInput = {
  array: [38, 27, 43, 3, 9, 82, 10],
};

export const extendedContent: ExtendedContentConfig = {
  steps: {
    id: "how-it-works",
    tocLabelKey: "howItWorks",
    i18nBase: "algorithms.quick-sort.howItWorks",
    introKey: "intro",
    callout: {
      titleKey: "example",
      descriptionKeys: ["exampleStep1", "exampleStep2"],
      mono: true,
    },
    items: [
      { titleKey: "step1Title", descriptionKey: "step1" },
      { titleKey: "step2Title", descriptionKey: "step2" },
      {
        titleKey: "step3Title",
        descriptionKey: "step3",
        subItemKeys: ["step3a", "step3b"],
      },
      { titleKey: "step4Title", descriptionKey: "step4" },
    ],
  },
  analysis: {
    id: "complexity-analysis",
    tocLabelKey: "complexityAnalysis",
    i18nBase: "algorithms.quick-sort.complexityAnalysis",
    items: [
      {
        titleKey: "timeTitle",
        descriptionKeys: ["timeBest", "timeAverage", "timeWorst"],
        icon: "zap",
      },
      {
        titleKey: "spaceTitle",
        descriptionKeys: ["spaceInPlace", "spaceNotStable"],
        icon: "database",
      },
    ],
    callout: {
      titleKey: "pivotTitle",
      descriptionKeys: ["pivotStrategy"],
    },
  },
  applications: {
    id: "applications",
    tocLabelKey: "applications",
    i18nBase: "algorithms.quick-sort.applications",
    items: [
      { titleKey: "app1Title", descriptionKey: "app1", icon: "code" },
      { titleKey: "app2Title", descriptionKey: "app2", icon: "database" },
      { titleKey: "app3Title", descriptionKey: "app3", icon: "search" },
      { titleKey: "app4Title", descriptionKey: "app4", icon: "target" },
      { titleKey: "app5Title", descriptionKey: "app5", icon: "lightbulb" },
    ],
  },
};
