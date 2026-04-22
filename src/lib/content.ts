// Content imports - each lesson's markdown
// Basics module
import basicsHelloWorld from '../content/modules/basics/01-hello-world.md?raw'
import basicsVariablesTypes from '../content/modules/basics/02-variables-types.md?raw'
import basicsFunctions from '../content/modules/basics/03-functions.md?raw'
import basicsControlFlow from '../content/modules/basics/04-control-flow.md?raw'
import basicsPointersRefs from '../content/modules/basics/05-pointers-references.md?raw'

// OOP module
import oopClassesObjects from '../content/modules/oop/01-classes-objects.md?raw'
import oopInheritance from '../content/modules/oop/02-inheritance.md?raw'
import oopPolymorphism from '../content/modules/oop/03-polymorphism.md?raw'

// Memory module
import memoryStackHeap from '../content/modules/memory/01-stack-heap.md?raw'
import memorySmartPointers from '../content/modules/memory/02-smart-pointers.md?raw'
import memoryRaii from '../content/modules/memory/03-raii.md?raw'

// STL module
import stlContainers from '../content/modules/stl/01-containers.md?raw'
import stlAlgorithms from '../content/modules/stl/02-algorithms.md?raw'
import stlIterators from '../content/modules/stl/03-iterators.md?raw'

// Templates module
import templatesFunctionTemplates from '../content/modules/templates/01-function-templates.md?raw'
import templatesClassTemplates from '../content/modules/templates/02-class-templates.md?raw'
import templatesSpecialization from '../content/modules/templates/03-template-specialization.md?raw'

// Modern C++ module
import modernAutoLambdas from '../content/modules/modern-cpp/01-auto-lambdas.md?raw'
import modernMoveSemantics from '../content/modules/modern-cpp/02-move-semantics.md?raw'
import modernConcurrency from '../content/modules/modern-cpp/03-concurrency.md?raw'

// Testing module
import testingCatch2Basics from '../content/modules/testing/01-catch2-basics.md?raw'
import testingTestCases from '../content/modules/testing/02-test-cases.md?raw'
import testingAssertions from '../content/modules/testing/03-assertions.md?raw'

export const lessonContent: Record<string, string> = {
  // Basics
  'hello-world': basicsHelloWorld,
  'variables-types': basicsVariablesTypes,
  'functions': basicsFunctions,
  'control-flow': basicsControlFlow,
  'pointers-references': basicsPointersRefs,

  // OOP
  'classes-objects': oopClassesObjects,
  'inheritance': oopInheritance,
  'polymorphism': oopPolymorphism,

  // Memory
  'stack-heap': memoryStackHeap,
  'smart-pointers': memorySmartPointers,
  'raii': memoryRaii,

  // STL
  'containers': stlContainers,
  'algorithms': stlAlgorithms,
  'iterators': stlIterators,

  // Templates
  'function-templates': templatesFunctionTemplates,
  'class-templates': templatesClassTemplates,
  'template-specialization': templatesSpecialization,

  // Modern C++
  'auto-lambdas': modernAutoLambdas,
  'move-semantics': modernMoveSemantics,
  'concurrency': modernConcurrency,

  // Testing
  'catch2-basics': testingCatch2Basics,
  'test-cases': testingTestCases,
  'assertions': testingAssertions,
}

export function extractExcerpt(content: string, maxLength = 180): string {
  if (!content) return ''

  const lines = content
    .split('\n')
    .filter(line => line.trim() && !line.startsWith('#'))
    .slice(0, 3)

  let excerpt = lines
    .join(' ')
    .replace(/```[\s\S]*?```/g, '')
    .replace(/`[^`]+`/g, '')
    .replace(/[#*_~[\]]/g, '')
    .replace(/\s+/g, ' ')
    .trim()

  if (excerpt.length > maxLength) {
    excerpt = excerpt.substring(0, maxLength).trim() + '...'
  }

  return excerpt
}
