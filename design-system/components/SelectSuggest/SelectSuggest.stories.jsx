import React, { useState } from 'react';
import SelectSuggest from './SelectSuggest';

const options = [
  { name: 'a', valueText: 'Option A' },
  { name: 'b', valueText: 'Option B' },
  { name: 'c', valueText: 'Option C' },
];

export default {
  title: 'Components/SelectSuggest',
  component: SelectSuggest,
};

export const Default = () => {
  const [value, setValue] = useState('');
  return (
    <SelectSuggest
      name="sel"
      label="Choose one"
      options={options}
      value={value}
      onChange={setValue}
      placeholder="Select..."
    />
  );
};

/** "Sorted by X" pattern: use SelectSuggest (or Popover + list) when there is no dedicated sort dropdown. See docs/gaps.md. */
export const SortedBy = () => {
  const sortOptions = [
    { name: 'date', valueText: 'Date' },
    { name: 'name', valueText: 'Name' },
    { name: 'status', valueText: 'Status' },
  ];
  const [sortBy, setSortBy] = useState('date');
  return (
    <SelectSuggest
      name="sort"
      label="Sorted by"
      options={sortOptions}
      value={sortBy}
      onChange={setSortBy}
      placeholder="Sort..."
    />
  );
};
