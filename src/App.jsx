import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { NewPageHeader, Card, EnhancedList, Icon } from '@design-system';
import styled from '@emotion/styled';
import PrototypeTesting from './prototypes/PrototypeTesting';
import DesignSystemGallery from './prototypes/DesignSystemGallery';
import PartnersLayout from './layouts/PartnersLayout';
import PartnersPage from './prototypes/PartnersPage';
import DocumentsLayout from './layouts/DocumentsLayout';
import DocumentsPage from './prototypes/DocumentsPage';
import DocumentDetails from './prototypes/DocumentDetails';
import { Partner997Provider } from './contexts/Partner997Context';

const Page = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.palette.cloud};
`;

const Content = styled.main`
  flex: 1;
  padding: ${({ theme }) => theme.constants.spacing3x};
  max-width: 720px;
  margin: 0 auto;
  width: 100%;
`;

// Use Vite's BASE_URL so links work both locally and on GitHub Pages.
const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');

const JIRA_STORY_URL = 'https://coenterprise.jira.com/browse/SYN-24330';
const JIRA_STORY_KEY = 'SYN-24330';
const LAST_EDITED = 'Last edited: 2026-02-24';
const VERSION = 'Version: v0.0.1';

const PROTOTYPE_IDEAS = [
  {
    text1: 'Prototype Testing',
    text2: `${LAST_EDITED} • ${VERSION}`,
    url1: `${BASE}/prototype-testing`,
  },
  {
    text1: 'Design System Components',
    text2: `${LAST_EDITED} • ${VERSION}`,
    url1: `${BASE}/design-system-components`,
  },
  {
    text1: '997 Configuration',
    text2: `${LAST_EDITED} • ${VERSION}`,
    url1: `${BASE}/partners`,
    icon1: 'SETTINGS',
    actions: [
      <a
        key="jira-link"
        href={JIRA_STORY_URL}
        target="_blank"
        rel="noreferrer"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 4,
          color: '#0072CE',
          textDecoration: 'none',
          fontWeight: 500,
          whiteSpace: 'nowrap',
        }}
      >
        <span>{JIRA_STORY_KEY}</span>
        <Icon iconName="NEW_TAB" size={14} />
      </a>,
    ],
  },
];

function PrototypeList() {
  return (
    <Page>
      <NewPageHeader title="Prototypes" />
      <Content>
        <Card>
          <EnhancedList items={PROTOTYPE_IDEAS} />
        </Card>
      </Content>
    </Page>
  );
}

export default function App() {
  return (
    <Partner997Provider>
      <Routes>
        <Route path="/" element={<PrototypeList />} />
        <Route path="/prototype-testing" element={<PrototypeTesting />} />
        <Route path="/design-system-components" element={<DesignSystemGallery />} />
        <Route path="/partners" element={<PartnersLayout />}>
          <Route index element={<PartnersPage />} />
        </Route>
        <Route path="/documents" element={<DocumentsLayout />}>
          <Route index element={<DocumentsPage />} />
          <Route path=":id" element={<DocumentDetails />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Partner997Provider>
  );
}
