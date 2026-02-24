import React from 'react';
import BulletGraph from './BulletGraph';

export default {
  title: 'Components/BulletGraph',
  component: BulletGraph,
};

export const Horizontal = () => (
  <BulletGraph label="Fill rate" value={75} orientation="horizontal" length={200} />
);

export const At100 = () => (
  <BulletGraph label="Complete" value={100} showValueLabel />
);

export const Over100 = () => (
  <BulletGraph label="Over capacity" value={110} />
);
