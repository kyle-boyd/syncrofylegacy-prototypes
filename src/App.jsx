import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { NewPageHeader, Card, EnhancedList } from '@design-system';
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

const PROTOTYPE_IDEAS = [
  {
    text1: 'Prototype Testing',
    url1: '/prototype-testing',
  },
  {
    text1: 'Design System Components',
    url1: '/design-system-components',
  },
  {
    text1: 'Partners Page',
    url1: '/partners',
  },
  {
    text1: 'Documents & Document Details',
    url1: '/documents',
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
