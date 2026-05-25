import type { InsertionSortStep } from "@/types/algorithm";

/**
 * Generates all steps of insertion sort algorithm for visualization.
 * @param inputArray - array of numbers to sort
 * @returns array of steps representing the algorithm execution
 */
export function generateInsertionSortSteps(
  inputArray: number[],
): InsertionSortStep[] {
  const steps: InsertionSortStep[] = [];
  const array = [...inputArray];
  const sortedIndices: number[] = [];

  // Initial state
  steps.push({
    type: "initial",
    array: [...array],
    keyIndex: null,
    comparing: null,
    shifting: null,
    inserting: null,
    sortedIndices: [...sortedIndices],
    descriptionKey: "algorithms.insertion-sort.steps.initial",
    descriptionParams: {},
  });

  // First element is considered sorted
  sortedIndices.push(0);

  for (let i = 1; i < array.length; i++) {
    const key = array[i];

    // Pick key step
    steps.push({
      type: "pickKey",
      array: [...array],
      keyIndex: i,
      comparing: null,
      shifting: null,
      inserting: null,
      sortedIndices: [...sortedIndices],
      descriptionKey: "algorithms.insertion-sort.steps.pickKey",
      descriptionParams: { value: key, index: i },
    });

    let j = i - 1;

    // Compare and shift
    while (j >= 0) {
      // Compare step
      steps.push({
        type: "compare",
        array: [...array],
        keyIndex: i,
        comparing: j,
        shifting: null,
        inserting: null,
        sortedIndices: [...sortedIndices],
        descriptionKey: "algorithms.insertion-sort.steps.compare",
        descriptionParams: { key, compared: array[j], indexJ: j },
      });

      if (array[j] > key) {
        // Shift step
        array[j + 1] = array[j];

        steps.push({
          type: "shift",
          array: [...array],
          keyIndex: i,
          comparing: null,
          shifting: j,
          inserting: null,
          sortedIndices: [...sortedIndices],
          descriptionKey: "algorithms.insertion-sort.steps.shift",
          descriptionParams: { value: array[j], from: j, to: j + 1 },
        });

        j--;
      } else {
        // Element is in correct position
        break;
      }
    }

    // Insert key
    array[j + 1] = key;

    steps.push({
      type: "insert",
      array: [...array],
      keyIndex: null,
      comparing: null,
      shifting: null,
      inserting: j + 1,
      sortedIndices: [...sortedIndices],
      descriptionKey: "algorithms.insertion-sort.steps.insert",
      descriptionParams: { value: key, position: j + 1 },
    });

    // Update sorted indices
    sortedIndices.length = 0;
    for (let k = 0; k <= i; k++) {
      sortedIndices.push(k);
    }
  }

  // Final sorted state
  steps.push({
    type: "sorted",
    array: [...array],
    keyIndex: null,
    comparing: null,
    shifting: null,
    inserting: null,
    sortedIndices: array.map((_, i) => i),
    descriptionKey: "algorithms.insertion-sort.steps.sorted",
    descriptionParams: {},
  });

  return steps;
}
