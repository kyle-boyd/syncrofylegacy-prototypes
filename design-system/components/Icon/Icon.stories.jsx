import React from 'react';
import Icon from './Icon';
import Glyphs from './Glyphs';

export default {
  title: 'Components/Icon',
  component: Icon,
  argTypes: {
    iconName: { control: 'select', options: Object.keys(Glyphs) },
    size: { control: { type: 'number', min: 12, max: 48 } },
  },
};

export const AllIcons = () => (
  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24, padding: 16 }}>
    {Object.keys(Glyphs).map((name) => (
      <div key={name} style={{ display: 'flex', alignItems: 'center', border: '1px solid #ccc', padding: '0 8px' }}>
        <span style={{ marginRight: 8 }}>{name}</span>
        <Icon iconName={name} size={20} />
      </div>
    ))}
  </div>
);

export const Single = {
  args: {
    iconName: 'ADD',
    size: 24,
  },
};
