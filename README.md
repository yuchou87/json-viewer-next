# Introduction

Online JSON Viewer.

## Getting Started

First, run the development server:

```bash
# create next app use bun(only for new project)
npx create-next-app@latest --use-bun .

# add shadcn
bunx --bun shadcn@latest init
✔ Preflight checks.
✔ Verifying framework. Found Next.js.
✔ Validating Tailwind CSS.
✔ Validating import alias.
✔ Which style would you like to use? › New York
✔ Which color would you like to use as the base color? › Zinc
✔ Would you like to use CSS variables for theming? … no / yes
✔ Writing components.json.
✔ Checking registry.
✔ Updating tailwind.config.ts
✔ Updating app/globals.css
✔ Installing dependencies.
✔ Created 1 file:
  - lib/utils.ts

Success! Project initialization completed.
You may now add components.

# add button component for testing
bunx --bun shadcn@latest add button resizable


# add codemirror
bun add @uiw/react-codemirror @codemirror/lang-json @uiw/react-json-view

# clone repo
https://github.com/yuchou87/json-viewer-next.git
bun run dev
```
