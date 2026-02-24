import React, { useState } from 'react';
import Toggle from './Toggle';

export default {
  title: 'Components/Toggle',
  component: Toggle,
};

export const Simple = () => {
  const [on, setOn] = useState(true);
  const [labelSide, setLabelSide] = useState('right');
  const [onColor, setOnColor] = useState('green');
  return (
    <>
      <div style={{ width: 300, border: '1px solid #ccc', padding: 16 }}>
        <Toggle
          label="Toggle this or edit label below"
          on={on}
          onChange={() => setOn(!on)}
          disabled={false}
          onColor={onColor}
          labelSide={labelSide}
        />
      </div>
      <div style={{ marginTop: 16, display: 'flex', gap: 8 }}>
        <button type="button" onClick={() => setLabelSide((s) => (s === 'right' ? 'left' : 'right'))}>
          Toggle label side
        </button>
        <button type="button" onClick={() => setOnColor('red')}>Red</button>
        <button type="button" onClick={() => setOnColor('green')}>Green</button>
      </div>
    </>
  );
};

export const Disabled = () => (
  <div style={{ width: 300 }}>
    <Toggle label="Disabled off" on={false} onChange={() => {}} disabled />
    <Toggle label="Disabled on" on onChange={() => {}} disabled />
  </div>
);
