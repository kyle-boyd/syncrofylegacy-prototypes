import React, { useState } from 'react';
import SelectableList, { SelectableListItem } from './SelectableList';

export default {
  title: 'Components/SelectableList',
  component: SelectableList,
  parameters: {
    docs: {
      description: {
        component:
          'List of selectable items with primary and secondary (meta) text and active state. DS: SelectableList / ListItemWithMeta.',
      },
    },
  },
};

const sampleItems = [
  { id: '1', primaryText: 'Revenue report', secondaryText: 'Last updated 2 hours ago' },
  { id: '2', primaryText: 'Partner list', secondaryText: '124 partners' },
  { id: '3', primaryText: 'Chargeback summary', secondaryText: 'Q1 2025' },
];

export const Default = () => {
  const [selectedId, setSelectedId] = useState('2');
  return (
    <div style={{ maxWidth: 320 }}>
      <SelectableList
        items={sampleItems}
        selectedId={selectedId}
        onSelect={setSelectedId}
        aria-label="Reports"
      />
    </div>
  );
};

export const NoSelection = () => (
  <div style={{ maxWidth: 320 }}>
    <SelectableList items={sampleItems} aria-label="Reports" />
  </div>
);

export const StandaloneListItem = () => (
  <div style={{ maxWidth: 320, display: 'flex', flexDirection: 'column', gap: 4 }}>
    <SelectableListItem
      primaryText="Single item"
      secondaryText="Can be used outside SelectableList"
      active={false}
      onClick={() => {}}
    />
    <SelectableListItem
      primaryText="Active item"
      secondaryText="Shows selected state"
      active
      onClick={() => {}}
    />
  </div>
);

export const PrimaryOnly = () => (
  <div style={{ maxWidth: 320 }}>
    <SelectableList
      items={[
        { id: 'a', primaryText: 'Option A' },
        { id: 'b', primaryText: 'Option B' },
        { id: 'c', primaryText: 'Option C' },
      ]}
      selectedId="b"
      onSelect={() => {}}
    />
  </div>
);
