import React from 'react';
import Button from './Button';
import { Glyphs } from '../Icon';

export default {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    color: { control: 'select', options: ['red', 'blue', 'grey', 'teal', 'green', 'orange', 'white', 'sky'] },
    kind: { control: 'select', options: ['default', 'inverted', 'transparent'] },
    size: { control: 'select', options: ['large', 'medium', 'small', 'extraSmall'] },
    type: { control: 'select', options: ['button', 'submit'] },
  },
};

export const WithKnobs = {
  args: {
    text: 'click here',
    color: 'red',
    kind: 'default',
    size: 'medium',
    iconLeft: 'ADD',
    disabled: false,
    isFullWidth: false,
    noPadding: false,
    noHeight: false,
    type: 'button',
  },
};

export const IconOnly = {
  args: {
    iconOnly: 'COMMENT',
    color: 'blue',
    kind: 'default',
    size: 'medium',
  },
};

export const BarrelOfButtons = () => {
  const colors = ['red', 'blue', 'grey', 'teal', 'green', 'orange', 'white', 'sky'];
  const sizes = ['extraSmall', 'small', 'medium', 'large'];
  const kinds = ['default', 'inverted', 'transparent'];
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, maxHeight: 500, overflow: 'auto', background: '#888', padding: 8 }}>
      {kinds.map((kind) =>
        sizes.map((size) =>
          colors.map((color) => (
            <div key={`${kind}-${size}-${color}`} style={{ margin: 4 }}>
              <Button text="click me" color={color} size={size} kind={kind} onClick={() => {}} />
            </div>
          ))
        )
      )}
    </div>
  );
};
