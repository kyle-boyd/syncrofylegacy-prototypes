# SelectableList

List of selectable items with **primary** and **secondary (meta)** text and **active** state. Styled with theme tokens (Emotion).

## DS naming

- **SelectableList** — container component (listbox).
- **ListItemWithMeta** — alternative name for **SelectableListItem** (single item with primary + secondary text and active state).

## Usage

```jsx
import { SelectableList, SelectableListItem } from 'syncrofylegacy';

// Controlled list
<SelectableList
  items={[
    { id: '1', primaryText: 'Report A', secondaryText: 'Updated 2h ago' },
    { id: '2', primaryText: 'Report B', secondaryText: '24 items' },
  ]}
  selectedId={selectedId}
  onSelect={setSelectedId}
  aria-label="Reports"
/>

// Standalone item (e.g. in custom lists)
<SelectableListItem
  primaryText="Option"
  secondaryText="Meta"
  active={isActive}
  onClick={handleClick}
/>
```

Requires `ThemeProvider` with theme (e.g. default export from `syncrofylegacy`).
