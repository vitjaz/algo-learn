import type { BubbleSortStep } from "@/types/algorithm";

/**
 * Generates all steps of bubble sort algorithm for visualization.
 * @param inputArray - array of numbers to sort
 * @returns array of steps representing the algorithm execution
 */
export function generateBubbleSortSteps(
  inputArray: number[],
): BubbleSortStep[] {
  const steps: BubbleSortStep[] = [];
  const array = [...inputArray];
  const n = array.length;

  // Initial state
  steps.push({
    type: "initial",
    array: [...array],
    comparing: null,
    swapped: false,
    sortedFrom: n,
    currentPass: 0,
    descriptionKey: "algorithms.bubble-sort.steps.initial",
    descriptionParams: {},
  });

  for (let i = 0; i < n - 1; i++) {
    let swapped = false;

    for (let j = 0; j < n - i - 1; j++) {
      // Compare step
      steps.push({
        type: "compare",
        array: [...array],
        comparing: [j, j + 1],
        swapped: false,
        sortedFrom: n - i,
        currentPass: i + 1,
        descriptionKey: "algorithms.bubble-sort.steps.compare",
        descriptionParams: {
          i: j,
          j: j + 1,
          valI: array[j],
          valJ: array[j + 1],
        },
      });

      if (array[j] > array[j + 1]) {
        // Swap
        const temp = array[j];
        array[j] = array[j + 1];
        array[j + 1] = temp;
        swapped = true;

        steps.push({
          type: "swap",
          array: [...array],
          comparing: [j, j + 1],
          swapped: true,
          sortedFrom: n - i,
          currentPass: i + 1,
          descriptionKey: "algorithms.bubble-sort.steps.swap",
          descriptionParams: { valI: temp, valJ: array[j] },
        });
      } else {
        // No swap
        steps.push({
          type: "noSwap",
          array: [...array],
          comparing: [j, j + 1],
          swapped: false,
          sortedFrom: n - i,
          currentPass: i + 1,
          descriptionKey: "algorithms.bubble-sort.steps.noSwap",
          descriptionParams: { valI: array[j], valJ: array[j + 1] },
        });
      }
    }

    // Pass complete
    steps.push({
      type: "passComplete",
      array: [...array],
      comparing: null,
      swapped,
      sortedFrom: n - i - 1,
      currentPass: i + 1,
      descriptionKey: "algorithms.bubble-sort.steps.passComplete",
      descriptionParams: { pass: i + 1 },
    });

    // If no swaps occurred, array is sorted
    if (!swapped) {
      break;
    }
  }

  // Sorted
  steps.push({
    type: "sorted",
    array: [...array],
    comparing: null,
    swapped: false,
    sortedFrom: 0,
    currentPass: 0,
    descriptionKey: "algorithms.bubble-sort.steps.sorted",
    descriptionParams: {},
  });

  return steps;
}
