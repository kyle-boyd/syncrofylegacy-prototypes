import React, { useMemo, useState } from 'react';
import styled from '@emotion/styled';
import TextInput from '../TextInput';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 280px;
  max-width: 360px;
`;

const SearchRow = styled.div`
  margin: ${({ theme }) => `${theme.constants.spacing1x} ${theme.constants.spacing2x}`};
`;

const SearchInput = styled(TextInput)`
  width: 100%;
`;

const List = styled.ul`
  list-style: none;
  margin: 0;
  padding: ${({ theme }) => `${theme.constants.spacingHalf} 0 ${theme.constants.spacing1x}`};
  max-height: 320px;
  overflow-y: auto;
`;

const Option = styled.li`
  padding: ${({ theme }) => `${theme.constants.spacing1x} ${theme.constants.spacing2x}`};
  font-size: ${({ theme }) => theme.constants.smallFontSize};
  cursor: pointer;
  background: ${({ theme, selected }) => (selected ? theme.palette.cloud : 'transparent')};
  &:hover {
    background: ${({ theme }) => theme.palette.cloud};
  }
`;

/**
 * Popover body for the "Document Type" filter.
 *
 * Props:
 * - options: [{ id, label }]
 * - value: currently selected id (or null for "All Business Documents")
 * - onSelect(id): called when a document type is picked
 */
export default function DocumentTypeFilterPopover({ options = [], value, onSelect }) {
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return options;
    return options.filter((opt) => opt.label.toLowerCase().includes(q));
  }, [options, query]);

  return (
    <Container>
      <SearchRow>
        <SearchInput
          placeholder="Search by transaction set ID or name..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </SearchRow>
      <List>
        {filtered.map((opt) => (
          <Option
            key={opt.id}
            selected={opt.id === value}
            onClick={() => onSelect?.(opt.id)}
          >
            {opt.label}
          </Option>
        ))}
      </List>
    </Container>
  );
}

