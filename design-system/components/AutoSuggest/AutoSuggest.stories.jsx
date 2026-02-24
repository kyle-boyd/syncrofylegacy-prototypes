import React from 'react';
import AutoSuggest from './AutoSuggest';

const options = ['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry'];

export default {
  title: 'Components/AutoSuggest',
  component: AutoSuggest,
};

export const Default = {
  args: {
    name: 'fruit',
    label: 'Fruit',
    value: '',
    options,
    placeholder: 'Type to search...',
  },
};
