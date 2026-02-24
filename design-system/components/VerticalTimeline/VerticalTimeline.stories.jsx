import React from 'react';
import VerticalTimeline from './VerticalTimeline';

export default {
  title: 'Components/VerticalTimeline',
  component: VerticalTimeline,
};

export const Simple = () => (
  <VerticalTimeline
    list={[
      { size: 'small', title: 'Jan 1' },
      { size: 'large', date: '2024-01-15', title: 'Event', content: <p>Details here.</p> },
      { size: 'small', title: 'Jan 2' },
    ]}
  />
);
