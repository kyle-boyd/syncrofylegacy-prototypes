import React from 'react';
import {
  NewPageHeader,
  Card,
  CardHeader,
  CardBody,
  Button,
} from '@design-system';
import styled from '@emotion/styled';
import PrototypeBanner from '../components/PrototypeBanner';

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

export default function PrototypeTesting() {
  return (
    <Page>
      <PrototypeBanner prototypeName="Prototype Testing" />
      <NewPageHeader
        title="Prototype Testing"
        breadcrumbs={[{ name: 'Prototypes', url: '/' }]}
      />
      <Content>
        <Card>
          <CardHeader title="Prototype Testing" hasDivider />
          <CardBody>
            <p style={{ margin: 0 }}>
              This is the first prototype. Use this view to test flows and components from the Syncrofy Legacy design system.
            </p>
            <div style={{ marginTop: '1.5rem' }}>
              <Button text="Primary action" color="cerulean" kind="primary" />
            </div>
          </CardBody>
        </Card>
      </Content>
    </Page>
  );
}
