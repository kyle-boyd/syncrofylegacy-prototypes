import React from 'react';
import { LifecycleContainer, LifecycleTimelineNode, LifecycleTimelineSeparator, statuses } from './index';

export default {
  title: 'Components/LifecycleTimeline',
  component: LifecycleTimelineNode,
};

export const Stepper = () => (
  <LifecycleContainer>
    <LifecycleTimelineNode title="Step 1" status={statuses.complete} date="2024-01-15" number={1} />
    <LifecycleTimelineSeparator status={statuses.complete} />
    <LifecycleTimelineNode title="Step 2" status={statuses.pending} number={2} />
    <LifecycleTimelineSeparator status={statuses.none} />
    <LifecycleTimelineNode title="Step 3" status={statuses.none} isUnvisitedTitle number={3} />
  </LifecycleContainer>
);
