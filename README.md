# Syncrofy Legacy — Prototypes

Prototype ideas built with the Syncrofy Legacy design system in this repo.

## Setup

Install dependencies (from this repo):

```bash
npm install
```

The app uses only the local `design-system/` folder (no external design-system package). The Vite alias `@design-system` points to `design-system/`.

## Run

```bash
npm run dev
```

Open the URL shown (e.g. http://localhost:5173).

## Design system usage rules

This repo is a monorepo-style playground where prototypes in `src/` consume the shared design system in `design-system/`.

- The `design-system` folder is the single source of truth for all UI components, tokens, and theme. **Always create new components in the design system** (`design-system/`), not in `src/`.
- When working on a prototype, only edit files inside `src/`. Never edit files inside `design-system/` unless explicitly asked to add or change a design-system component.
- **Every new design-system component must be added to the Design System Components gallery** so it can be discovered and previewed. Add a curated entry in `src/prototypes/DesignSystemGallery.jsx` (in the `STORIES` array) with at least: `id`, `componentName`, `group`, `label`, `description`, `Component`, `initialProps`, and `controls`. Components not in `STORIES` are still listed under "All components" via the gallery’s auto-add of PascalCase exports from `@design-system`.
- Use components from `design-system/` in prototypes. Import using the `@design-system` alias. Example: `import { Button } from '@design-system'`
- Do not install or reference any external component libraries. Use the design-system components instead.

## Prototype banner (required for all prototypes)

Every prototype page must show a **banner at the top** with:

- **Back button** — "Back to prototypes" with arrow icon, linking to `/` (the prototype list).
- **Label** — `{Prototype Name} version {Version number}` (version comes from `package.json`).

Use the shared component `PrototypeBanner` from `src/components/PrototypeBanner.jsx`:

```jsx
import PrototypeBanner from '../components/PrototypeBanner';

// At the top of your prototype's content:
<PrototypeBanner prototypeName="Your Prototype Name" />
```

You can pass an optional `version` prop to override the app version. When adding a new prototype, add this banner as the first element inside the prototype’s main content area.

## List view

The app opens on a **list view of prototype ideas**. The first entry is **Prototype Testing**, which links to a placeholder prototype page. **Partners Page** links to `/partners`, a full Partners list/detail prototype built from the design system. Add more ideas by extending the `PROTOTYPE_IDEAS` array in `src/App.jsx` and adding routes as needed.

## Partners prototype — design system gaps

The Partners page (`/partners`) reuses TopNav, SideNav, Tabs, SearchBar, DreamTable, NumberedPager, Button, Icon, and SelectSuggest. The following are **not** provided by the design system and were implemented locally or worked around:

- **App shell layout** — No shared layout that includes TopNav + SideNav + main content. We use `src/layouts/PartnersLayout.jsx` to compose them and a full-width main area.
- **List/detail layout** — The DS `Partners` component is only a title + single table. The two-column (partner list left, partner detail right) layout is custom in `PartnersPage.jsx`.
- **Selectable list with metadata** — No component for “list of selectable items with primary + secondary text and active state.” Implemented with styled list items and theme (`whiteSelected` for active).
- **Sort dropdown** — No dedicated “Sorted by X” control. We use SelectSuggest with a small set of options.
- **Table row actions** — DreamTable has no built-in action column. Edit/delete per row are implemented via `renderCell` (icon buttons).
- **Expandable table rows** — DreamTable does not support expandable rows; the Name column shows a chevron for visual consistency only.
- **Icons** — Glyphs do not include DOWNLOAD, UPLOAD, or CLOCK; we use DOCUMENT/FOLDER where appropriate for the action buttons.
