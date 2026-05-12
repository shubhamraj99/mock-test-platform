export const questions = [
  // ==========================================
  // CATEGORY 1: QUANTITATIVE APTITUDE & LOGIC
  // ==========================================
  {
    category: "Aptitude",
    question: "If a person sells a pen for ₹48, he loses 20%. To gain 20%, what should be the selling price?",
    options: ["₹60", "₹72", "₹80", "₹84"],
    answer: "₹72"
  },
  {
    category: "Aptitude",
    question: "A train running at the speed of 60 km/hr crosses a pole in 9 seconds. What is the length of the train?",
    options: ["120 meters", "180 meters", "150 meters", "200 meters"],
    answer: "150 meters"
  },
  {
    category: "Aptitude",
    question: "Look at this series: 2, 6, 18, 54, ... What number should come next?",
    options: ["108", "148", "162", "216"],
    answer: "162"
  },
  {
    category: "Aptitude",
    question: "If A and B together can complete a work in 15 days, and B alone can do it in 20 days, in how many days can A alone do it?",
    options: ["30 days", "40 days", "45 days", "60 days"],
    answer: "60 days"
  },
  {
    category: "Aptitude",
    question: "The sum of ages of 5 children born at the intervals of 3 years each is 50 years. What is the age of the youngest child?",
    options: ["4 years", "8 years", "10 years", "None of these"],
    answer: "4 years"
  },
  {
    category: "Aptitude",
    question: "What is the probability of getting a sum of 9 from two throws of a dice?",
    options: ["1/6", "1/8", "1/9", "1/12"],
    answer: "1/9"
  },
  {
    category: "Aptitude",
    question: "If 'APPLE' is coded as 'EQTPI', how is 'MANGO' coded?",
    options: ["QERKS", "QDRKS", "QERJS", "PEQKS"],
    answer: "QERKS"
  },
  {
    category: "Aptitude",
    question: "Find the odd one out: 3, 5, 11, 14, 17, 21",
    options: ["14", "17", "21", "Both 14 and 21"],
    answer: "Both 14 and 21"
  },
  {
    category: "Aptitude",
    question: "A clock shows 3:15. What is the angle between the minute hand and the hour hand?",
    options: ["0 degrees", "7.5 degrees", "15 degrees", "22.5 degrees"],
    answer: "7.5 degrees"
  },
  {
    category: "Aptitude",
    question: "In a class of 40 students, 20 study Math, 15 study Science, and 5 study both. How many study neither?",
    options: ["5", "10", "15", "20"],
    answer: "10"
  },

  // ==========================================
  // CATEGORY 2: DATA STRUCTURES & ALGORITHMS
  // ==========================================
  {
    category: "DSA",
    question: "Which data structure is used for Breadth First Search (BFS) of a graph?",
    options: ["Stack", "Queue", "Linked List", "Tree"],
    answer: "Queue"
  },
  {
    category: "DSA",
    question: "What is the worst-case time complexity of QuickSort?",
    options: ["O(n log n)", "O(n)", "O(n^2)", "O(log n)"],
    answer: "O(n^2)"
  },
  {
    category: "DSA",
    question: "Which of the following is not a stable sorting algorithm?",
    options: ["Merge Sort", "Insertion Sort", "Bubble Sort", "Quick Sort"],
    answer: "Quick Sort"
  },
  {
    category: "DSA",
    question: "What is the time complexity to insert a node at the front of a Linked List?",
    options: ["O(1)", "O(n)", "O(log n)", "O(n^2)"],
    answer: "O(1)"
  },
  {
    category: "DSA",
    question: "A Binary Search Tree (BST) is traversed in In-order. What will be the output sequence?",
    options: ["Randomly sorted", "Descending order", "Ascending order", "None of the above"],
    answer: "Ascending order"
  },
  {
    category: "DSA",
    question: "Which algorithm is used to find the shortest path from a single source node to all other nodes?",
    options: ["Kruskal's Algorithm", "Dijkstra's Algorithm", "Prim's Algorithm", "Floyd-Warshall Algorithm"],
    answer: "Dijkstra's Algorithm"
  },
  {
    category: "DSA",
    question: "What data structure is used to implement a Least Recently Used (LRU) cache?",
    options: ["Hash Map and Doubly Linked List", "Binary Tree", "Stack and Queue", "Array"],
    answer: "Hash Map and Doubly Linked List"
  },
  {
    category: "DSA",
    question: "In a Max-Heap, where is the largest element located?",
    options: ["At a leaf node", "At the root node", "At the center", "It can be anywhere"],
    answer: "At the root node"
  },
  {
    category: "DSA",
    question: "What is the optimal algorithm to detect a cycle in a Linked List?",
    options: ["Breadth First Search", "Floyd's Tortoise and Hare", "KMP Algorithm", "Binary Search"],
    answer: "Floyd's Tortoise and Hare"
  },
  {
    category: "DSA",
    question: "Which notation represents the lower bound of an algorithm's running time?",
    options: ["Big-O notation", "Big-Omega notation", "Theta notation", "Little-o notation"],
    answer: "Big-Omega notation"
  },

  // ==========================================
  // CATEGORY 3: FRONTEND (REACT & JS)
  // ==========================================
  {
    category: "Frontend",
    question: "What does the Virtual DOM in React do?",
    options: ["Updates the real DOM immediately", "Replaces HTML completely", "Minimizes real DOM manipulations by comparing changes", "Speeds up network requests"],
    answer: "Minimizes real DOM manipulations by comparing changes"
  },
  {
    category: "Frontend",
    question: "Which React hook is used to perform side effects in a functional component?",
    options: ["useState", "useContext", "useEffect", "useReducer"],
    answer: "useEffect"
  },
  {
    category: "Frontend",
    question: "What is the correct way to pass data from a parent component to a child component in React?",
    options: ["Using State", "Using Props", "Using Context only", "Using Redux only"],
    answer: "Using Props"
  },
  {
    category: "Frontend",
    question: "In JavaScript, what will `console.log(typeof null)` output?",
    options: ["'null'", "'undefined'", "'object'", "'number'"],
    answer: "'object'"
  },
  {
    category: "Frontend",
    question: "Which keyword is used to declare a block-scoped variable that cannot be reassigned?",
    options: ["var", "let", "const", "static"],
    answer: "const"
  },
  {
    category: "Frontend",
    question: "What does CSS Flexbox `justify-content: center` do?",
    options: ["Centers items vertically", "Centers items horizontally along the main axis", "Creates a grid pattern", "Removes all margins"],
    answer: "Centers items horizontally along the main axis"
  },
  {
    category: "Frontend",
    question: "In React, why should you avoid mutating state directly (e.g., `this.state.value = 1`)?",
    options: ["It throws a syntax error", "It bypasses React's re-rendering process", "It deletes the component", "It causes an infinite loop"],
    answer: "It bypasses React's re-rendering process"
  },
  {
    category: "Frontend",
    question: "What is a JavaScript Closure?",
    options: ["A function bundled with its lexical environment", "A syntax error", "An asynchronous API call", "A method to close the browser window"],
    answer: "A function bundled with its lexical environment"
  },
  {
    category: "Frontend",
    question: "Which array method creates a new array populated with the results of calling a provided function on every element?",
    options: ["forEach()", "filter()", "reduce()", "map()"],
    answer: "map()"
  },
  {
    category: "Frontend",
    question: "What does the `z-index` property in CSS control?",
    options: ["The width of an element", "The transparency of an element", "The stacking order of elements (front to back)", "The font size"],
    answer: "The stacking order of elements (front to back)"
  },

  // ==========================================
  // CATEGORY 4: CORE PROGRAMMING (JAVA / PYTHON)
  // ==========================================
  {
    category: "Programming",
    question: "In Java, what is the default value of a boolean instance variable?",
    options: ["true", "false", "null", "0"],
    answer: "false"
  },
  {
    category: "Programming",
    question: "Which of the following is NOT a pillar of Object-Oriented Programming?",
    options: ["Encapsulation", "Polymorphism", "Compilation", "Inheritance"],
    answer: "Compilation"
  },
  {
    category: "Programming",
    question: "In Python, which built-in data type is immutable?",
    options: ["List", "Dictionary", "Set", "Tuple"],
    answer: "Tuple"
  },
  {
    category: "Programming",
    question: "What keyword is used in Java to prevent a class from being inherited?",
    options: ["static", "final", "abstract", "private"],
    answer: "final"
  },
  {
    category: "Programming",
    question: "How do you define a function in Python?",
    options: ["function myFunc():", "def myFunc():", "create myFunc():", "void myFunc() {"],
    answer: "def myFunc():"
  },
  {
    category: "Programming",
    question: "In Java, which memory area stores objects created using the 'new' keyword?",
    options: ["Stack Memory", "Heap Memory", "String Pool", "Cache"],
    answer: "Heap Memory"
  },
  {
    category: "Programming",
    question: "What is the output of `3 * 1 ** 3` in Python?",
    options: ["3", "9", "27", "1"],
    answer: "3"
  },
  {
    category: "Programming",
    question: "Which concept allows a Java interface to have a method implementation?",
    options: ["Abstract methods", "Default methods", "Static blocks", "Overridden methods"],
    answer: "Default methods"
  },
  {
    category: "Programming",
    question: "What is a 'lambda' function in Python?",
    options: ["A recursive function", "A multi-line mathematical function", "An anonymous, single-expression function", "A class method"],
    answer: "An anonymous, single-expression function"
  },
  {
    category: "Programming",
    question: "In Java, what happens if an exception is thrown inside a try block but there is no catch block, only a finally block?",
    options: ["Compilation Error", "The finally block executes, then the program crashes", "The exception is ignored", "The finally block is skipped"],
    answer: "The finally block executes, then the program crashes"
  },

  // ==========================================
  // CATEGORY 5: CS FUNDAMENTALS (OS, DBMS, NETWORKS)
  // ==========================================
  {
    category: "Fundamentals",
    question: "In a Relational Database, what is a Primary Key?",
    options: ["A key used to encrypt the database", "A unique identifier for each record in a table", "A common value shared across all tables", "The first column of a table"],
    answer: "A unique identifier for each record in a table"
  },
  {
    category: "Fundamentals",
    question: "Which SQL clause is used to filter records after an aggregation (GROUP BY) has occurred?",
    options: ["WHERE", "ORDER BY", "HAVING", "LIMIT"],
    answer: "HAVING"
  },
  {
    category: "Fundamentals",
    question: "In an Operating System, what is 'Deadlock'?",
    options: ["When the CPU overheats", "When two or more processes are waiting indefinitely for resources held by each other", "When a process finishes execution", "When memory is completely full"],
    answer: "When two or more processes are waiting indefinitely for resources held by each other"
  },
  {
    category: "Fundamentals",
    question: "Which layer of the OSI model is responsible for routing packets across networks?",
    options: ["Data Link Layer", "Transport Layer", "Network Layer", "Application Layer"],
    answer: "Network Layer"
  },
  {
    category: "Fundamentals",
    question: "What does ACID stand for in the context of database transactions?",
    options: ["Atomicity, Consistency, Isolation, Durability", "Accuracy, Control, Integrity, Data", "Automated, Created, Indexed, Deleted", "Array, Class, Integer, Double"],
    answer: "Atomicity, Consistency, Isolation, Durability"
  },
  {
    category: "Fundamentals",
    question: "In OS memory management, what does 'Thrashing' refer to?",
    options: ["Excessive disk I/O caused by constant page swapping", "Clearing the CPU cache", "Defragmenting the hard drive", "Terminating background processes"],
    answer: "Excessive disk I/O caused by constant page swapping"
  },
  {
    category: "Fundamentals",
    question: "What port number does HTTPS securely operate on by default?",
    options: ["80", "21", "22", "443"],
    answer: "443"
  },
  {
    category: "Fundamentals",
    question: "Which of the following is a NoSQL database?",
    options: ["MySQL", "PostgreSQL", "MongoDB", "Oracle"],
    answer: "MongoDB"
  },
  {
    category: "Fundamentals",
    question: "What is the purpose of a Subnet Mask in computer networking?",
    options: ["To block malicious traffic", "To divide an IP address into network and host addresses", "To encrypt web traffic", "To translate domain names to IP addresses"],
    answer: "To divide an IP address into network and host addresses"
  },
  {
    category: "Fundamentals",
    question: "In Git version control, which command is used to save your changes locally?",
    options: ["git push", "git commit", "git pull", "git merge"],
    answer: "git commit"
  }
];