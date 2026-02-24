import React from 'react';
import styled from '@emotion/styled';
import Footer from './Footer';

const Container = styled.div`
  background-color: #eaeaea;
  height: 600px;
  overflow: auto;
  padding: 16px;
`;

const Wrapper = styled.div`
  &:not(:last-child) {
    padding-bottom: 16px;
  }
`;

export default {
  title: 'Components/Footer',
  component: Footer,
};

export const Simple = () => (
  <Container>
    <Wrapper>
      <Footer buttonIconLeft="CHECK" buttonColor="green" />
    </Wrapper>
    <Wrapper>
      <Footer buttonText="Save" onCancel={() => {}} />
    </Wrapper>
    <Wrapper>
      <Footer buttonText="Next" buttonIconRight="CHEVRON_RIGHT" onBack={() => {}} onCancel={() => {}} />
    </Wrapper>
  </Container>
);
