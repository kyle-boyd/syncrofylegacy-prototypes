import React from 'react';
import styled from '@emotion/styled';
import ExpandableList from './ExpandableList';

const Item = styled.div`
  padding: 8px;
  background: #f5f5f5;
  border-radius: 4px;
`;

export default {
  title: 'Components/ExpandableList',
  component: ExpandableList,
};

const items = Array.from({ length: 10 }, (_, i) => (
  <Item key={i}>Item {i + 1}</Item>
));

export const Default = () => (
  <ExpandableList initialCount={3}>
    {items}
  </ExpandableList>
);

export const SmallMargin = () => (
  <ExpandableList initialCount={2} marginSize="small">
    {items.slice(0, 5)}
  </ExpandableList>
);
