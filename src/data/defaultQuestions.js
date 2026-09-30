export const DEFAULT_QUESTION_SETS = [
  {
    set: "Set A",
    description: "Focuses on assignment operators, list reference mutations, and Venn set logic.",
    questions: [
      {
        id: "set_a_q1",
        type: "Finding Error",
        text: "Identify the line number and error in the following Python snippet:",
        code: "Line 1: numbers = [1, 2, 3, 4]\nLine 2: for i in range(len(numbers)):\nLine 3:     if numbers[i] % 2 = 0:\nLine 4:         print(numbers[i])",
        answer: "Line 3: = is an assignment operator, should be == for comparison."
      },
      {
        id: "set_a_q2",
        type: "Numerical Output",
        text: "What is the exact numerical output of the following Python code?",
        code: "x = [10, 20, 30]\ny = x\ny.append(40)\nprint(len(x) * 10 + len(y))",
        answer: "44"
      },
      {
        id: "set_a_q3",
        type: "Logical Reasoning",
        text: "In a group of 30 AI students, 18 know Python, 15 know C++, and 3 know neither. How many students know both Python and C++?",
        code: "",
        answer: "6 (18 + 15 - (30 - 3) = 6)"
      }
    ]
  },
  {
    set: "Set B",
    description: "Evaluates recursion base cases, reference duplication, and exponential decay/growth logic.",
    questions: [
      {
        id: "set_b_q1",
        type: "Finding Error",
        text: "Identify the logic bug in this Python function meant to calculate a factorial:",
        code: "Line 1: def factorial(n):\nLine 2:     if n == 0:\nLine 3:         return 1\nLine 4:     return n * factorial(n)",
        answer: "Line 4: Infinite recursion (Stack Overflow); must pass n - 1."
      },
      {
        id: "set_b_q2",
        type: "Numerical Output",
        text: "What is the exact numerical output of the following Python code?",
        code: "a = [10, 20]\nb = [a, a]\na.append(30)\nprint(len(b[0]) + len(b[1]))",
        answer: "6 (b[0] and b[1] both point to a, which now has 3 items: 3 + 3 = 6)"
      },
      {
        id: "set_b_q3",
        type: "Logical Reasoning",
        text: "A model's training time doubles every 3 hours. If it takes 24 hours to fully train a massive LLM, at how many hours was the model 25% trained?",
        code: "",
        answer: "18 hours (24 hrs = 100%, 21 hrs = 50%, 18 hrs = 25%)"
      }
    ]
  },
  {
    set: "Set C",
    description: "Tests in-place array inversion bugs, sequence multiplication, and O(N^2) complexity scaling.",
    questions: [
      {
        id: "set_c_q1",
        type: "Finding Error",
        text: "Identify the logic bug in this Python snippet meant to reverse a list in-place:",
        code: "Line 1: numbers = [10, 20, 30, 40]\nLine 2: for i in range(len(numbers)):\nLine 3:     numbers[i] = numbers[len(numbers) - 1 - i]\nLine 4: print(numbers)",
        answer: "Overwrites elements in the first half before copying to second half (loop should run only to len(numbers) // 2)."
      },
      {
        id: "set_c_q2",
        type: "Numerical Output",
        text: "What is the exact numerical output of the following Python code?",
        code: "a = [1, 2, 3]\nb = a * 2\nb[0] = 99\nprint(sum(a) + b[3])",
        answer: "7 (sum(a) = 6, b[3] = 1, total = 6 + 1 = 7)"
      },
      {
        id: "set_c_q3",
        type: "Logical Reasoning",
        text: "A fast algorithm solves a problem in 1 millisecond for an input size of N = 100. When input size doubles (N = 200), the execution time increases to 4 milliseconds. If N = 800, how many milliseconds will it take?",
        code: "",
        answer: "64 ms (Scales quadratically O(N^2); (800/100)^2 * 1 = 64 ms)"
      }
    ]
  },
  {
    set: "Set D",
    description: "Covers list mutation during iteration, matrix reference aliasing, and BST minimum edge depth.",
    questions: [
      {
        id: "set_d_q1",
        type: "Finding Error",
        text: "Identify the issue in this Python function meant to remove duplicate numbers while preserving order:",
        code: "Line 1: def remove_duplicates(items):\nLine 2:     for item in items:\nLine 3:         if items.count(item) > 1:\nLine 4:             items.remove(item)\nLine 5:     return items",
        answer: "Modifying a list during iteration causes skipped elements during execution."
      },
      {
        id: "set_d_q2",
        type: "Numerical Output",
        text: "What is the exact numerical output of the following Python code?",
        code: "matrix = [[0] * 3] * 3\nmatrix[0][0] = 5\nprint(sum(matrix[0]) + sum(matrix[1]))",
        answer: "10 (All rows share the same sublist reference; Row 0 sum = 5, Row 1 sum = 5, total = 10)"
      },
      {
        id: "set_d_q3",
        type: "Logical Reasoning",
        text: "A binary search tree (BST) contains the keys {10, 20, 30, 40, 50}. What is the minimum possible height (number of edges from root to deepest leaf) of this tree?",
        code: "",
        answer: "2 (Balanced BST with 5 nodes has max 2 edge depth)"
      }
    ]
  }
];
