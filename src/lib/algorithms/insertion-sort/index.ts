import type { AlgorithmMeta } from "@/types/algorithm";
import type { ExtendedContentConfig } from "@/types/extended-content";
import { generateInsertionSortSteps } from "./steps";

export const meta: AlgorithmMeta = {
  slug: "insertion-sort",
  category: "sorting",
  difficulty: "easy",
  complexity: {
    best: "O(n)",
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
      number: 147,
      title: "Insertion Sort List",
      difficulty: "medium",
      url: "https://leetcode.com/problems/insertion-sort-list/",
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
  ],
  codeExamples: {
    typescript: `function insertionSort(arr: number[]): void {
  for (let i = 1; i < arr.length; i++) {
    const key = arr[i];
    let j = i - 1;

    // Move elements greater than key one position ahead
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j--;
    }

    // Insert key at correct position
    arr[j + 1] = key;
  }
}

// Usage example
const unsorted = [12, 11, 13, 5, 6];
const sorted = [...unsorted]; // Copy to avoid mutating original
insertionSort(sorted);
console.log(sorted); // [5, 6, 11, 12, 13]`,
    python: `def insertion_sort(arr: list[int]) -> None:
    for i in range(1, len(arr)):
        key = arr[i]
        j = i - 1

        # Move elements greater than key one position ahead
        while j >= 0 and arr[j] > key:
            arr[j + 1] = arr[j]
            j -= 1

        # Insert key at correct position
        arr[j + 1] = key


# Usage example
unsorted = [12, 11, 13, 5, 6]
sorted_arr = unsorted.copy()  # Copy to avoid mutating original
insertion_sort(sorted_arr)
print(sorted_arr)  # [5, 6, 11, 12, 13]`,
  },
};

export const generateSteps = generateInsertionSortSteps;

export const defaultInput = {
  array: [12, 11, 13, 5, 6],
};

export const extendedContent: ExtendedContentConfig = {
  steps: {
    id: "how-it-works",
    tocLabelKey: "howItWorks",
    i18nBase: "algorithms.insertion-sort.howItWorks",
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
    i18nBase: "algorithms.insertion-sort.complexityAnalysis",
    items: [
      {
        titleKey: "timeTitle",
        descriptionKeys: ["timeBest", "timeAverage", "timeWorst"],
        icon: "zap",
      },
      {
        titleKey: "spaceTitle",
        descriptionKeys: ["spaceInPlace", "spaceStable"],
        icon: "database",
      },
    ],
    callout: {
      titleKey: "adaptiveTitle",
      descriptionKeys: ["adaptive"],
    },
  },
  applications: {
    id: "applications",
    tocLabelKey: "applications",
    i18nBase: "algorithms.insertion-sort.applications",
    items: [
      { titleKey: "app1Title", descriptionKey: "app1", icon: "code" },
      { titleKey: "app2Title", descriptionKey: "app2", icon: "database" },
      { titleKey: "app3Title", descriptionKey: "app3", icon: "target" },
      { titleKey: "app4Title", descriptionKey: "app4", icon: "search" },
      { titleKey: "app5Title", descriptionKey: "app5", icon: "lightbulb" },
    ],
  },
};
