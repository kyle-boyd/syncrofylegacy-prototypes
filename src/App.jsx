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
import ExceptionEmailTemplate from './prototypes/ExceptionEmailTemplate';
import ScheduledReportEmailTemplate from './prototypes/ScheduledReportEmailTemplate';
import InvoiceDetail from './prototypes/InvoiceDetail';
import ReportsLayout from './layouts/ReportsLayout';
import ReportsPage from './prototypes/ReportsPage';

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
const EMAIL_JIRA_URL = 'https://coenterprise.jira.com/browse/SYN-99999';
const EMAIL_JIRA_KEY = 'SYN-99999';
const LAST_EDITED = 'Last edited: 2026-02-24';
const EMAIL_LAST_EDITED = 'Last edited: 2026-03-25';
const REPORT_EMAIL_LAST_EDITED = 'Last edited: 2026-04-13';
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
  {
    text1: 'Exception Email Template',
    text2: `${EMAIL_LAST_EDITED} • ${VERSION}`,
    url1: `${BASE}/exception-email-template`,
    icon1: 'BELL',
    actions: [
      <a
        key="email-jira-link"
        href={EMAIL_JIRA_URL}
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
        <span>{EMAIL_JIRA_KEY}</span>
        <Icon iconName="NEW_TAB" size={14} />
      </a>,
    ],
  },
  {
    text1: 'Invoice Detail',
    text2: `Last edited: 2026-04-07 • ${VERSION}`,
    url1: `${BASE}/invoice-detail`,
    icon1: 'DOCUMENT',
  },
  {
    text1: 'Reports',
    text2: `Last edited: 2026-04-08 • ${VERSION}`,
    url1: `${BASE}/reports`,
    icon1: 'DOCUMENT',
  },
  {
    text1: 'Scheduled Report Email Template',
    text2: `${REPORT_EMAIL_LAST_EDITED} • ${VERSION}`,
    url1: `${BASE}/scheduled-report-email-template`,
    icon1: 'BELL',
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
        <Route path="/exception-email-template" element={<ExceptionEmailTemplate />} />
        <Route path="/invoice-detail" element={<DocumentsLayout />}>
          <Route index element={<InvoiceDetail />} />
        </Route>
        <Route path="/documents" element={<DocumentsLayout />}>
          <Route index element={<DocumentsPage />} />
          <Route path=":id" element={<DocumentDetails />} />
        </Route>
        <Route path="/reports" element={<ReportsLayout />}>
          <Route index element={<ReportsPage />} />
        </Route>
        <Route path="/scheduled-report-email-template" element={<ScheduledReportEmailTemplate />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Partner997Provider>
  );
}
