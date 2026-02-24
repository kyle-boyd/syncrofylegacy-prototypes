import React from 'react';
import CountBadge from './CountBadge';

export default {
  title: 'Components/CountBadge',
  component: CountBadge,
};

export const Default = { args: { count: 5 } };
export const Large = { args: { count: 99 } };
export const Over99 = { args: { count: 150 } };
export const Error = { args: { count: 3, variant: 'error' } };
export const Success = { args: { count: 12, variant: 'success' } };
