import React from 'react';
import styled from '@emotion/styled';
import SideNav from './SideNav';

const Layout = styled.div`
  display: flex;
  min-height: 400px;
`;

const Content = styled.div`
  flex: 1;
  background-color: ${({ theme }) => theme.palette.offWhite};
  padding: ${({ theme }) => theme.constants.spacing3x};
`;

export default {
  title: 'Components/SideNav',
  component: SideNav,
};

export const Default = () => (
  <Layout>
    <SideNav
      activeId="partners"
      hasPartnersNotification
      onNavigate={(id) => console.log('Navigate:', id)}
      onCollapse={() => console.log('Collapse')}
    />
    <Content>Main content area</Content>
  </Layout>
);

export const ComplianceExpanded = () => (
  <Layout>
    <SideNav
      activeId="partners"
      hasPartnersNotification
      onNavigate={(id) => console.log('Navigate:', id)}
      onCollapse={() => console.log('Collapse')}
    />
    <Content>Click Compliance to expand/collapse sub-items</Content>
  </Layout>
);

export const LineItemsActive = () => (
  <Layout>
    <SideNav
      activeId="line-items"
      hasPartnersNotification={false}
      onNavigate={(id) => console.log('Navigate:', id)}
      onCollapse={() => console.log('Collapse')}
    />
    <Content>Line Items is active</Content>
  </Layout>
);

export const NoPartnersNotification = () => (
  <Layout>
    <SideNav
      activeId="partners"
      hasPartnersNotification={false}
      onNavigate={(id) => console.log('Navigate:', id)}
      onCollapse={() => console.log('Collapse')}
    />
    <Content>Partners without notification badge</Content>
  </Layout>
);
