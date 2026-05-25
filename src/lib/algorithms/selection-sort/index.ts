import type { AlgorithmMeta } from "@/types/algorithm";
import type { ExtendedContentConfig } from "@/types/extended-content";
import { generateSelectionSortSteps } from "./steps";

export const meta: AlgorithmMeta = {
  slug: "selection-sort",
  category: "sorting",
  difficulty: "easy",
  complexity: {
    best: "O(n²)",
    average: "O(n²)",
    worst: "O(n²)",
    space: "O(1)",
  },
  leetcodeTasks: [
    {
      number: 912,
      title: "Sort an Array",
      difficulty: "medium",
      url: "https://leetcode.com/problems/sort-an-array/",
    },
    {
      number: 75,
      title: "Sort Colors",
      difficulty: "medium",
      url: "https://leetcode.com/problems/sort-colors/",
    },
    {
      number: 88,
      title: "Merge Sorted Array",
      difficulty: "easy",
      url: "https://leetcode.com/problems/merge-sorted-array/",
    },
    {
      number: 147,
      title: "Insertion Sort List",
      difficulty: "medium",
      url: "https://leetcode.com/problems/insertion-sort-list/",
    },
  ],
  codeExamples: {
    typescript: `function selectionSort(arr: number[]): void {
  const n = arr.length;

  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;

    // Find the minimum element in unsorted portion
    for (let j = i + 1; j < n; j++) {
      if (arr[j] < arr[minIdx]) {
        minIdx = j;
      }
    }

    // Swap minimum with current position
    if (minIdx !== i) {
      [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
    }
  }
}

// Usage example
const unsorted = [64, 25, 12, 22, 11];
const sorted = [...unsorted]; // Copy to avoid mutating original
selectionSort(sorted);
console.log(sorted); // [11, 12, 22, 25, 64]`,
    python: `def selection_sort(arr: list[int]) -> None:
    n = len(arr)

    for i in range(n - 1):
        min_idx = i

        # Find the minimum element in unsorted portion
        for j in range(i + 1, n):
            if arr[j] < arr[min_idx]:
                min_idx = j

        # Swap minimum with current position
        if min_idx != i:
            arr[i], arr[min_idx] = arr[min_idx], arr[i]


# Usage example
unsorted = [64, 25, 12, 22, 11]
sorted_arr = unsorted.copy()  # Copy to avoid mutating original
selection_sort(sorted_arr)
print(sorted_arr)  # [11, 12, 22, 25, 64]`,
  },
};

export const generateSteps = generateSelectionSortSteps;

export const defaultInput = {
  array: [64, 25, 12, 22, 11],
};

export const extendedContent: ExtendedContentConfig = {
  steps: {
    id: "how-it-works",
    tocLabelKey: "howItWorks",
    i18nBase: "algorithms.selection-sort.howItWorks",
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
    i18nBase: "algorithms.selection-sort.complexityAnalysis",
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
      titleKey: "comparisonTitle",
      descriptionKeys: ["comparison"],
    },
  },
  applications: {
    id: "applications",
    tocLabelKey: "applications",
    i18nBase: "algorithms.selection-sort.applications",
    items: [
      { titleKey: "app1Title", descriptionKey: "app1", icon: "code" },
      { titleKey: "app2Title", descriptionKey: "app2", icon: "database" },
      { titleKey: "app3Title", descriptionKey: "app3", icon: "target" },
      { titleKey: "app4Title", descriptionKey: "app4", icon: "search" },
      { titleKey: "app5Title", descriptionKey: "app5", icon: "lightbulb" },
    ],
  },
};
