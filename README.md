# LetsGoCpp 🚀

A comprehensive, interactive C++ tutorial web application following the patterns of [letsgogo](https://github.com/cjrutherford/letsgogo). Learn modern C++ through structured lessons and **Catch2-powered challenges** that validate your code with real test assertions.

## 🌟 Features

- **📚 7 Comprehensive Modules**: 21 interactive lessons covering C++ basics through modern features
- **💪 18+ Interactive Challenges**: Coding exercises validated by real Catch2 test assertions
- **🧪 Catch2 Testing Integration**: Challenges use `REQUIRE`, `CHECK`, `REQUIRE_THROWS_AS` — just like real C++ projects
- **⚡ Live Compiler**: g++ compiles and runs your code server-side with instant feedback
- **🎮 Code Playground**: Free-form C++ editor to experiment
- **🎯 Difficulty Levels**: Easy, Medium, Hard challenges

## 🛠️ Tech Stack

- **Frontend**: React 19 + TypeScript + Vite
- **Styling**: TailwindCSS v4
- **Code Editor**: Monaco Editor (same as VS Code)
- **Backend**: Express.js + TypeScript (compilation server)
- **C++ Compiler**: g++ (C++17)
- **Testing Framework**: [Catch2 v3](https://github.com/catchorg/Catch2) (amalgamated)

## 📚 Learning Modules

| Module | Lessons | Challenges |
|--------|---------|------------|
| 📘 C++ Basics | 5 | 6 |
| 🏗️ Object-Oriented Programming | 3 | 3 |
| 🧠 Memory Management | 3 | 2 |
| 📦 Standard Template Library | 3 | 3 |
| 🔧 Templates | 3 | 2 |
| 🚀 Modern C++ | 3 | 3 |
| ✅ Testing with Catch2 | 3 | 2 |

## 🧪 How Catch2 Challenges Work

Unlike tutorials that check output strings, LetsGoCpp challenges use **real Catch2 test assertions**:

```cpp
// Your implementation (what you write):
int add(int a, int b) {
    return a + b;  // implement this
}

// Test harness (appended automatically, validates your code):
#include "catch_amalgamated.hpp"

TEST_CASE("add returns correct sum", "[basics]") {
    REQUIRE(add(2, 3) == 5);
    REQUIRE(add(-1, 1) == 0);
    REQUIRE(add(0, 0) == 0);
    REQUIRE(add(100, -50) == 50);
}
```

The server compiles both together with g++ and runs the Catch2 test binary. You see the full Catch2 output showing exactly which assertions passed or failed.

## Getting Started

### Prerequisites

- Node.js 18+
- g++ with C++17 support (`g++ --version`)

### Installation

```bash
# Install dependencies (includes downloading Catch2)
npm install
```

### Running

```bash
# Start both the C++ compiler server and the frontend dev server
npm start

# Or run them separately:
npm run server  # C++ compiler server on :3001
npm run dev     # Vite dev server on :5173
```

Open http://localhost:5173

### Build for Production

```bash
npm run build
npm run preview
```

## Architecture

```
letsgocpp/
├── server/
│   ├── compile.ts          # Express server: compiles/runs C++ with g++
│   └── catch2/
│       ├── catch_amalgamated.hpp  # Catch2 v3 header
│       └── catch_amalgamated.cpp  # Catch2 v3 implementation
├── src/
│   ├── App.tsx
│   ├── components/
│   │   ├── Layout.tsx        # App shell with sidebar nav
│   │   ├── LessonView.tsx    # Markdown lesson + challenges
│   │   ├── ChallengeCard.tsx # Interactive challenge with editor + Catch2 runner
│   │   ├── CodePlayground.tsx
│   │   └── SyntaxHighlight.tsx
│   ├── pages/
│   │   ├── Landing.tsx
│   │   └── Home.tsx
│   ├── lib/
│   │   ├── challenges.ts    # All challenges with testCode (Catch2 assertions)
│   │   ├── modules.ts       # Module/lesson metadata
│   │   ├── content.ts       # Markdown imports
│   │   └── cppCompiler.ts   # Client-side compiler API
│   └── content/modules/     # Markdown lesson files
│       ├── basics/
│       ├── oop/
│       ├── memory/
│       ├── stl/
│       ├── templates/
│       ├── modern-cpp/
│       └── testing/
```

## Contributing

### Adding a New Challenge

Add to `src/lib/challenges.ts`:

```typescript
{
  id: 'module-XX',
  lessonSlug: 'lesson-slug',
  title: 'Challenge Title',
  description: 'What the student needs to implement...',
  starterCode: `// Student writes their implementation here
int myFunction(int x) {
    return 0; // TODO
}`,
  testCode: `#include "catch_amalgamated.hpp"

TEST_CASE("myFunction works", "[module]") {
    REQUIRE(myFunction(5) == 25);
    REQUIRE(myFunction(0) == 0);
}`,
  hints: ['Hint 1', 'Hint 2'],
  points: 20,
  difficulty: 'medium',
}
```

For non-test challenges (just run and see output), set `testCode: ''`.

### Adding a New Lesson

1. Add a markdown file to `src/content/modules/{module-name}/{nn}-{slug}.md`
2. Import it in `src/lib/content.ts`
3. Add it to the module in `src/lib/modules.ts`

## License

MIT
