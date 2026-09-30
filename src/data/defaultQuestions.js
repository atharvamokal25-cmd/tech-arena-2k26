export const DEFAULT_QUESTION_SETS = [
  {
    set: "Set A",
    description: "Focuses on assignment operators, pointer/reference mutations, and Venn set logic.",
    questions: [
      {
        id: "set_a_q1",
        type: "Finding Error",
        text: "Identify the line number and error in the following snippet:",
        code: "Line 1: numbers = [1, 2, 3, 4]\nLine 2: for i in range(len(numbers)):\nLine 3:     if numbers[i] % 2 = 0:\nLine 4:         print(numbers[i])",
        answer: "Line 3: = is an assignment operator, should be == for comparison.",
        languages: {
          python: {
            text: "Identify the line number and error in the following Python snippet:",
            code: "Line 1: numbers = [1, 2, 3, 4]\nLine 2: for i in range(len(numbers)):\nLine 3:     if numbers[i] % 2 = 0:\nLine 4:         print(numbers[i])",
            answer: "Line 3: = is an assignment operator, should be == for comparison."
          },
          c: {
            text: "Identify the line number and error in the following C snippet:",
            code: "Line 1: #include <stdio.h>\nLine 2: int main() {\nLine 3:     int numbers[] = {1, 2, 3, 4};\nLine 4:     for (int i = 0; i < 4; i++) {\nLine 5:         if (numbers[i] % 2 = 0) {\nLine 6:             printf(\"%d\\n\", numbers[i]);\nLine 7:         }\nLine 8:     }\nLine 9:     return 0;\nLine 10: }",
            answer: "Line 5: = is an assignment operator, should be == for equality comparison (lvalue required error)."
          },
          java: {
            text: "Identify the line number and error in the following Java snippet:",
            code: "Line 1: public class Main {\nLine 2:     public static void main(String[] args) {\nLine 3:         int[] numbers = {1, 2, 3, 4};\nLine 4:         for (int i = 0; i < numbers.length; i++) {\nLine 5:             if (numbers[i] % 2 = 0) {\nLine 6:                 System.out.println(numbers[i]);\nLine 7:             }\nLine 8:         }\nLine 9:     }\nLine 10: }",
            answer: "Line 5: = is an assignment operator, should be == for boolean comparison."
          }
        }
      },
      {
        id: "set_a_q2",
        type: "Numerical Output",
        text: "What is the exact numerical output of the following code?",
        code: "x = [10, 20, 30]\ny = x\ny.append(40)\nprint(len(x) * 10 + len(y))",
        answer: "44",
        languages: {
          python: {
            text: "What is the exact numerical output of the following Python code?",
            code: "x = [10, 20, 30]\ny = x\ny.append(40)\nprint(len(x) * 10 + len(y))",
            answer: "44"
          },
          c: {
            text: "What is the exact numerical output of the following C program?",
            code: "#include <stdio.h>\nint main() {\n    int x[] = {10, 20, 30, 40};\n    int *ptr = x;\n    ptr += 2;\n    int output = (*ptr * 10) + *(x + 1);\n    printf(\"%d\", output);\n    return 0;\n}",
            answer: "320 (*ptr is 30, *(x+1) is 20 -> 30*10 + 20 = 320)"
          },
          java: {
            text: "What is the exact numerical output of the following Java program?",
            code: "import java.util.ArrayList;\npublic class Main {\n    public static void main(String[] args) {\n        ArrayList<Integer> x = new ArrayList<>();\n        x.add(10); x.add(20); x.add(30);\n        ArrayList<Integer> y = x;\n        y.add(40);\n        System.out.println(x.size() * 10 + y.size());\n    }\n}",
            answer: "44"
          }
        }
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
        text: "Identify the logic bug in this function meant to calculate a factorial:",
        code: "Line 1: def factorial(n):\nLine 2:     if n == 0:\nLine 3:         return 1\nLine 4:     return n * factorial(n)",
        answer: "Line 4: Infinite recursion (Stack Overflow); must pass n - 1.",
        languages: {
          python: {
            text: "Identify the logic bug in this Python function meant to calculate a factorial:",
            code: "Line 1: def factorial(n):\nLine 2:     if n == 0:\nLine 3:         return 1\nLine 4:     return n * factorial(n)",
            answer: "Line 4: Infinite recursion (Stack Overflow); must pass n - 1."
          },
          c: {
            text: "Identify the logic bug in this C function meant to calculate a factorial:",
            code: "Line 1: int factorial(int n) {\nLine 2:     if (n == 0) {\nLine 3:         return 1;\nLine 4:     }\nLine 5:     return n * factorial(n);\nLine 6: }",
            answer: "Line 5: Infinite recursion / Stack overflow; recursive call must be factorial(n - 1)."
          },
          java: {
            text: "Identify the logic bug in this Java method meant to calculate a factorial:",
            code: "Line 1: public class Factorial {\nLine 2:     public static int compute(int n) {\nLine 3:         if (n == 0) return 1;\nLine 4:         return n * compute(n);\nLine 5:     }\nLine 6: }",
            answer: "Line 4: Infinite recursion causing StackOverflowError; must pass n - 1."
          }
        }
      },
      {
        id: "set_b_q2",
        type: "Numerical Output",
        text: "What is the exact numerical output of the following code?",
        code: "a = [10, 20]\nb = [a, a]\na.append(30)\nprint(len(b[0]) + len(b[1]))",
        answer: "6",
        languages: {
          python: {
            text: "What is the exact numerical output of the following Python code?",
            code: "a = [10, 20]\nb = [a, a]\na.append(30)\nprint(len(b[0]) + len(b[1]))",
            answer: "6 (b[0] and b[1] both point to a, which has 3 items: 3 + 3 = 6)"
          },
          c: {
            text: "What is the exact numerical output of the following C program?",
            code: "#include <stdio.h>\nint main() {\n    int a = 5, b = 10;\n    int res = a++ + ++b + (a * 2);\n    printf(\"%d\", res);\n    return 0;\n}",
            answer: "28 (a++ evaluates to 5, a becomes 6; ++b evaluates to 11; a*2 is 12 -> 5 + 11 + 12 = 28)"
          },
          java: {
            text: "What is the exact numerical output of the following Java program?",
            code: "import java.util.ArrayList;\npublic class Main {\n    public static void main(String[] args) {\n        ArrayList<Integer> a = new ArrayList<>();\n        a.add(10); a.add(20);\n        ArrayList<ArrayList<Integer>> b = new ArrayList<>();\n        b.add(a); b.add(a);\n        a.add(30);\n        System.out.println(b.get(0).size() + b.get(1).size());\n    }\n}",
            answer: "6"
          }
        }
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
    description: "Tests in-place array inversion bugs, sequence pointer operations, and O(N^2) complexity scaling.",
    questions: [
      {
        id: "set_c_q1",
        type: "Finding Error",
        text: "Identify the logic bug in this snippet meant to reverse an array in-place:",
        code: "Line 1: numbers = [10, 20, 30, 40]\nLine 2: for i in range(len(numbers)):\nLine 3:     numbers[i] = numbers[len(numbers) - 1 - i]\nLine 4: print(numbers)",
        answer: "Overwrites elements in first half before copying to second half (loop should run to len(numbers) // 2 with swap).",
        languages: {
          python: {
            text: "Identify the logic bug in this Python snippet meant to reverse a list in-place:",
            code: "Line 1: numbers = [10, 20, 30, 40]\nLine 2: for i in range(len(numbers)):\nLine 3:     numbers[i] = numbers[len(numbers) - 1 - i]\nLine 4: print(numbers)",
            answer: "Overwrites elements in first half before copying to second half (loop should run to len(numbers) // 2 with swap)."
          },
          c: {
            text: "Identify the logic bug in this C function meant to reverse an array in-place:",
            code: "Line 1: void reverse(int arr[], int n) {\nLine 2:     for (int i = 0; i < n; i++) {\nLine 3:         arr[i] = arr[n - 1 - i];\nLine 4:     }\nLine 5: }",
            answer: "Line 3: Overwrites the first half of the array without swapping, mirroring elements rather than reversing."
          },
          java: {
            text: "Identify the logic bug in this Java method meant to reverse an array in-place:",
            code: "Line 1: public static void reverse(int[] arr) {\nLine 2:     for (int i = 0; i < arr.length; i++) {\nLine 3:         arr[i] = arr[arr.length - 1 - i];\nLine 4:     }\nLine 5: }",
            answer: "Line 3: Overwrites array elements without swapping, producing a symmetric array instead of reversing."
          }
        }
      },
      {
        id: "set_c_q2",
        type: "Numerical Output",
        text: "What is the exact numerical output of the following code?",
        code: "a = [1, 2, 3]\nb = a * 2\nb[0] = 99\nprint(sum(a) + b[3])",
        answer: "7",
        languages: {
          python: {
            text: "What is the exact numerical output of the following Python code?",
            code: "a = [1, 2, 3]\nb = a * 2\nb[0] = 99\nprint(sum(a) + b[3])",
            answer: "7 (sum(a) = 6, b[3] = 1, total = 6 + 1 = 7)"
          },
          c: {
            text: "What is the exact numerical output of the following C code?",
            code: "#include <stdio.h>\nint main() {\n    int arr[] = {2, 4, 6, 8, 10};\n    int *p = arr + 1;\n    int sum = *(p++) + *(++p) + *p;\n    printf(\"%d\", sum);\n    return 0;\n}",
            answer: "20 (*(p++) evaluates to 4 and p becomes arr+2; *(++p) increments p to arr+3 and evaluates to 8; *p is 8 -> 4 + 8 + 8 = 20)"
          },
          java: {
            text: "What is the exact numerical output of the following Java program?",
            code: "public class Main {\n    public static void main(String[] args) {\n        String str = \"TechArena\";\n        int val = str.substring(4).length() * 10 + str.indexOf('A');\n        System.out.println(val);\n    }\n}",
            answer: "54 (substring(4) is \"Arena\" with length 5; indexOf('A') is 4 -> 5 * 10 + 4 = 54)"
          }
        }
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
    description: "Covers collection mutations during iteration, memory references, and bitwise/tree logic.",
    questions: [
      {
        id: "set_d_q1",
        type: "Finding Error",
        text: "Identify the issue in this code meant to remove elements during traversal:",
        code: "Line 1: def remove_duplicates(items):\nLine 2:     for item in items:\nLine 3:         if items.count(item) > 1:\nLine 4:             items.remove(item)\nLine 5:     return items",
        answer: "Modifying collection during iteration causes skipped elements.",
        languages: {
          python: {
            text: "Identify the issue in this Python function meant to remove duplicate numbers while preserving order:",
            code: "Line 1: def remove_duplicates(items):\nLine 2:     for item in items:\nLine 3:         if items.count(item) > 1:\nLine 4:             items.remove(item)\nLine 5:     return items",
            answer: "Modifying a list during iteration causes skipped elements during execution."
          },
          c: {
            text: "Identify the critical runtime error in this C string manipulation code:",
            code: "Line 1: #include <stdio.h>\nLine 2: int main() {\nLine 3:     char *str = \"TechArena2026\";\nLine 4:     str[0] = 't';\nLine 5:     printf(\"%s\\n\", str);\nLine 6:     return 0;\nLine 7: }",
            answer: "Line 4: Segmentation fault / Bus error: attempting to modify a string literal stored in read-only memory."
          },
          java: {
            text: "Identify the runtime exception caused by this Java snippet:",
            code: "Line 1: import java.util.*;\nLine 2: public class Main {\nLine 3:     public static void main(String[] args) {\nLine 4:         List<String> list = new ArrayList<>(Arrays.asList(\"A\", \"B\", \"C\"));\nLine 5:         for (String s : list) {\nLine 6:             if (s.equals(\"B\")) list.remove(s);\nLine 7:         }\nLine 8:     }\nLine 9: }",
            answer: "Line 6: Throws ConcurrentModificationException by removing elements during an active for-each loop."
          }
        }
      },
      {
        id: "set_d_q2",
        type: "Numerical Output",
        text: "What is the exact numerical output of the following code?",
        code: "matrix = [[0] * 3] * 3\nmatrix[0][0] = 5\nprint(sum(matrix[0]) + sum(matrix[1]))",
        answer: "10",
        languages: {
          python: {
            text: "What is the exact numerical output of the following Python code?",
            code: "matrix = [[0] * 3] * 3\nmatrix[0][0] = 5\nprint(sum(matrix[0]) + sum(matrix[1]))",
            answer: "10 (All rows share the same sublist reference; Row 0 sum = 5, Row 1 sum = 5, total = 10)"
          },
          c: {
            text: "What is the exact numerical output of the following C code?",
            code: "#include <stdio.h>\nint main() {\n    int a = 12, b = 25;\n    int res = (a & b) * 10 + (a ^ b);\n    printf(\"%d\", res);\n    return 0;\n}",
            answer: "101 (a & b = 8; a ^ b = 21 -> 8 * 10 + 21 = 101)"
          },
          java: {
            text: "What is the exact numerical output of the following Java program?",
            code: "public class Main {\n    public static void main(String[] args) {\n        int x = 7;\n        int y = (x << 2) + (x >> 1);\n        System.out.println(y);\n    }\n}",
            answer: "31 (7 << 2 is 28, 7 >> 1 is 3 -> 28 + 3 = 31)"
          }
        }
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
