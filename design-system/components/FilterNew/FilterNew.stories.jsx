import React, { useState } from 'react';
import { FilterButton } from './index';

export default {
  title: 'Components/FilterNew',
  component: FilterButton,
};

export const FilterButtonStory = () => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <FilterButton
        label="Status"
        value="Active"
        selected={open}
        hasSelection
        onClick={() => setOpen(!open)}
      />
      <br />
      <FilterButton label="Type" onClick={() => {}} />
    </div>
  );
};
