# DreamTable

Table component for tabular data. Uses a `columns` + `data` + optional `renderCell` API.

## Expandable rows

DreamTable supports expandable rows so that each row can show a chevron (right when collapsed, down when expanded) and reveal a detail panel below the row.

**Props:**

- **`expandable`** (boolean) – When `true`, the first column (or the column given by `expandIconColumnKey`) shows a chevron that toggles expansion.
- **`expandedRowRender(row)`** (function) – Called with the row object; return a React node to render in the full-width detail cell below the row when expanded.
- **`expandIconColumnKey`** (string, optional) – Column key that shows the expand/collapse chevron. Defaults to the first column’s key.
- **`expandedRowKeys`** (array, optional) – Controlled: list of row keys (values of `keyField`) that are currently expanded.
- **`defaultExpandedRowKeys`** (array, optional) – Uncontrolled: initial expanded row keys.
- **`onExpandedRowsChange(expandedKeys)`** (function, optional) – Called when the user expands or collapses a row; receives the new array of expanded keys. Use with `expandedRowKeys` for controlled mode.

**Example:** See the **Expandable** story for a Contacts-style table with Name, Contact Type, Partner Access, Compliance, Last Modified, and row actions, where expanding a row shows Email, Phone, Notes, Address, Job Title, and Office in a two-column detail layout.

## No built-in actions column

DreamTable does **not** include a built-in action column or row actions. To add edit/delete (or other) row actions:

1. Add an extra column to `columns` (e.g. `{ key: 'actions', title: '' }`).
2. Use **`renderCell(col, value, row)`** and, when `col.key === 'actions'` (or your actions key), return your UI (e.g. icon buttons).

See the **WithRowActions** story for a full example: an "actions" column with Edit and Delete icon buttons implemented via `renderCell` and the design system `Button` + `Icon` (glyphs `EDIT`, `DELETE`).

## Future DS addition

A **DataTable** (or DreamTable enhancement) with an **optional actions column**—e.g. configurable edit/delete or custom row actions—could be a useful design-system addition so consumers don’t have to wire `renderCell` for actions in every app.
