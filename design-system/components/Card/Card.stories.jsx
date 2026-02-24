import React from 'react';
import styled from '@emotion/styled';
import { Card, CardBody, CardHeader, CardFooter } from './index';

const Container = styled.div`
  background-color: #eaeaea;
  height: 600px;
  overflow: auto;
  padding: 16px;
`;

const Wrapper = styled.div`
  display: flex;
  width: 480px;
  &:not(:last-child) {
    padding-bottom: 16px;
  }
`;

export default {
  title: 'Components/Card',
  component: Card,
};

export const Simple = () => (
  <Container>
    <Wrapper>
      <Card>
        <CardBody>Card with no header or footer</CardBody>
      </Card>
    </Wrapper>
    <Wrapper>
      <Card>
        <CardHeader title="Header" actionType="icon" />
        <CardBody>Card with just a header with an action icon and no divider line</CardBody>
      </Card>
    </Wrapper>
    <Wrapper>
      <Card>
        <CardHeader title="Header" actionType="button" buttonText="Add New" />
        <CardBody>Card with just a header with an action button</CardBody>
      </Card>
    </Wrapper>
    <Wrapper>
      <Card>
        <CardHeader title="Header" actionType="icon" hasDivider />
        <CardBody>Card with just a header with an action icon and divider line</CardBody>
      </Card>
    </Wrapper>
    <Wrapper>
      <Card>
        <CardHeader title="Header" titleIcon="EXCEPTION" hasDivider actionType="icon" />
        <CardBody>Card with just a header with an action icon and read-only icon</CardBody>
      </Card>
    </Wrapper>
    <Wrapper>
      <Card>
        <CardHeader title="Header" hasDivider actionType="icon" />
        <CardBody>Card with header and footer without back button</CardBody>
        <CardFooter buttonText="Apply" />
      </Card>
    </Wrapper>
    <Wrapper>
      <Card>
        <CardHeader title="Header" hasDivider actionType="icon" />
        <CardBody>Card with header and footer with back and cancel buttons</CardBody>
        <CardFooter buttonText="Apply" onBack={() => {}} onCancel={() => {}} />
      </Card>
    </Wrapper>
    <Wrapper>
      <Card>
        <CardHeader title="Header" actionType="icon" hasDivider />
        <CardBody noPadding>Card with no body padding</CardBody>
      </Card>
    </Wrapper>
  </Container>
);
