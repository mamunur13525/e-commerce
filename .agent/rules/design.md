---
trigger: always_on
---

# Frontend Developer Agent Rules

**Stack Focus:** Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS, shadcn/ui

**Primary Strength:** Convert images (UI screenshots, Figma exports, wireframes) into clean, production-ready code.

---

## 1) Core Principles

1. **Image → Code First**

   - Treat provided images as the single source of truth for layout, spacing, hierarchy, and visual intent.
   - Reproduce pixel rhythm (spacing scale, alignment) before adding logic.

2. **Production-Ready by Default**

   - TypeScript strict mode.
   - Accessible (ARIA, keyboard navigation).
   - Responsive across breakpoints (mobile → desktop).

3. **Simplicity Over Cleverness**

   - Prefer composable components and shadcn primitives.
   - Avoid over-engineering or unnecessary abstractions.

---

## 2) Next.js 15 Rules

- Use **App Router** (`app/`), **Server Components by default**.
- Add `'use client'` only when interactivity is required.
- Prefer **Server Actions** for mutations when applicable.
- Use `next/image` and `next/link` correctly.
- Co-locate components by route when possible:

  ```
  app/(dashboard)/page.tsx
  app/(dashboard)/_components/
  ```

- Never use deprecated APIs from Pages Router.

---

## 3) shadcn/ui Rules

- Always build UI using **shadcn/ui components** first (Button, Card, Dialog, Sheet, Tabs, DropdownMenu, etc.).
- Customize via **Tailwind classes**, not by rewriting components.
- Follow shadcn patterns:

  - Variants via `cva`
  - Composition over prop-heavy components

- Keep consistent radius, shadows, and spacing.

---

## 4) Image → Code Workflow

1. **Analyze Image**

   - Identify layout: grid, flex, sections
   - Detect components: cards, modals, tables, forms
   - Note spacing, typography scale, colors

2. **Map to Components**

   - Page layout → `Container / Grid`
   - UI blocks → shadcn components
   - Repeated items → reusable components

3. **Implement Skeleton First**

   - Structure & layout
   - Then typography
   - Then interactions

4. **Polish**

   - Responsive behavior
   - Hover / focus states
   - Empty & loading states

---

## 5) Styling Rules (Tailwind)

- Use Tailwind utility classes only.
- No inline styles unless absolutely required.
- Follow spacing scale: `gap-2/4/6/8`, `p-4/6/8`.
- Prefer semantic text sizes:

  - Headings: `text-xl → text-3xl`
  - Body: `text-sm / text-base`

- Dark mode must work automatically.

---

## 6) Accessibility (Mandatory)

- All interactive elements must be keyboard accessible.
- Use `Label`, `aria-*`, `sr-only` when needed.
- Proper contrast in dark & light themes.
- Forms must include:

  - Labels
  - Error messages
  - Disabled states

---

## 7) State & Data Rules

- Local UI state: `useState`
- Derived state: memoization (`useMemo`)
- Avoid global state unless necessary.
- For async UI:

  - Use loading skeletons
  - Handle error states explicitly

---

## 8) File & Naming Conventions

- Components: `PascalCase.tsx`
- Hooks: `use-*.ts`
- UI-only components inside `_components/`
- Reusable UI: `components/ui/`

Example:

```
components/
  ui/
  dashboard/
    stats-card.tsx
```

---

## 9) Code Quality Rules

- No unused imports or props.
- No `any` types.
- Clear comments only when logic is non-obvious.
- Prefer readable JSX over compressed one-liners.

---

## 10) Output Expectations

When generating code from an image, the agent must:

- ✅ Match layout & spacing closely
- ✅ Use shadcn/ui components
- ✅ Be responsive & accessible
- ✅ Be ready to paste into a Next.js 15 project

---

## 11) Forbidden Practices

- ❌ Inline CSS or styled-components
- ❌ Deprecated Next.js APIs
- ❌ Hardcoded magic values without reason
- ❌ Overuse of client components

---

**Agent Mindset:**

> "Think like a senior frontend engineer turning a Figma design into a clean, scalable Next.js 15 codebase."
