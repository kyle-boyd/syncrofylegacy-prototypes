import React from 'react';
import styled from '@emotion/styled';
import SelectableListItem from './SelectableListItem';

const List = styled.ul`
  list-style: none;
  margin: 0;
  padding: ${({ theme }) => theme.constants.spacing1x};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.constants.spacingQuarter};
  background-color: ${({ theme }) => theme.palette.white};
  border-radius: ${({ theme }) => theme.constants.radiusMedium};
  border: 1px solid ${({ theme }) => theme.palette.stroke};
`;

/**
 * A list of selectable items with primary and secondary text and active state.
 * Controlled: pass selectedId and onSelect. Items: { id, primaryText, secondaryText }.
 * DS: SelectableList / ListItemWithMeta (for the item component).
 */
export default function SelectableList({
  items = [],
  selectedId,
  onSelect,
  id: listId,
  'aria-label': ariaLabel,
  ...rest
}) {
  return (
    <List
      role="listbox"
      id={listId}
      aria-label={ariaLabel ?? 'Select an option'}
      {...rest}
    >
      {items.map((item) => {
        const id = item.id ?? item.value ?? String(item.primaryText);
        const active = selectedId != null && selectedId === id;
        return (
          <li key={id} role="presentation">
            <SelectableListItem
              primaryText={item.primaryText}
              secondaryText={item.secondaryText}
              active={active}
              onClick={() => onSelect?.(id, item)}
              id={listId ? `${listId}-item-${id}` : undefined}
              aria-current={active ? 'true' : undefined}
            />
          </li>
        );
      })}
    </List>
  );
}

export { SelectableListItem };
