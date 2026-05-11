import type { BinarySearchStep } from "@/types/algorithm";

/**
 * Generates all steps of binary search algorithm for visualization.
 * @param array - sorted array of numbers
 * @param target - value to search for
 * @returns array of steps representing the algorithm execution
 */
export function generateBinarySearchSteps(
  array: number[],
  target: number
): BinarySearchStep[] {
  const steps: BinarySearchStep[] = [];
  let left = 0;
  let right = array.length - 1;

  // Initial state
  steps.push({
    type: "initial",
    array: [...array],
    target,
    left,
    right,
    mid: null,
    found: false,
    descriptionKey: "algorithms.binary-search.steps.initial",
    descriptionParams: { target },
  });

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    const midValue = array[mid];

    // Compare step
    steps.push({
      type: "compare",
      array: [...array],
      target,
      left,
      right,
      mid,
      found: false,
      descriptionKey: "algorithms.binary-search.steps.compare",
      descriptionParams: { mid, value: midValue, target },
    });

    if (midValue === target) {
      // Found!
      steps.push({
        type: "found",
        array: [...array],
        target,
        left,
        right,
        mid,
        found: true,
        descriptionKey: "algorithms.binary-search.steps.found",
        descriptionParams: { mid, value: midValue, target },
      });
      return steps;
    } else if (midValue < target) {
      // Go right
      steps.push({
        type: "goRight",
        array: [...array],
        target,
        left,
        right,
        mid,
        found: false,
        descriptionKey: "algorithms.binary-search.steps.goRight",
        descriptionParams: { mid, value: midValue, target },
      });
      left = mid + 1;
    } else {
      // Go left
      steps.push({
        type: "goLeft",
        array: [...array],
        target,
        left,
        right,
        mid,
        found: false,
        descriptionKey: "algorithms.binary-search.steps.goLeft",
        descriptionParams: { mid, value: midValue, target },
      });
      right = mid - 1;
    }
  }

  // Not found
  steps.push({
    type: "notFound",
    array: [...array],
    target,
    left,
    right,
    mid: null,
    found: false,
    descriptionKey: "algorithms.binary-search.steps.notFound",
    descriptionParams: { target },
  });

  return steps;
}
