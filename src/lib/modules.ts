export interface Module {
  id: string
  title: string
  description: string
  icon: string
  lessons: Lesson[]
}

export interface Lesson {
  slug: string
  title: string
  description: string
}

export const modules: Module[] = [
  {
    id: 'basics',
    title: 'C++ Basics',
    description: 'Learn the fundamentals of C++: syntax, types, functions, and control flow.',
    icon: '📘',
    lessons: [
      { slug: 'hello-world', title: 'Hello World', description: 'Your first C++ program and compilation basics.' },
      { slug: 'variables-types', title: 'Variables & Types', description: 'Primitive types, declarations, and type system.' },
      { slug: 'functions', title: 'Functions', description: 'Defining, calling, and overloading functions.' },
      { slug: 'control-flow', title: 'Control Flow', description: 'if/else, switch, for, while, and range-based for.' },
      { slug: 'pointers-references', title: 'Pointers & References', description: 'Memory addresses, pointers, and reference types.' },
    ],
  },
  {
    id: 'oop',
    title: 'Object-Oriented Programming',
    description: 'Master classes, inheritance, and polymorphism in C++.',
    icon: '🏗️',
    lessons: [
      { slug: 'classes-objects', title: 'Classes & Objects', description: 'Defining classes, constructors, and member functions.' },
      { slug: 'inheritance', title: 'Inheritance', description: 'Base and derived classes, access specifiers.' },
      { slug: 'polymorphism', title: 'Polymorphism', description: 'Virtual functions, overriding, and abstract classes.' },
    ],
  },
  {
    id: 'memory',
    title: 'Memory Management',
    description: 'Understand stack vs heap, smart pointers, and RAII.',
    icon: '🧠',
    lessons: [
      { slug: 'stack-heap', title: 'Stack vs Heap', description: 'How C++ manages memory and when to use each.' },
      { slug: 'smart-pointers', title: 'Smart Pointers', description: 'unique_ptr, shared_ptr, and weak_ptr.' },
      { slug: 'raii', title: 'RAII', description: 'Resource Acquisition Is Initialization pattern.' },
    ],
  },
  {
    id: 'stl',
    title: 'Standard Template Library',
    description: 'Master the STL containers, algorithms, and iterators.',
    icon: '📦',
    lessons: [
      { slug: 'containers', title: 'Containers', description: 'vector, map, set, list, and unordered_map.' },
      { slug: 'algorithms', title: 'Algorithms', description: 'sort, find, transform, accumulate, and more.' },
      { slug: 'iterators', title: 'Iterators', description: 'Iterating over containers with begin/end and range loops.' },
    ],
  },
  {
    id: 'templates',
    title: 'Templates',
    description: 'Write generic, reusable code with C++ templates.',
    icon: '🔧',
    lessons: [
      { slug: 'function-templates', title: 'Function Templates', description: 'Writing generic functions.' },
      { slug: 'class-templates', title: 'Class Templates', description: 'Generic classes and data structures.' },
      { slug: 'template-specialization', title: 'Template Specialization', description: 'Customizing templates for specific types.' },
    ],
  },
  {
    id: 'modern-cpp',
    title: 'Modern C++',
    description: 'Explore C++11/14/17/20 features: auto, lambdas, move semantics.',
    icon: '🚀',
    lessons: [
      { slug: 'auto-lambdas', title: 'auto & Lambdas', description: 'Type deduction and anonymous functions.' },
      { slug: 'move-semantics', title: 'Move Semantics', description: 'rvalue references, std::move, and perfect forwarding.' },
      { slug: 'concurrency', title: 'Concurrency', description: 'std::thread, mutexes, and futures.' },
    ],
  },
  {
    id: 'testing',
    title: 'Testing with Catch2',
    description: 'Write robust C++ tests using the Catch2 testing framework.',
    icon: '✅',
    lessons: [
      { slug: 'catch2-basics', title: 'Catch2 Basics', description: 'Setting up and writing your first tests.' },
      { slug: 'test-cases', title: 'Test Cases & Sections', description: 'Organizing tests with TEST_CASE and SECTION.' },
      { slug: 'assertions', title: 'Assertions & Matchers', description: 'REQUIRE, CHECK, and powerful matchers.' },
    ],
  },
]

export function findModule(id: string): Module | undefined {
  return modules.find(m => m.id === id)
}

export function findLesson(moduleId: string, slug: string): Lesson | undefined {
  return findModule(moduleId)?.lessons.find(l => l.slug === slug)
}
