import React from 'react';
import styled from '@emotion/styled';
import SearchBar from './SearchBar';

const Wrapper = styled.div`
  padding: 24px;
`;

export default {
  title: 'Components/SearchBar',
  component: SearchBar,
};

export const General = () => (
  <Wrapper>
    <SearchBar placeholder="Placeholder text" disabled={false} isLoading={false} />
  </Wrapper>
);

export const WithDefaultValue = () => (
  <Wrapper>
    <SearchBar placeholder="Search..." defaultValue="initial" />
  </Wrapper>
);
