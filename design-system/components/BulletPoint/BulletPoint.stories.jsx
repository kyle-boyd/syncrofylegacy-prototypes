import React from 'react';
import BulletPoint from './BulletPoint';

export default {
  title: 'Components/BulletPoint',
  component: BulletPoint,
};

export const Simple = () => (
  <BulletPoint count={1} text="Some instructions" />
);

export const WithKnobs = (args) => <BulletPoint {...args} />;
WithKnobs.args = { count: 5, text: 'Step description' };

export const Overflow = () => (
  <BulletPoint count={100} text="Count 100+ shows bear" />
);
