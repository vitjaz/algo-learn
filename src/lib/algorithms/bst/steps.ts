import type { BSTNode, BSTStep } from "@/types/algorithm";

let nextId = 1;

function createNode(value: number, parentId: number | null = null): BSTNode {
  return { id: nextId++, value, left: null, right: null, parentId };
}

function cloneNode(node: BSTNode | null): BSTNode | null {
  if (!node) return null;
  return {
    id: node.id,
    value: node.value,
    left: cloneNode(node.left),
    right: cloneNode(node.right),
    parentId: node.parentId,
  };
}

/**
 * Generates all steps of BST construction (insertion) and search for visualization.
 * @param insertValues - values to insert into the tree
 * @param searchValue - value to search for in the tree
 * @returns array of steps representing the algorithm execution
 */
export function generateBSTSteps(
  insertValues: number[],
  searchValue: number,
): BSTStep[] {
  const steps: BSTStep[] = [];
  nextId = 1;

  // Initial state
  steps.push({
    type: "initial",
    tree: null,
    currentNodeId: null,
    targetValue: searchValue,
    parentNodeId: null,
    descriptionKey: "algorithms.bst.steps.initial",
    descriptionParams: { values: insertValues.join(", ") },
  });

  let root: BSTNode | null = null;

  // Insert all values
  for (const value of insertValues) {
    if (!root) {
      root = createNode(value);
      steps.push({
        type: "inserted",
        tree: cloneNode(root),
        currentNodeId: root.id,
        targetValue: searchValue,
        parentNodeId: null,
        descriptionKey: "algorithms.bst.steps.inserted",
        descriptionParams: { value },
      });
      continue;
    }

    steps.push({
      type: "insertStart",
      tree: cloneNode(root),
      currentNodeId: null,
      targetValue: searchValue,
      parentNodeId: null,
      descriptionKey: "algorithms.bst.steps.insertStart",
      descriptionParams: { value },
    });

    let current = root;
    let parent: BSTNode | null = null;

    while (true) {
      parent = current;
      if (value < current.value) {
        steps.push({
          type: "insertCompare",
          tree: cloneNode(root),
          currentNodeId: current.id,
          targetValue: searchValue,
          parentNodeId: parent?.id ?? null,
          descriptionKey: "algorithms.bst.steps.insertCompare",
          descriptionParams: { value, nodeValue: current.value },
        });
        steps.push({
          type: "insertGoLeft",
          tree: cloneNode(root),
          currentNodeId: current.id,
          targetValue: searchValue,
          parentNodeId: parent?.id ?? null,
          descriptionKey: "algorithms.bst.steps.insertGoLeft",
          descriptionParams: { value, nodeValue: current.value },
        });
        if (!current.left) {
          current.left = createNode(value, current.id);
          steps.push({
            type: "inserted",
            tree: cloneNode(root),
            currentNodeId: current.left.id,
            targetValue: searchValue,
            parentNodeId: current.id,
            descriptionKey: "algorithms.bst.steps.inserted",
            descriptionParams: { value },
          });
          break;
        }
        current = current.left;
      } else {
        steps.push({
          type: "insertCompare",
          tree: cloneNode(root),
          currentNodeId: current.id,
          targetValue: searchValue,
          parentNodeId: parent?.id ?? null,
          descriptionKey: "algorithms.bst.steps.insertCompare",
          descriptionParams: { value, nodeValue: current.value },
        });
        steps.push({
          type: "insertGoRight",
          tree: cloneNode(root),
          currentNodeId: current.id,
          targetValue: searchValue,
          parentNodeId: parent?.id ?? null,
          descriptionKey: "algorithms.bst.steps.insertGoRight",
          descriptionParams: { value, nodeValue: current.value },
        });
        if (!current.right) {
          current.right = createNode(value, current.id);
          steps.push({
            type: "inserted",
            tree: cloneNode(root),
            currentNodeId: current.right.id,
            targetValue: searchValue,
            parentNodeId: current.id,
            descriptionKey: "algorithms.bst.steps.inserted",
            descriptionParams: { value },
          });
          break;
        }
        current = current.right;
      }
    }
  }

  // Search phase
  steps.push({
    type: "searchStart",
    tree: cloneNode(root),
    currentNodeId: null,
    targetValue: searchValue,
    parentNodeId: null,
    descriptionKey: "algorithms.bst.steps.searchStart",
    descriptionParams: { value: searchValue },
  });

  let current = root;
  while (current) {
    if (searchValue === current.value) {
      steps.push({
        type: "searchFound",
        tree: cloneNode(root),
        currentNodeId: current.id,
        targetValue: searchValue,
        parentNodeId: current.parentId,
        descriptionKey: "algorithms.bst.steps.searchFound",
        descriptionParams: { value: searchValue, nodeValue: current.value },
      });
      break;
    }

    if (searchValue < current.value) {
      steps.push({
        type: "searchCompare",
        tree: cloneNode(root),
        currentNodeId: current.id,
        targetValue: searchValue,
        parentNodeId: current.parentId,
        descriptionKey: "algorithms.bst.steps.searchCompare",
        descriptionParams: { value: searchValue, nodeValue: current.value },
      });
      steps.push({
        type: "searchGoLeft",
        tree: cloneNode(root),
        currentNodeId: current.id,
        targetValue: searchValue,
        parentNodeId: current.parentId,
        descriptionKey: "algorithms.bst.steps.searchGoLeft",
        descriptionParams: { value: searchValue, nodeValue: current.value },
      });
      if (!current.left) {
        steps.push({
          type: "searchNotFound",
          tree: cloneNode(root),
          currentNodeId: current.id,
          targetValue: searchValue,
          parentNodeId: current.parentId,
          descriptionKey: "algorithms.bst.steps.searchNotFound",
          descriptionParams: { value: searchValue },
        });
        break;
      }
      current = current.left;
    } else {
      steps.push({
        type: "searchCompare",
        tree: cloneNode(root),
        currentNodeId: current.id,
        targetValue: searchValue,
        parentNodeId: current.parentId,
        descriptionKey: "algorithms.bst.steps.searchCompare",
        descriptionParams: { value: searchValue, nodeValue: current.value },
      });
      steps.push({
        type: "searchGoRight",
        tree: cloneNode(root),
        currentNodeId: current.id,
        targetValue: searchValue,
        parentNodeId: current.parentId,
        descriptionKey: "algorithms.bst.steps.searchGoRight",
        descriptionParams: { value: searchValue, nodeValue: current.value },
      });
      if (!current.right) {
        steps.push({
          type: "searchNotFound",
          tree: cloneNode(root),
          currentNodeId: current.id,
          targetValue: searchValue,
          parentNodeId: current.parentId,
          descriptionKey: "algorithms.bst.steps.searchNotFound",
          descriptionParams: { value: searchValue },
        });
        break;
      }
      current = current.right;
    }
  }

  return steps;
}
