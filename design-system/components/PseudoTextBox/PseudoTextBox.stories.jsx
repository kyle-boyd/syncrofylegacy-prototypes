import React, { useState } from 'react';
import styled from '@emotion/styled';
import PseudoTextBox from './PseudoTextBox';

const Inner = styled.span`
  padding: 0.34em 0.7em;
  display: block;
`;

export default {
  title: 'Components/PseudoTextBox',
  component: PseudoTextBox,
};

export const Default = () => (
  <PseudoTextBox>
    <Inner>Looks like a text box</Inner>
  </PseudoTextBox>
);

export const Focused = () => (
  <PseudoTextBox isFocused>
    <Inner>Focused state</Inner>
  </PseudoTextBox>
);

export const WithError = () => (
  <PseudoTextBox errors={{ required: true }}>
    <Inner>Error state</Inner>
  </PseudoTextBox>
);

export const Interactive = () => {
  const [focused, setFocused] = useState(false);
  return (
    <PseudoTextBox
      canTab
      isFocused={focused}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
    >
      <Inner>Click or tab to focus</Inner>
    </PseudoTextBox>
  );
};
