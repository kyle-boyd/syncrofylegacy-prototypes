import React, { useState } from 'react';
import styled from '@emotion/styled';
import SideNavItem from './SideNavItem';

const SeaWrap = styled.div`
  width: 240px;
  background-color: ${({ theme }) => theme.palette.sea};
  padding: 0;
`;

export default {
  title: 'Components/SideNavItem',
  component: SideNavItem,
  decorators: [
    (Story) => (
      <SeaWrap>
        <Story />
      </SeaWrap>
    ),
  ],
};

export const Default = () => (
  <SideNavItem
    iconName="DASHBOARD"
    label="Dashboards"
    onClick={() => console.log('Dashboards')}
  />
);

export const Active = () => (
  <SideNavItem
    iconName="PEOPLE"
    label="Partners"
    isActive
    onClick={() => {}}
  />
);

export const WithNotification = () => (
  <SideNavItem
    iconName="PEOPLE"
    label="Partners"
    hasNotification
    onClick={() => {}}
  />
);

export const ExpandableCollapsed = () => (
  <SideNavItem
    iconName="DOCUMENT"
    label="Compliance"
    isExpandable
    isExpanded={false}
    subItems={[]}
    onClick={() => {}}
  />
);

export const ExpandableExpanded = () => (
  <SideNavItem
    iconName="DOCUMENT"
    label="Compliance"
    isExpandable
    isExpanded
    subItems={[
      { label: 'Chargeback', onClick: () => console.log('Chargeback') },
      { label: 'Transactions', onClick: () => console.log('Transactions') },
      { label: 'Configuration', onClick: () => console.log('Configuration') },
    ]}
    onClick={() => {}}
  />
);

export const WithSubItems = () => {
  const [expanded, setExpanded] = useState(true);
  return (
    <SideNavItem
      iconName="DOCUMENT"
      label="Compliance"
      isExpandable
      isExpanded={expanded}
      subItems={[
        { label: 'Chargeback', onClick: () => console.log('Chargeback') },
        { label: 'Transactions', onClick: () => console.log('Transactions') },
        { label: 'Configuration', onClick: () => console.log('Configuration') },
      ]}
      onClick={() => setExpanded((p) => !p)}
    />
  );
};
