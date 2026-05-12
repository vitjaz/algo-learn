import type { AlgorithmMeta } from "@/types/algorithm";
import { generateBubbleSortSteps } from "./steps";

export const meta: AlgorithmMeta = {
  slug: "bubble-sort",
  category: "sorting",
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
      number: 75,
      title: "Sort Colors",
      difficulty: "medium",
      url: "https://leetcode.com/problems/sort-colors/",
    },
    {
      number: 26,
      title: "Remove Duplicates from Sorted Array",
      difficulty: "easy",
      url: "https://leetcode.com/problems/remove-duplicates-from-sorted-array/",
    },
    {
      number: 88,
      title: "Merge Sorted Array",
      difficulty: "easy",
      url: "https://leetcode.com/problems/merge-sorted-array/",
    },
  ],
  codeExamples: {
    typescript: `function bubbleSort(arr: number[]): void {
  const n = arr.length;

  for (let i = 0; i < n - 1; i++) {
    let swapped = false;

    // Last i elements are already in place
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        // Swap adjacent elements
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        swapped = true;
      }
    }

    // If no swaps occurred, array is sorted
    if (!swapped) break;
  }
}

// Usage example
const unsorted = [64, 34, 25, 12, 22, 11, 90];
const sorted = [...unsorted]; // Copy to avoid mutating original
bubbleSort(sorted);
console.log(sorted); // [11, 12, 22, 25, 34, 64, 90]`,
    python: `def bubble_sort(arr: list[int]) -> None:
    n = len(arr)

    for i in range(n - 1):
        swapped = False

        # Last i elements are already in place
        for j in range(n - i - 1):
            if arr[j] > arr[j + 1]:
                # Swap adjacent elements
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
                swapped = True

        # If no swaps occurred, array is sorted
        if not swapped:
            break

# Usage example
unsorted = [64, 34, 25, 12, 22, 11, 90]
sorted_arr = unsorted.copy()  # Copy to avoid mutating original
bubble_sort(sorted_arr)
print(sorted_arr)  # [11, 12, 22, 25, 34, 64, 90]`,
  },
};

export const generateSteps = generateBubbleSortSteps;

export const defaultInput = {
  array: [64, 34, 25, 12, 22, 11, 90],
};
