import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { TopNav, SideNav } from '@design-system';
import styled from '@emotion/styled';
import PrototypeBanner from '../components/PrototypeBanner';

const Shell = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
  background-color: ${({ theme }) => theme.palette.cloud};
`;

const Body = styled.div`
  display: flex;
  flex: 1;
  min-height: 0;
`;

const Sidebar = styled.aside`
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  min-height: 0;
  height: 100%;
  align-self: stretch;
`;

const Main = styled.main`
  flex: 1;
  min-width: 0;
  overflow: auto;
  background-color: ${({ theme }) => theme.palette.offWhite};
`;

const SIDE_NAV_ROUTES = {
  documents: '/documents',
  partners: '/partners',
};

export default function DocumentsLayout() {
  const navigate = useNavigate();

  const handleNavigate = (id) => {
    const path = SIDE_NAV_ROUTES[id];
    if (path) navigate(path);
  };

  return (
    <Shell>
      <PrototypeBanner prototypeName="997 Configuration" />
      <TopNav
        logoLabel="Syncrofy"
        showEnvironmentSelector
        environment="Production"
        searchPlaceholder="Search for documents, comments, users..."
        onChatAIClick={() => {}}
        notificationCount={6}
        userDisplayName="Kyle Boyd"
        userRole="CoEnterprise | Product De..."
        onHelp={() => {}}
      />
      <Body>
        <Sidebar>
          <SideNav
            activeId="documents"
            onNavigate={(id) => handleNavigate(id)}
            onCollapse={() => {}}
          />
        </Sidebar>
        <Main>
          <Outlet />
        </Main>
      </Body>
    </Shell>
  );
}

