# Design Tokens — Source of Truth

This directory is the **single source of truth** for Syncrofy design tokens. All spacing, type, shadows, and colors are defined here. No other file (Less, CSS, or theme layers) should redefine these values.

## Usage

- **Emotion / React:** Import from `@/tokens` or `../tokens` and use in `styled()` or `css()`.
- **ThemeProvider:** Use the default export as your theme: `theme.constants`, `theme.palette`.
- **Direct:** `import { constants, palette, spacing, shadows } from '@/tokens';`

## Structure

| Export    | Contents |
|----------|----------|
| `constants` | Flat object: spacing, type scale, weights, line heights, shadows (legacy-compatible). |
| `palette`   | All colors: primaries, app, system, neutrals, hovers, clicks, graph, exceptions. |
| `spacing`   | Card padding/gutter and spacing1x–spacing8x. |
| `typeScale` | Font sizes (xxsFontSize–hugeFontSize). |
| `fontWeights` | thin, normal, semiBold, bold. |
| `lineHeights` | small–huge line heights. |
| `shadows`  | z1–z4 (elevation), zInner (inset). |

## Conventions

- Use **palette** keys for colors (e.g. `palette.cerulean`, `palette.d1`).
- Use **constants** or **spacing/shadows** for layout and elevation.
- For hover/active, use the corresponding `*Hover` / `*Click` palette keys.
