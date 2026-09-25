import type { AlgorithmMeta } from "@/types/algorithm";
import type { ExtendedContentConfig } from "@/types/extended-content";
import { generateBSTSteps } from "./steps";

export const meta: AlgorithmMeta = {
  slug: "bst",
  category: "trees",
  difficulty: "medium",
  complexity: {
    best: "O(log n)",
    average: "O(log n)",
    worst: "O(n)",
    space: "O(n)",
  },
  leetcodeTasks: [
    {
      number: 700,
      title: "Search in a Binary Search Tree",
      difficulty: "easy",
      url: "https://leetcode.com/problems/search-in-a-binary-search-tree/",
    },
    {
      number: 701,
      title: "Insert into a Binary Search Tree",
      difficulty: "medium",
      url: "https://leetcode.com/problems/insert-into-a-binary-search-tree/",
    },
    {
      number: 98,
      title: "Validate Binary Search Tree",
      difficulty: "medium",
      url: "https://leetcode.com/problems/validate-binary-search-tree/",
    },
    {
      number: 450,
      title: "Delete Node in a BST",
      difficulty: "medium",
      url: "https://leetcode.com/problems/delete-node-in-a-bst/",
    },
  ],
  codeExamples: {
    typescript: `class TreeNode {
  value: number;
  left: TreeNode | null = null;
  right: TreeNode | null = null;
  constructor(value: number) {
    this.value = value;
  }
}

class BST {
  root: TreeNode | null = null;

  insert(value: number): void {
    if (!this.root) {
      this.root = new TreeNode(value);
      return;
    }
    let current = this.root;
    while (true) {
      if (value < current.value) {
        if (!current.left) {
          current.left = new TreeNode(value);
          return;
        }
        current = current.left;
      } else {
        if (!current.right) {
          current.right = new TreeNode(value);
          return;
        }
        current = current.right;
      }
    }
  }

  search(value: number): TreeNode | null {
    let current = this.root;
    while (current) {
      if (value === current.value) return current;
      current = value < current.value ? current.left : current.right;
    }
    return null;
  }
}

// Usage example
const bst = new BST();
[50, 30, 70, 20, 40, 60, 80].forEach(v => bst.insert(v));
console.log(bst.search(40)); // TreeNode { value: 40 }`,
    python: `class TreeNode:
    def __init__(self, value: int):
        self.value = value
        self.left = None
        self.right = None

class BST:
    def __init__(self):
        self.root = None

    def insert(self, value: int) -> None:
        if not self.root:
            self.root = TreeNode(value)
            return
        current = self.root
        while True:
            if value < current.value:
                if not current.left:
                    current.left = TreeNode(value)
                    return
                current = current.left
            else:
                if not current.right:
                    current.right = TreeNode(value)
                    return
                current = current.right

    def search(self, value: int) -> TreeNode | None:
        current = self.root
        while current:
            if value == current.value:
                return current
            current = current.left if value < current.value else current.right
        return None

# Usage example
bst = BST()
for v in [50, 30, 70, 20, 40, 60, 80]:
    bst.insert(v)
print(bst.search(40).value)  # 40`,
  },
};

export const generateSteps = generateBSTSteps;

export const defaultInput = {
  insertValues: [50, 30, 70, 20, 40, 60, 80],
  searchValue: 40,
};

export const extendedContent: ExtendedContentConfig = {
  steps: {
    id: "how-it-works",
    tocLabelKey: "howItWorks",
    i18nBase: "algorithms.bst.howItWorks",
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
      { titleKey: "step5Title", descriptionKey: "step5" },
    ],
  },
  analysis: {
    id: "complexity-analysis",
    tocLabelKey: "complexityAnalysis",
    i18nBase: "algorithms.bst.complexityAnalysis",
    items: [
      {
        titleKey: "timeTitle",
        descriptionKeys: ["timeBest", "timeAverage", "timeWorst"],
        icon: "zap",
      },
      {
        titleKey: "spaceTitle",
        descriptionKeys: ["spaceStructure", "spaceHeight"],
        icon: "database",
      },
    ],
    callout: {
      titleKey: "degenerateTitle",
      descriptionKeys: ["degenerate"],
    },
  },
  applications: {
    id: "applications",
    tocLabelKey: "applications",
    i18nBase: "algorithms.bst.applications",
    items: [
      { titleKey: "app1Title", descriptionKey: "app1", icon: "database" },
      { titleKey: "app2Title", descriptionKey: "app2", icon: "search" },
      { titleKey: "app3Title", descriptionKey: "app3", icon: "zap" },
      { titleKey: "app4Title", descriptionKey: "app4", icon: "code" },
      { titleKey: "app5Title", descriptionKey: "app5", icon: "target" },
    ],
  },
};
